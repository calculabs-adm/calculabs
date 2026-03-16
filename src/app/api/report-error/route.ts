import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { calculatorName, errorDescription } = await request.json();

    if (!calculatorName || !errorDescription) {
      return NextResponse.json(
        { error: "Dados incompletos" },
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
      console.log("=== RELATÓRIO DE ERRO (SMTP não configurado) ===");
      console.log(`Calculadora: ${calculatorName}`);
      console.log(`Descrição: ${errorDescription}`);
      console.log(`Data: ${new Date().toISOString()}`);
      console.log("==============================================");
      
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar relatório:", error);
    return NextResponse.json(
      { error: "Erro ao enviar relatório" },
      { status: 500 }
    );
  }
}
