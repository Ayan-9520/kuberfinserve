import { useEffect } from 'react'
import { SITE } from '@/data/site'

interface SeoHeadProps {
  title: string
  description: string
  path?: string
  image?: string
  keywords?: string
  noindex?: boolean
}

const BASE_URL = 'https://kuberfinserve.com'
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`
const DEFAULT_KEYWORDS =
  'KuberFinserve, home loan, personal loan, business loan, loan against property, education loan, car loan, insurance, credit card, loan broker Delhi'

export function SeoHead({
  title,
  description,
  path = '',
  image,
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
}: SeoHeadProps) {
  const canonical = `${BASE_URL}${path || '/'}`
  const ogImage = image || DEFAULT_IMAGE

  useEffect(() => {
    document.title = title

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
      if (!el) {
        el = document.createElement('link')
        el.rel = rel
        document.head.appendChild(el)
      }
      el.href = href
    }

    setMeta('description', description)
    setMeta('keywords', keywords)
    setMeta('author', SITE.name)
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('googlebot', noindex ? 'noindex, nofollow' : 'index, follow')

    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', canonical, true)
    setMeta('og:image', ogImage, true)
    setMeta('og:image:alt', `${SITE.name} preview image`, true)
    setMeta('og:site_name', SITE.name, true)
    setMeta('og:locale', 'en_IN', true)

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)
    setMeta('twitter:url', canonical)

    setLink('canonical', canonical)
  }, [title, description, path, keywords, noindex, canonical, ogImage])

  return null
}
