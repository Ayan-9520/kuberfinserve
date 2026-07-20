export interface ProductFaq {
  q: string
  a: string
}

export const PRODUCT_FAQS: Record<string, readonly ProductFaq[]> = {
  'home-loan': [
    {
      q: 'What is the minimum interest rate for a home loan?',
      a: 'Home loan interest rates on KuberFinserve start from 7.10% p.a.* Rates vary by lender, loan amount, property type, credit profile and prevailing RBI-linked benchmarks. We help you compare multiple offers subject to eligibility.',
    },
    {
      q: 'Can I get a home loan for under-construction property?',
      a: 'Yes. Many partner lenders offer home loans for under-construction, ready-to-move and self-construction projects. Disbursement is typically linked to construction milestones as per lender policy.',
    },
    {
      q: 'What is the maximum home loan amount I can get?',
      a: 'Funding can go up to ₹25 Crore* depending on property valuation, income, existing obligations and lender norms. Higher amounts may require additional collateral or co-applicants.',
    },
    {
      q: 'Can salaried and self-employed applicants apply?',
      a: 'Yes. Both salaried professionals and self-employed individuals can apply. Income assessment methods differ — salary slips/Form 16 for salaried and ITR/GST for self-employed profiles.',
    },
    {
      q: 'Is balance transfer available on home loans?',
      a: 'Yes. You can transfer your existing home loan to another lender for potentially lower interest rates or better terms. Top-up facilities may also be available subject to eligibility.',
    },
    {
      q: 'What documents are required for a home loan?',
      a: 'Typically KYC, income proof, bank statements and property documents. Exact requirements vary by lender and whether the property is ready or under construction.',
    },
    {
      q: 'How long does home loan processing take?',
      a: 'Processing usually takes 3–7 working days* after complete documentation, subject to legal/technical verification and lender approval timelines.',
    },
    {
      q: 'Does KuberFinserve guarantee home loan approval?',
      a: 'No. KuberFinserve is a loan distribution and advisory platform. Final sanction, rate and terms are solely at the discretion of the respective bank or NBFC.',
    },
    {
      q: 'Can NRIs apply for a home loan in India?',
      a: 'Selected lenders offer home loans to NRIs/PIOs subject to specific documentation, repatriation norms and property location rules. Our advisors can guide you on eligible options.',
    },
    {
      q: 'Are there tax benefits on home loans?',
      a: 'Eligible borrowers may claim deductions under applicable sections of the Income Tax Act for principal and interest components, as per current tax laws and individual circumstances. Consult a tax advisor for personalised guidance.',
    },
  ],
  'loan-against-property': [
    {
      q: 'What is Loan Against Property (LAP)?',
      a: 'LAP allows you to unlock the market value of residential, commercial or industrial property while continuing to use or occupy it, subject to lender mortgage terms and eligibility.',
    },
    {
      q: 'What interest rate does LAP start from?',
      a: 'LAP rates on our platform start from 9.00% p.a.* Actual rates depend on property type, location, LTV, credit score and lender policy.',
    },
    {
      q: 'What is the maximum loan against property amount?',
      a: 'Funding can be up to ₹25 Crore* based on property valuation, income and lender LTV norms. Higher amounts may require additional security.',
    },
    {
      q: 'Can I get an overdraft facility on LAP?',
      a: 'Many lenders offer OD or dropline OD facilities against mortgage of property, allowing flexible withdrawals subject to sanctioned limit and annual review.',
    },
    {
      q: 'Is LAP available on rental property?',
      a: 'Yes, rental or leased commercial/residential properties may qualify with selected lenders, subject to lease terms, tenant profile and legal clearance.',
    },
    {
      q: 'Can I balance transfer my existing LAP?',
      a: 'Yes. Balance transfer and top-up options are available with partner lenders for eligible borrowers seeking better rates or additional funding.',
    },
    {
      q: 'How is property value assessed?',
      a: 'Lenders appoint empanelled valuers for legal and technical due diligence. Final loan amount is based on the lower of agreement value or assessed market value and LTV caps.',
    },
    {
      q: 'What is the typical LAP tenure?',
      a: 'Tenure can extend up to 20 years* depending on applicant age, property type and lender guidelines.',
    },
    {
      q: 'Does KuberFinserve provide LAP directly?',
      a: 'No. We connect you with banks and NBFCs. We do not lend money directly; approval rests with the lender.',
    },
    {
      q: 'What happens if I prepay my LAP?',
      a: 'Prepayment and foreclosure charges vary by lender and product type. Fixed-rate loans may carry prepayment penalties; floating-rate products often have more flexible terms.',
    },
  ],
  'business-loan': [
    {
      q: 'Who can apply for a business loan?',
      a: 'Proprietorships, partnerships, LLPs, private limited companies and MSMEs with stable business vintage and verifiable financials can explore business loan options subject to lender criteria.',
    },
    {
      q: 'What is the starting interest rate for business loans?',
      a: 'Business loan rates start from 10.50% p.a.* on KuberFinserve. Actual pricing depends on turnover, profitability, credit bureau score, collateral and lender program.',
    },
    {
      q: 'What is the maximum business loan amount?',
      a: 'Funding up to ₹10 Crore* is available across partner lenders for eligible MSMEs and corporates. Higher limits may require secured collateral.',
    },
    {
      q: 'Are GST-based business loans available?',
      a: 'Yes. Several lenders offer GST turnover-based unsecured programs for businesses with consistent return filing and banking conduct.',
    },
    {
      q: 'Can I use a business loan for machinery purchase?',
      a: 'Yes. Term loans for machinery, equipment and expansion are common. For asset-specific funding, you may also consider a dedicated machinery loan.',
    },
    {
      q: 'What is the difference between business loan and working capital?',
      a: 'Business loans are typically term facilities for capex or expansion. Working capital covers day-to-day operations via cash credit, overdraft or invoice finance.',
    },
    {
      q: 'How fast can a business loan be disbursed?',
      a: 'Digital programs may sanction within 2–5 working days* after document verification. Secured or high-ticket cases may take longer.',
    },
    {
      q: 'Is collateral mandatory?',
      a: 'Not always. Unsecured programs exist for eligible profiles. Secured loans may offer higher limits and lower rates.',
    },
    {
      q: 'Does KuberFinserve guarantee business loan approval?',
      a: 'No. We facilitate comparison and application support. Final credit decision is with the respective bank or NBFC.',
    },
    {
      q: 'What documents do lenders typically ask for?',
      a: 'Business KYC, GST/ITR, bank statements, financial statements and business proof. Requirements vary by loan size and lender.',
    },
  ],
  'working-capital': [
    {
      q: 'What is a working capital loan?',
      a: 'Working capital facilities help businesses manage day-to-day expenses — inventory, vendor payments, payroll and seasonal demand — through cash credit, overdraft or invoice-based limits.',
    },
    {
      q: 'What interest rate does working capital start from?',
      a: 'Rates start from 9.50% p.a.* on revolving limits. Pricing is linked to benchmark rates, drawing power and annual review by the lender.',
    },
    {
      q: 'What is the maximum working capital limit?',
      a: 'Limits up to ₹20 Crore* may be available for eligible businesses based on turnover, stock/debtors, banking conduct and lender assessment.',
    },
    {
      q: 'What is the difference between cash credit and overdraft?',
      a: 'Cash credit (CC) is typically secured against stock and book debts with periodic stock statements. Overdraft (OD) may be secured or unsecured with flexible withdrawals up to the sanctioned limit.',
    },
    {
      q: 'Can working capital help during festival season?',
      a: 'Yes. Seasonal limits and temporary enhancements are common for retail, distribution and manufacturing businesses with predictable peak cycles.',
    },
    {
      q: 'Is invoice discounting available?',
      a: 'Selected lenders offer invoice finance / bill discounting for B2B businesses with quality receivables and established buyer relationships.',
    },
    {
      q: 'Are GST returns required?',
      a: 'Most lenders review GST filings and banking turnover for limit assessment. Consistent compliance strengthens eligibility.',
    },
    {
      q: 'How often is the limit reviewed?',
      a: 'Annual or semi-annual reviews are standard. Drawing power may be adjusted based on stock statements, financials and account conduct.',
    },
    {
      q: 'Does KuberFinserve lend working capital directly?',
      a: 'No. KuberFinserve is an advisory and distribution platform connecting you with banks and NBFCs.',
    },
    {
      q: 'Can a new business get working capital?',
      a: 'Most programs require minimum business vintage (often 1+ years) and track record. Start-ups may explore alternate programs subject to lender policy.',
    },
  ],
  'personal-loan': [
    {
      q: 'What is the minimum personal loan interest rate?',
      a: 'Personal loan rates on KuberFinserve start from 10.49% p.a.* Final rate depends on employer category, income, credit score and lender policy.',
    },
    {
      q: 'What is the maximum personal loan amount?',
      a: 'Eligible applicants may access up to ₹50 Lakh* subject to income, existing EMIs and lender multipliers.',
    },
    {
      q: 'Is collateral required for a personal loan?',
      a: 'No. Personal loans are unsecured — no property or asset pledge is typically required.',
    },
    {
      q: 'How quickly can I get a personal loan?',
      a: 'Pre-approved and digital journeys may offer same-day or 24–48 hour disbursal* for eligible salaried profiles with complete KYC.',
    },
    {
      q: 'Can I use a personal loan for any purpose?',
      a: 'Yes. Common uses include medical expenses, weddings, travel, education and debt consolidation, subject to lender end-use norms.',
    },
    {
      q: 'What credit score is preferred?',
      a: 'A CIBIL score of 700+ improves approval odds and pricing, though some lenders evaluate holistically.',
    },
    {
      q: 'Can self-employed individuals apply?',
      a: 'Yes. ITR-based assessment is used for self-employed and professional applicants with stable income history.',
    },
    {
      q: 'Are there prepayment charges?',
      a: 'Floating-rate personal loans often allow prepayment with minimal charges. Fixed-rate products may carry foreclosure fees — check lender T&C.',
    },
    {
      q: 'Does KuberFinserve guarantee instant approval?',
      a: 'No. We help you compare and apply. Approval timelines and outcomes depend on the lender.',
    },
    {
      q: 'What documents are needed?',
      a: 'KYC, salary slips or ITR, bank statements and employment/business proof. Exact list varies by lender and loan amount.',
    },
  ],
  'new-car-loan': [
    {
      q: 'What is the starting interest rate for a new car loan?',
      a: 'New car loan rates start from 7.75% p.a.* on KuberFinserve. EV and luxury segments may have dedicated programs with different pricing.',
    },
    {
      q: 'Can I get 100% on-road funding?',
      a: 'Up to 100% on-road funding* may be available for eligible profiles with strong credit and income. LTV varies by vehicle make, model and lender.',
    },
    {
      q: 'What is the maximum tenure for a new car loan?',
      a: 'Tenure can extend up to 8 years* depending on vehicle category, applicant age at maturity and lender norms.',
    },
    {
      q: 'Are electric vehicles (EV) eligible?',
      a: 'Yes. Many lenders offer preferential rates or special schemes for electric cars subject to approved dealer and model lists.',
    },
    {
      q: 'Is doorstep service available?',
      a: 'Selected lenders and our partner network offer doorstep documentation for car loan processing in major cities.',
    },
    {
      q: 'Can I finance luxury cars?',
      a: 'Yes. High-value luxury and imported vehicles may qualify with enhanced income proof and higher down payment requirements.',
    },
    {
      q: 'What happens if I default on EMI?',
      a: 'Late payment charges and credit bureau reporting apply as per lender agreement. Vehicle repossession is a last resort per regulatory guidelines.',
    },
    {
      q: 'Can I prepay my car loan?',
      a: 'Most lenders allow partial or full prepayment. Charges depend on whether the loan is fixed or floating rate.',
    },
    {
      q: 'Does KuberFinserve sell cars?',
      a: 'No. We only facilitate auto loan comparison and application with banks and NBFCs through authorized dealers.',
    },
    {
      q: 'What documents are required?',
      a: 'KYC, income proof, bank statements and proforma invoice from the dealer. Additional documents may apply for self-employed applicants.',
    },
  ],
  'used-car-loan': [
    {
      q: 'What is the starting rate for used car loans?',
      a: 'Used car loan rates start from 9.25% p.a.* Pricing depends on vehicle age, valuation, ownership history and applicant profile.',
    },
    {
      q: 'How old can the car be?',
      a: 'Most lenders finance vehicles up to 8–10 years old at loan origination. Age at loan maturity also affects eligibility.',
    },
    {
      q: 'Can I buy from an individual seller?',
      a: 'Yes. Individual purchase and authorized dealer purchase are both supported by selected lenders with proper RC transfer and valuation.',
    },
    {
      q: 'What is the maximum used car loan amount?',
      a: 'Funding up to ₹5 Crore* is available for high-value pre-owned luxury vehicles subject to valuation and LTV norms.',
    },
    {
      q: 'Is valuation mandatory?',
      a: 'Yes. Lenders require independent or empanelled valuation along with clear RC, insurance and no-hypothecation/NOC where applicable.',
    },
    {
      q: 'What tenure is available?',
      a: 'Up to 7 years* depending on vehicle age, category and applicant age at loan closure.',
    },
    {
      q: 'Are luxury used cars financed?',
      a: 'Yes. Premium pre-owned cars from brands like BMW, Mercedes, Audi and others may qualify with enhanced documentation.',
    },
    {
      q: 'How fast is approval?',
      a: 'Digital-savvy lenders may approve within 24–48 hours* after valuation and document verification.',
    },
    {
      q: 'Does KuberFinserve guarantee used car loan approval?',
      a: 'No. Final decision rests with the lending institution after their credit and asset assessment.',
    },
    {
      q: 'What if the car has existing hypothecation?',
      a: 'The existing loan must be closed and NOC obtained before new hypothecation, or a balance transfer structure may be used.',
    },
  ],
  'education-loan': [
    {
      q: 'What is the starting education loan interest rate?',
      a: 'Education loan rates start from 8.15% p.a.* on KuberFinserve. Concessions may apply for premier institutions and girl students per lender policy.',
    },
    {
      q: 'What is the maximum education loan amount?',
      a: 'Funding up to ₹3 Crore* is available for domestic and international programs at recognized institutions, subject to course cost and co-borrower profile.',
    },
    {
      q: 'Can I get an education loan for studying abroad?',
      a: 'Yes. Partner lenders cover tuition, living expenses and travel for approved universities abroad with co-applicant and collateral norms as applicable.',
    },
    {
      q: 'What is a moratorium period?',
      a: 'Moratorium allows repayment to begin after course completion plus a grace period. Interest may accrue during moratorium — terms vary by lender.',
    },
    {
      q: 'Are tax benefits available?',
      a: 'Interest paid on education loans may qualify for deduction under Section 80E of the Income Tax Act for eligible borrowers, as per current law.',
    },
    {
      q: 'Is collateral required?',
      a: 'Loans up to specified limits may be collateral-free. Higher amounts or certain courses may require security or third-party guarantee.',
    },
    {
      q: 'Can skill development courses be financed?',
      a: 'Selected lenders offer loans for certification and skill programs at recognized institutes. Course approval lists vary.',
    },
    {
      q: 'Who can be a co-applicant?',
      a: 'Parent, spouse or earning guardian typically serves as co-applicant/co-borrower for income assessment and repayment responsibility.',
    },
    {
      q: 'How long does sanction take?',
      a: 'Sanction letters may be issued within 3–7 working days* after admission proof and document verification.',
    },
    {
      q: 'Does KuberFinserve disburse education loans?',
      a: 'No. Disbursement is made directly by the bank or NBFC to the institution or student account per sanction terms.',
    },
  ],
  'machinery-loan': [
    {
      q: 'What is a machinery loan?',
      a: 'Machinery loans finance purchase of new or used plant, equipment and industrial assets to expand manufacturing or operational capacity.',
    },
    {
      q: 'What is the starting interest rate?',
      a: 'Machinery loan rates start from 9.25% p.a.* Secured asset-backed structures may offer competitive pricing subject to eligibility.',
    },
    {
      q: 'What is the maximum machinery loan amount?',
      a: 'Funding up to ₹15 Crore* is available for eligible businesses based on project cost, cash flows and collateral.',
    },
    {
      q: 'Can used machinery be financed?',
      a: 'Yes. Used equipment up to a certain age may qualify with valuation, residual life assessment and vendor/dealer invoice.',
    },
    {
      q: 'What types of equipment are covered?',
      a: 'Manufacturing plant, construction equipment, medical devices, printing machinery and other productive assets per lender approved lists.',
    },
    {
      q: 'What tenure is available?',
      a: 'Repayment tenure up to 10 years* aligned with useful life of the asset and business cash generation.',
    },
    {
      q: 'Is hypothecation of machinery required?',
      a: 'Yes. The financed equipment is typically hypothecated to the lender until loan closure.',
    },
    {
      q: 'Can MSMEs apply?',
      a: 'Yes. MSMEs, SMEs and larger enterprises with stable operations and financials can explore machinery funding programs.',
    },
    {
      q: 'How is disbursal done?',
      a: 'Disbursal is usually directly to the supplier/dealer upon invoice verification and asset delivery confirmation.',
    },
    {
      q: 'Does KuberFinserve guarantee machinery loan approval?',
      a: 'No. Credit assessment and asset approval are solely at the discretion of the lending partner.',
    },
  ],
  'credit-card': [
    {
      q: 'What credit cards are available through KuberFinserve?',
      a: 'We help you compare cards from HDFC, ICICI, SBI, Axis, Kotak and other issuers — including cashback, rewards, travel and business cards.',
    },
    {
      q: 'Are lifetime free credit cards available?',
      a: 'Annual fees start from lifetime free* on select cards for eligible profiles. Fee waivers may apply based on spend milestones.',
    },
    {
      q: 'What is the maximum credit limit?',
      a: 'Limits up to ₹50 Lakh* may be offered to high-income profiles with strong credit history. Initial limits depend on issuer assessment.',
    },
    {
      q: 'Can I get lounge access?',
      a: 'Premium and travel cards often include domestic/international lounge visits subject to card tier and spend conditions.',
    },
    {
      q: 'Are UPI credit cards available?',
      a: 'Yes. RuPay credit on UPI is offered by select issuers — linking your credit line to UPI for merchant payments.',
    },
    {
      q: 'Can self-employed individuals get a credit card?',
      a: 'Yes. ITR-based and banking turnover programs exist for self-employed and business owners with selected issuers.',
    },
    {
      q: 'How does EMI conversion work?',
      a: 'Large transactions can be converted to EMIs at issuer-defined rates and tenures via app, SMS or customer care.',
    },
    {
      q: 'Will applying affect my credit score?',
      a: 'Each application may trigger a hard inquiry on your credit bureau report. Multiple applications in short span can impact score temporarily.',
    },
    {
      q: 'Does KuberFinserve issue credit cards?',
      a: 'No. Cards are issued by partner banks and NBFCs. We provide comparison and application assistance only.',
    },
    {
      q: 'What documents are needed?',
      a: 'KYC, income proof (salary slips/ITR), bank statements and photograph. Business cards may require additional business proof.',
    },
  ],
}
