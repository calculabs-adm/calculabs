'use client'

import { useEffect, useState } from 'react'
import { hasConsent } from '@/components/consent/CookieConsent'

const GTM_ID = 'GTM-WCJ4FLF7'

export default function GtmLoader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return
    if (!hasConsent()) return

    // Load GTM script dynamically
    const script = document.createElement('script')
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `
    document.head.appendChild(script)

    // Add noscript iframe
    const noscript = document.createElement('noscript')
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
    iframe.height = '0'
    iframe.width = '0'
    iframe.style.display = 'none'
    iframe.style.visibility = 'hidden'
    noscript.appendChild(iframe)
    document.body.insertBefore(noscript, document.body.firstChild)

    setLoaded(true)
  }, [loaded])

  // Re-check on storage change (handles accept from CookieConsent)
  useEffect(() => {
    const handleStorage = () => {
      if (!loaded && hasConsent()) {
        setLoaded(false) // trigger re-render to load GTM
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [loaded])

  return null
}
