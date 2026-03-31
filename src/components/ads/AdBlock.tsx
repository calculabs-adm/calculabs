'use client'

import { useEffect, useRef } from 'react'
import { hasConsent } from '@/components/consent/CookieConsent'

interface AdBlockProps {
  slot?: string
  format?: 'auto' | 'rectangle' | 'horizontal'
}

export default function AdBlock({
  slot = '2277544742',
  format = 'auto'
}: AdBlockProps) {
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    if (!adRef.current) return
    if (!hasConsent()) return

    pushed.current = true

    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch (err) {
      console.error('[AdBlock] AdSense error:', err)
    }
  }, [])

  // Don't render ad markup without consent
  if (!hasConsent()) {
    return null
  }

  return (
    <div className="my-8 w-full" style={{ minHeight: 250 }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2809409030893528"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <p className="text-center text-xs text-gray-400 mt-2">Publicidade</p>
    </div>
  )
}
