import { SeoHead } from '@/components/SeoHead'
import { PageBanner } from '@/components/PageBanner'

interface LegalProps {
  title: string
  path: string
  content: string
}

export function LegalPage({ title, path, content }: LegalProps) {
  const paragraphs = content
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      <SeoHead title={`${title} | KuberFinserve`} description={title} path={path} />
      <PageBanner title={title} breadcrumb={[{ label: title }]} />
      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-4 prose prose-gray">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}

const LEGAL_CONTENT = {
  disclaimer: `Last updated: 09 Jul 2026

KuberFinserve provides information on loans, insurance, and credit cards for general informational purposes only. Nothing on this website should be treated as financial, legal, or professional advice. You should evaluate products independently and, where appropriate, consult qualified professionals before making decisions.

All offers, interest rates, fees, eligibility, documentation requirements, processing time, and approval decisions are determined solely by the respective banks, NBFCs, insurers, or third-party providers. Submission of an enquiry or application through this website does not guarantee approval or sanction.

Product information displayed on this website may change without notice. While we try to keep information accurate and up to date, we do not warrant completeness, reliability, or suitability for any specific purpose.

Third-party links (including WhatsApp, map directions, app stores, and partner/provider websites) are provided for convenience. KuberFinserve is not responsible for content, policies, or practices of third-party sites or apps.

To the maximum extent permitted by law, KuberFinserve shall not be liable for any direct or indirect loss arising from use of this website or reliance on its content, including but not limited to financial loss, business interruption, or data loss.`,

  privacy: `Last updated: 09 Jul 2026

KuberFinserve respects your privacy. This Privacy Policy explains how we collect, use, share, and protect information when you visit our website and submit forms.

Information we collect:
- Details you submit via forms such as name, phone number, email, city/state, loan/product preferences, and message content.
- Technical information such as device/browser details and basic usage analytics (as enabled on the site).

How we use your information:
- To contact you regarding your enquiry and connect you with relevant lenders/insurers/providers or our internal team.
- To verify information, prevent fraud/spam, and maintain platform security.
- To improve our services and customer support experience.

Sharing of information:
- We may share relevant details with banks, NBFCs, insurers, technology partners, and service providers strictly for processing your request and providing services.
- We do not sell your personal information to third parties.

Data retention:
- We retain information as long as needed to fulfill the purpose for which it was collected, comply with legal obligations, resolve disputes, and enforce agreements.

Security:
- We use reasonable technical and organizational safeguards to protect data. However, no transmission over the internet is fully secure, and we cannot guarantee absolute security.

Your choices:
- You may request correction or deletion of your information, subject to legal and operational requirements.
- You may opt out of promotional communication by contacting us.

Contact:
- Email: info@kuberfinserve.com
- Phone: +91 7982953129`,

  terms: `Last updated: 09 Jul 2026

These Terms & Conditions govern your use of the KuberFinserve website. By accessing or using this site, you agree to these terms.

Use of the website:
- You agree to provide accurate information when submitting forms.
- You will not misuse the website for unlawful activity, spam, or attempts to disrupt service.

Services and approvals:
- KuberFinserve facilitates enquiries and applications. Final product terms and approvals are decided by third-party providers (banks/NBFCs/insurers).
- We may contact you via phone, SMS, WhatsApp, or email for verification and support related to your enquiry.

Intellectual property:
- All logos, content, designs, and materials on this site are owned by KuberFinserve or used under license and are protected by applicable laws. You may not copy, reproduce, or distribute content without permission.

Limitation of liability:
- The website is provided “as is” and “as available”. KuberFinserve is not liable for any damages arising from use of the site, delays, errors, or third-party actions, to the maximum extent permitted by law.

Changes:
- We may update these terms at any time. Continued use after changes means you accept the updated terms.

Governing law:
- These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in New Delhi, India.`,
  channel: `Channel partner agreement terms apply to registered partners. Contact our office for the complete agreement document.`,
}

export function Disclaimer() {
  return <LegalPage title="Disclaimer" path="/disclaimer" content={LEGAL_CONTENT.disclaimer} />
}
export function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" path="/privacy-policy" content={LEGAL_CONTENT.privacy} />
}
export function TermsConditions() {
  return <LegalPage title="Terms & Conditions" path="/terms-conditions" content={LEGAL_CONTENT.terms} />
}
export function ChannelPartner() {
  return <LegalPage title="Channel Partner Agreement" path="/channel-partner-agreement" content={LEGAL_CONTENT.channel} />
}
