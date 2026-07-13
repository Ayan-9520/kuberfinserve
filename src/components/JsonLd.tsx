import { useEffect } from 'react'

interface JsonLdProps {
  data: Record<string, unknown>
  id?: string
}

export function JsonLd({ data, id = 'jsonld-schema' }: JsonLdProps) {
  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(data)
    return () => {
      script?.remove()
    }
  }, [data, id])

  return null
}
