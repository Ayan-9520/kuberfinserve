export interface ApplyLoanWizardData {
  fullName: string
  phone: string
  email: string
  city: string
  employmentType: string
  monthlyIncome: string
  companyName: string
  workExperience: string
  loanType: string
  loanAmount: string
  tenureMonths: string
  propertyValue: string
  agreeTerms: boolean
}

export const EMPTY_WIZARD: ApplyLoanWizardData = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  employmentType: '',
  monthlyIncome: '',
  companyName: '',
  workExperience: '',
  loanType: '',
  loanAmount: '',
  tenureMonths: '',
  propertyValue: '',
  agreeTerms: false,
}
