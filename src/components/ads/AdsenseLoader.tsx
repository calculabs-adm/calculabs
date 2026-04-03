'use client'

import { useEffect, useRef } from 'react'
import { hasConsent } from '@/components/consent/CookieConsent'

const AD_CLIENT = 'ca-pub-2809409030893528'

export default function AdsenseLoader() {
  const hasLoadedRef = useRef(false)

  useEffect(() => {
    if (hasLoadedRef.current || !hasConsent()) return

    // Check if script already exists
    if (document.querySelector(`script[data-ad-client="${AD_CLIENT}"]`)) {
      hasLoadedRef.current = true
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-ad-client', AD_CLIENT)
    document.head.appendChild(script)

    hasLoadedRef.current = true
  }, [])

  return null
}
