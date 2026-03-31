'use client'

import { useState, useEffect } from 'react'

const CONSENT_KEY = 'cookie_consent'

export function getConsent(): 'accepted' | 'rejected' | null {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(CONSENT_KEY)
  if (value === 'accepted' || value === 'rejected') return value
  return null
}

export function hasConsent(): boolean {
  return getConsent() === 'accepted'
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getConsent()) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
    window.location.reload()
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-700 leading-relaxed">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência,
              analisar o uso do site e exibir anúncios personalizados. Ao clicar em
              &quot;Aceitar&quot;, você concorda com o uso de todos os cookies conforme nossa{' '}
              <a href="/privacidade" className="text-blue-600 hover:text-blue-700 underline">
                Política de Privacidade
              </a>.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-5 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Rejeitar
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
