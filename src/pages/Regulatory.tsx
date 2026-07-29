import { LegalPage } from '@/pages/Legal'

const REGULATORY_CONTENT = {
  refund: `Last updated: 29 Jul 2026

KuberFinserve (a unit of MoneyMines Infosource & E-Services) operates as a loan distribution and financial product referral platform. We are not a bank, NBFC, or direct lender. We connect customers with lending institutions, insurers, and other financial service providers.

No fees charged to customers:
KuberFinserve does not charge any processing fee, application fee, or service fee to customers for facilitating loan enquiries or applications. All loan processing, approval, disbursement, and associated charges are determined and collected directly by the respective lender (bank or NBFC).

Service fee refund (if applicable):
In the event that any advisory or premium service fee is charged for a specific service offering, the following terms apply:
- If the service has not been initiated, a full refund will be processed within 7–10 business days of the refund request.
- If the service has been partially delivered, a pro-rata refund may be provided at the sole discretion of KuberFinserve.
- Once the service has been fully delivered, no refund shall be applicable.
- Refund requests must be submitted within 15 days of the payment date.

How to request a refund:
Please contact our support team with your payment receipt and a brief description of the issue:
- Email: info@kuberfinserve.com
- Phone: +91 7982953129

Lender-related charges:
Any charges, fees, or deductions applied by the lending institution (such as processing fees, insurance premiums, or prepayment charges) are governed entirely by the lender's own terms and conditions. KuberFinserve has no control over such charges and cannot process refunds on behalf of lenders. Customers must contact the lender directly for any such disputes.`,

  grievance: `Last updated: 29 Jul 2026

KuberFinserve is committed to providing transparent, fair, and responsive service to all customers and partners. If you have a complaint or grievance regarding our services, please use the following escalation process.

Level 1 — Customer Support:
For general queries, service issues, or complaints, contact our customer support team:
- Email: info@kuberfinserve.com
- Phone: +91 7982953129
- Working hours: Monday to Saturday, 10:00 AM – 6:00 PM IST
- Expected response time: Within 48 hours of receiving your complaint.

Level 2 — Grievance Officer:
If your issue is not resolved satisfactorily within 7 working days, or if you wish to escalate directly, please contact our designated Grievance Officer:
- Name: Mr. [Name]
- Email: grievance@kuberfinserve.com
- Address: 2166, 2nd Floor, Hudson Lane, GTB Nagar, New Delhi – 110009
- The Grievance Officer will acknowledge your complaint within 48 hours and endeavour to resolve it within 30 days from the date of receipt.

Level 3 — Banking Ombudsman / Regulatory Authority:
If your grievance remains unresolved after 30 days, or if you are not satisfied with the resolution provided, you may escalate to:
- The Banking Ombudsman under the Reserve Bank of India (RBI) Integrated Ombudsman Scheme. You can file a complaint online at https://cms.rbi.org.in or contact the RBI helpline at 14448.
- The relevant regulatory authority depending on the nature of the product (IRDAI for insurance, SEBI for investment-related matters).

Important notes:
- Please include your full name, contact details, and a description of the issue along with any reference or transaction ID when filing a complaint.
- All complaints are logged and tracked to ensure timely resolution.
- KuberFinserve treats every complaint seriously and strives for continuous improvement in service quality.`,

  disclosure: `Last updated: 29 Jul 2026

KuberFinserve is a brand operated by MoneyMines Infosource & E-Services, a company registered in India.

Company registration details:
- Entity Name: MoneyMines Infosource & E-Services
- Registered Address: 2166, 2nd Floor, Hudson Lane, GTB Nagar, New Delhi – 110009
- [CIN / Registration Number: Placeholder]

DSA / Channel Partner status:
KuberFinserve operates as an authorized Direct Selling Agent (DSA) and Channel Partner for multiple banks and NBFCs. We facilitate loan enquiries, documentation, and application processing on behalf of our lending partners. We do not lend directly or make credit decisions.

RBI guidelines compliance:
KuberFinserve adheres to the guidelines issued by the Reserve Bank of India (RBI) applicable to loan intermediaries and Direct Selling Agents, including:
- The RBI Master Direction on Outsourcing of Activities by Banks and NBFCs.
- Fair Practices Code guidelines for lending institutions.
- KYC / AML norms as applicable to intermediaries.

Fair Practices Code summary:
- We provide clear and accurate information about loan products, interest rates, fees, and charges as communicated by lending partners.
- We do not engage in misleading advertising or misrepresentation of product features.
- All customer interactions are conducted professionally, ethically, and in compliance with applicable regulations.
- We do not use coercive methods for loan recovery or collection. Recovery and collection are handled entirely by the lending institution.
- Customers have the right to receive a copy of the loan agreement, sanction letter, and all relevant documents from the lender.

Data protection & privacy commitment:
- KuberFinserve collects customer information only for the purpose of facilitating loan and financial product enquiries.
- Personal data is shared only with relevant lending partners and service providers as required to process applications.
- We do not sell, rent, or trade customer personal information to third parties for marketing purposes.
- We implement reasonable technical and organizational safeguards to protect customer data.
- For full details, please refer to our Privacy Policy.

Disclaimer:
KuberFinserve is not a bank or NBFC. All loan products, interest rates, terms, and approvals are subject to the policies of the respective lending institution. Submission of an application does not guarantee approval.`,
}

export function RefundCancellationPolicy() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      path="/refund-policy"
      content={REGULATORY_CONTENT.refund}
    />
  )
}

export function GrievanceRedressal() {
  return (
    <LegalPage
      title="Grievance Redressal"
      path="/grievance-redressal"
      content={REGULATORY_CONTENT.grievance}
    />
  )
}

export function RegulatoryDisclosure() {
  return (
    <LegalPage
      title="Regulatory Disclosure"
      path="/regulatory-disclosure"
      content={REGULATORY_CONTENT.disclosure}
    />
  )
}
