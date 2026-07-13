import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { ContactForm } from '@/components/ContactForm'
import { OfficeMap } from '@/components/OfficeMap'
import { SITE } from '@/data/site'

export function Contact() {
  return (
    <>
      <SeoHead
        title="Contact Us | KuberFinserve"
        description="Contact KuberFinserve for loans, insurance and credit cards."
        path="/contact-us"
      />

      <section className="bg-gray-50/60 py-5 md:py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-4 text-center md:mb-5">
            <h1 className="font-heading text-2xl font-bold text-brand-900">Contact Us</h1>
            <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-gray-600">
              <li className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                <a href={`tel:${SITE.phone}`} className="hover:text-brand-700">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                <a href={`mailto:${SITE.email}`} className="hover:text-brand-700">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                Mon–Sat, 10 AM – 7 PM
              </li>
            </ul>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <ContactForm
              id="contact-form"
              className="w-full shadow-lg ring-1 ring-brand-100/80"
            />

            <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-md lg:sticky lg:top-28">
              <OfficeMap heightClass="h-64 md:h-72 lg:h-[520px]" />
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 bg-white px-3 py-2.5">
                <p className="flex items-start gap-1.5 text-xs text-gray-600">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                  {SITE.address}
                </p>
                <div className="flex shrink-0 gap-2">
                  <a
                    href={SITE.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
                  >
                    Directions
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-brand-50"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
