"use client";

import { useState, useEffect } from "react";

interface ErrorReportButtonProps {
  calculatorName: string;
}

export default function ErrorReportButton({ calculatorName }: ErrorReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/report-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          calculatorName,
          errorDescription,
          email: email || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar relatório");
      }

      setSubmitted(true);
      setErrorDescription("");
      setEmail("");
    } catch (err) {
      setError("Erro ao enviar relatório. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitted(false);
    setError(null);
    setErrorDescription("");
    setEmail("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-blue-600 hover:text-blue-800 underline decoration-dotted underline-offset-2 transition-colors cursor-pointer bg-transparent border-none"
      >
        Reportar erro
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Colorful top bar */}
            <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700" />

            {submitted ? (
              <div className="p-8 text-center">
                {/* Success animation */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Recebido com sucesso! 🎉
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Agradecemos muito sua contribuição! Cada feedback nos ajuda a melhorar a experiência de todos os usuários.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 transition-all transform hover:scale-105"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="px-6 pt-6 pb-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        Reportar Erro
                      </h3>
                      <p className="text-xs text-slate-500">
                        Ajude-nos a melhorar
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                  <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                    Encontrou algum problema na calculadora <span className="font-semibold text-slate-800">{calculatorName}</span>? 
                    Conte-nos o que aconteceu. Vamos corrigir rapidamente! 🚀
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Email field (optional) */}
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5"
                      >
                        <span>Seu email</span>
                        <span className="text-xs font-normal text-slate-400">(opcional)</span>
                      </label>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Error description */}
                    <div className="mb-4">
                      <label
                        htmlFor="errorDescription"
                        className="block text-sm font-semibold text-slate-700 mb-1.5"
                      >
                        Descreva o problema
                      </label>
                      <textarea
                        id="errorDescription"
                        value={errorDescription}
                        onChange={(e) => setErrorDescription(e.target.value)}
                        placeholder="Ex: O resultado está incorreto para valores acima de 1000..."
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm"
                        rows={4}
                        required
                      />
                      <p className="text-xs text-slate-400 mt-1.5">
                        Quanto mais detalhes, mais rápido podemos ajudar! ✨
                      </p>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
                        <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors text-sm"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !errorDescription.trim()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Enviar
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
