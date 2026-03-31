'use client'

import { useEffect, useState } from 'react'
import { hasConsent } from '@/components/consent/CookieConsent'

const AD_CLIENT = 'ca-pub-2809409030893528'

export default function AdsenseLoader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return
    if (!hasConsent()) return

    // Check if script already exists
    if (document.querySelector(`script[data-ad-client="${AD_CLIENT}"]`)) {
      setLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-ad-client', AD_CLIENT)
    document.head.appendChild(script)

    setLoaded(true)
  }, [loaded])

  return null
}
