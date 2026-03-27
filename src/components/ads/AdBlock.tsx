'use client'

import { useEffect, useRef } from 'react'

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

    pushed.current = true

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('[AdBlock] AdSense error:', err)
    }
  }, [])

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
