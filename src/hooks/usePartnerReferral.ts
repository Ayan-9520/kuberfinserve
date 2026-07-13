import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { capturePartnerReferralFromUrl } from '@/utils/partnerReferral'

export function usePartnerReferral(): string | null {
  const [searchParams] = useSearchParams()

  return useMemo(() => {
    void searchParams
    return capturePartnerReferralFromUrl()
  }, [searchParams])
}
