import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import logger from "@/lib/logger";
import { sanitizeString, rateLimiter } from "@/lib/sanitization";

export async function POST(request: NextRequest) {
  let sanitizedCalculatorName = '';
  let clientIP = '';

  try {
    // Rate limiting
    clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!rateLimiter.isAllowed(clientIP, 5, 60000)) { // 5 requests per minute
      logger.warn('Rate limit exceeded for error reporting', { ip: clientIP });
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em alguns minutos." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { calculatorName, errorDescription } = body;

    // Sanitize inputs
    sanitizedCalculatorName = sanitizeString(calculatorName || '');
    const sanitizedErrorDescription = sanitizeString(errorDescription || '');

    if (!sanitizedCalculatorName || !sanitizedErrorDescription) {
      logger.warn('Invalid input in error report', {
        calculatorName: !!calculatorName,
        errorDescription: !!errorDescription,
        ip: clientIP
      });
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromEmail = process.env.REPORT_FROM_EMAIL || "contato@calculabs.com.br";
    const toEmail = process.env.REPORT_TO_EMAIL || "calculabs.adm@gmail.com";

    // If SMTP is not configured, log the error report (for development)
    if (!smtpHost || !smtpUser || !smtpPass) {
      logger.info('Error report received (SMTP not configured)', {
        calculatorName: sanitizedCalculatorName,
        errorDescription: sanitizedErrorDescription,
        ip: clientIP,
        timestamp: new Date().toISOString()
      });

      // In development, return success anyway
      return NextResponse.json({ success: true });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587"),
      secure: smtpPort === "465",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Send email
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: `🔴 Erro reportado na calculadora: ${calculatorName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Novo Relatório de Erro</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Calculadora:</strong> ${calculatorName}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}</p>
          </div>
          
          <h3 style="color: #374151;">Descrição do Erro:</h3>
          <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            ${errorDescription.replace(/\n/g, "<br>")}
          </div>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            Este e-mail foi enviado automaticamente pelo sistema de relatórios do CalcuLabs.
          </p>
        </div>
      `,
    });

    logger.info('Error report sent successfully', {
      calculatorName: sanitizedCalculatorName,
      to: toEmail,
      ip: clientIP
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Failed to send error report', {
      error: error instanceof Error ? error.message : 'Unknown error',
      calculatorName: sanitizedCalculatorName,
      ip: clientIP
    });

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
