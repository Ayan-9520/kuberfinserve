import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  LogIn,
  Smartphone,
} from 'lucide-react'
import { SITE } from '@/data/site'
import { PARTNER_LOGIN_SEO } from '@/data/partners'
import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { useToast } from '@/components/ui/Toast'
import { openMobileApp } from '@/utils/partnerApp'
import { loginPartner } from '@/utils/submitPartnerApi'
import { getPartnerToken, getPartnerProfile, savePartnerSession } from '@/utils/partnerAuth'
import { cn } from '@/utils/cn'

interface LoginFormData {
  identifier: string
  password: string
  otp: string
}

export function PartnerLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password')
  const [otpRequested, setOtpRequested] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null)
  const { showSuccess, showError } = useToast()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  const inputClass =
    'w-full rounded-lg border border-[var(--pf-border)] bg-[var(--pf-bg)]/80 px-3 py-2.5 text-sm text-[var(--pf-text)] placeholder:text-[var(--pf-text-muted)] focus:border-[var(--pf-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--pf-primary)]/25'

  const redirectToAppWithToken = (token: string, partnerId: string | null) => {
    setRedirecting(true)
    openMobileApp('partner', {
      token,
      partner_id: partnerId ?? '',
    })
    window.setTimeout(() => setRedirecting(false), 2500)
  }

  const handleOpenApp = () => {
    const token = getPartnerToken()
    const profile = getPartnerProfile()
    if (token && profile?.partner_id) {
      redirectToAppWithToken(token, profile.partner_id)
      return
    }
    openMobileApp('partner')
  }

  const onPasswordLogin = async (data: LoginFormData) => {
    setLoginError(null)
    setLoginSuccess(null)

    const result = await loginPartner({
      identifier: data.identifier.trim(),
      password: data.password,
      mode: 'password',
    })

    if (!result.ok || !result.token || !result.partner) {
      const message = result.error ?? 'Login failed. Please try again.'
      setLoginError(message)
      showError(message)
      return
    }

    savePartnerSession(result.token, {
      id: result.partner.id,
      partner_id: result.partner.partner_id,
      full_name: result.partner.full_name,
      email: result.partner.email,
      phone: result.partner.phone,
      status: result.partner.status,
    })

    const successMessage = result.must_change_password
      ? 'Login successful. Please change your temporary password in the app.'
      : 'Login successful. Opening KuberOne app…'
    setLoginSuccess(successMessage)
    showSuccess(successMessage)

    redirectToAppWithToken(result.token, result.partner.partner_id)
  }

  const onRequestOtp = async () => {
    const identifier = getValues('identifier')?.trim()
    if (!identifier) {
      const message = 'Please enter your Partner ID or email for OTP login.'
      setLoginError(message)
      showError(message)
      return
    }

    setLoginError(null)
    setLoginSuccess(null)

    const result = await loginPartner({
      identifier,
      mode: 'otp_request',
    })

    if (!result.ok) {
      const message = result.error ?? 'Could not send OTP.'
      setLoginError(message)
      showError(message)
      return
    }

    setOtpRequested(true)
    const otpMessage = result.message ?? 'OTP sent to your registered mobile number.'
    setLoginSuccess(otpMessage)
    showSuccess(otpMessage)
  }

  const onOtpLogin = async () => {
    const identifier = getValues('identifier')?.trim()
    const otp = getValues('otp')?.trim()

    if (!identifier) {
      const message = 'Please enter your Partner ID or email.'
      setLoginError(message)
      showError(message)
      return
    }
    if (!otp) {
      const message = 'Please enter the OTP sent to your mobile.'
      setLoginError(message)
      showError(message)
      return
    }

    setLoginError(null)
    setLoginSuccess(null)

    const result = await loginPartner({
      identifier,
      otp,
      mode: 'otp',
    })

    if (!result.ok || !result.token || !result.partner) {
      const message = result.error ?? 'Invalid OTP.'
      setLoginError(message)
      showError(message)
      return
    }

    savePartnerSession(result.token, {
      id: result.partner.id,
      partner_id: result.partner.partner_id,
      full_name: result.partner.full_name,
      email: result.partner.email,
      phone: result.partner.phone,
      status: result.partner.status,
    })

    const successMessage = 'Login successful. Opening KuberOne app…'
    setLoginSuccess(successMessage)
    showSuccess(successMessage)
    redirectToAppWithToken(result.token, result.partner.partner_id)
  }

  const handleForgotPassword = () => {
    const message = encodeURIComponent(
      'Hi KuberFinserve, I need help resetting my KuberOne partner login password.',
    )
    window.open(`https://wa.me/${SITE.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="partners-root min-h-[calc(100vh-8rem)] overflow-x-hidden">
      <SeoHead
        title={PARTNER_LOGIN_SEO.title}
        description={PARTNER_LOGIN_SEO.description}
        path={PARTNER_LOGIN_SEO.path}
        keywords={PARTNER_LOGIN_SEO.keywords}
      />
      <JsonLd
        id="jsonld-partner-login"
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: PARTNER_LOGIN_SEO.title,
          description: PARTNER_LOGIN_SEO.description,
          url: 'https://kuberfinserve.com/partner-login',
        }}
      />

      <section className="pf-hero-glow pf-grid-bg relative flex min-h-[calc(100vh-8rem)] items-center py-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <Link
              to={SITE.becomePartnerUrl}
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--pf-text-muted)] transition-colors hover:text-[var(--pf-primary)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Become a Partner
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="pf-form-card rounded-2xl p-6 md:p-8"
            >
              <div className="mb-6 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--pf-primary)]/25 bg-[var(--pf-primary)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--pf-primary)]">
                  {SITE.platformName}
                </span>
                <h1 className="mt-3 font-heading text-2xl font-bold text-[var(--pf-text)]">Partner Login</h1>
                <p className="mt-1.5 text-sm text-[var(--pf-text-secondary)]">
                  Sign in with your approved partner credentials. Access continues in the {SITE.platformName} app.
                </p>
                <button
                  type="button"
                  onClick={handleOpenApp}
                  className="pf-btn-primary mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold"
                >
                  <Smartphone className="h-4 w-4" />
                  Open Partner App
                </button>
              </div>

              <form onSubmit={handleSubmit(onPasswordLogin)} className="space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="partner-identifier"
                    className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]"
                  >
                    Partner ID / Email
                  </label>
                  <input
                    id="partner-identifier"
                    {...register('identifier', { required: 'Required' })}
                    placeholder="Partner ID or email address"
                    autoComplete="username"
                    className={cn(inputClass, errors.identifier && 'border-red-400')}
                  />
                  {errors.identifier && (
                    <p className="mt-0.5 text-[11px] text-red-400">{errors.identifier.message}</p>
                  )}
                </div>

                {loginMode === 'password' && (
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label
                        htmlFor="partner-password"
                        className="text-[11px] font-medium text-[var(--pf-text-secondary)]"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-[11px] font-medium text-[var(--pf-primary)] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        id="partner-password"
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className={cn(inputClass, 'pr-10')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--pf-text-muted)] hover:text-[var(--pf-text)]"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {loginMode === 'otp' && otpRequested && (
                  <div>
                    <label
                      htmlFor="partner-otp"
                      className="mb-1 block text-[11px] font-medium text-[var(--pf-text-secondary)]"
                    >
                      OTP
                    </label>
                    <input
                      id="partner-otp"
                      {...register('otp')}
                      placeholder="6-digit OTP"
                      inputMode="numeric"
                      maxLength={6}
                      className={inputClass}
                    />
                  </div>
                )}

                {loginError && (
                  <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-[11px] text-red-400">
                    {loginError}
                  </p>
                )}

                {loginSuccess && (
                  <p className="rounded-lg border border-[var(--pf-primary)]/30 bg-[var(--pf-primary)]/10 px-3 py-2 text-[11px] text-[var(--pf-primary)]">
                    {loginSuccess}
                  </p>
                )}

                {redirecting && (
                  <p className="rounded-lg border border-[var(--pf-border)] bg-[var(--pf-bg)]/60 px-3 py-2 text-[11px] text-[var(--pf-text-muted)]">
                    Opening {SITE.platformName} app… If it doesn&apos;t open, download the app below.
                  </p>
                )}

                {loginMode === 'password' ? (
                  <button
                    type="submit"
                    disabled={isSubmitting || redirecting}
                    className="pf-btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors disabled:opacity-70"
                  >
                    <LogIn className="h-4 w-4" />
                    {isSubmitting || redirecting ? 'Signing in…' : 'Login'}
                  </button>
                ) : !otpRequested ? (
                  <button
                    type="button"
                    onClick={onRequestOtp}
                    disabled={isSubmitting || redirecting}
                    className="pf-btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors disabled:opacity-70"
                  >
                    <KeyRound className="h-4 w-4" />
                    Send OTP
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onOtpLogin}
                    disabled={isSubmitting || redirecting}
                    className="pf-btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-colors disabled:opacity-70"
                  >
                    <KeyRound className="h-4 w-4" />
                    {isSubmitting || redirecting ? 'Verifying…' : 'Verify OTP & Login'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setLoginMode(loginMode === 'password' ? 'otp' : 'password')
                    setOtpRequested(false)
                    setLoginError(null)
                    setLoginSuccess(null)
                  }}
                  className="w-full text-center text-xs font-medium text-[var(--pf-text-muted)] transition-colors hover:text-[var(--pf-primary)]"
                >
                  {loginMode === 'password' ? 'Login with OTP' : 'Login with Password'}
                </button>
              </form>
            </motion.div>

            <p className="mt-4 text-center text-xs text-[var(--pf-text-muted)]">
              New partner?{' '}
              <Link to={SITE.becomePartnerUrl} className="font-medium text-[var(--pf-primary)] hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
