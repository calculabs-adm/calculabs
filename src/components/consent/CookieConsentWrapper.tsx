'use client'

import dynamic from 'next/dynamic'

// Lazy load CookieConsent to prevent LCP impact
const CookieConsent = dynamic(() => import('@/components/consent/CookieConsent'), {
  ssr: false,
})

export default function CookieConsentWrapper() {
  return <CookieConsent />
}