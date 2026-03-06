"use client";

import { useState } from "react";

interface ErrorReportButtonProps {
  calculatorName: string;
}

export default function ErrorReportButton({ calculatorName }: ErrorReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar relatório");
      }

      setSubmitted(true);
      setErrorDescription("");
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
  };

  return (
    <>
      <p className="text-xs text-amber-600 mt-2">
        <button
          onClick={() => setIsOpen(true)}
          className="underline hover:text-amber-800 bg-transparent border-none cursor-pointer p-0"
        >
          Reportar erro nesta calculadora
        </button>
      </p>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
            {submitted ? (
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Obrigado!
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Obrigado por nos ajudar a manter tudo funcionando bem.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Reportar Erro
                  </h3>
                  <button
                    onClick={handleClose}
                    className="text-slate-400 hover:text-slate-600 text-xl"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-sm text-slate-600 mb-4">
                  Encontrou um erro na calculadora <strong>{calculatorName}</strong>?
                  Descreva o problema abaixo para nos ajudar a melhorar.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="errorDescription"
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      Descreva o erro encontrado nesta Calculadora
                    </label>
                    <textarea
                      id="errorDescription"
                      value={errorDescription}
                      onChange={(e) => setErrorDescription(e.target.value)}
                      placeholder="Ex: O resultado está incorreto para..."
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
