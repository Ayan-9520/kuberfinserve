import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  LogIn,
  Smartphone,
} from 'lucide-react'
import { SITE } from '@/data/site'
import { PARTNER_LOGIN_SEO } from '@/data/partners'
import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { useToast } from '@/components/ui/Toast'
import { loginPartner } from '@/utils/submitPartnerApi'
import { getPartnerToken, getPartnerProfile, savePartnerSession } from '@/utils/partnerAuth'
import { PlatformLogo } from '@/components/PlatformLogo'
import { cn } from '@/utils/cn'

interface LoginFormData {
  identifier: string
  password: string
  otp: string
}

function validateIdentifier(raw: string): string | null {
  const identifier = raw.trim().replace(/\.+$/, '').trim()
  if (!identifier) return 'Mobile, email, or Partner Code is required'

  if (identifier.includes('@')) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) return 'Enter a valid email address'
    return null
  }

  const digits = identifier.replace(/\D/g, '')
  const looksLikeMobile =
    digits.length >= 10 && !/^[A-Za-z]{2,}/.test(identifier)

  if (looksLikeMobile) {
    let normalized = digits
    if (normalized.length === 12 && normalized.startsWith('91')) normalized = normalized.slice(2)
    if (normalized.length === 11 && normalized.startsWith('0')) normalized = normalized.slice(1)
    if (normalized.length !== 10) return 'Enter a valid 10-digit mobile number'
    if (!/^[6-9]/.test(normalized)) return 'Mobile number must start with 6-9'
  }

  return null
}

export function PartnerLogin() {
  const [searchParams] = useSearchParams()
  const academyIntent = searchParams.get('intent') === 'academy'
  const [showPassword, setShowPassword] = useState(false)
  const [loginMode, setLoginMode] = useState<'otp' | 'password'>('otp')
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
    'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-[3px] focus:ring-brand-500/15'

  const appOpenParams = (token: string, partnerId: string | null, refreshToken?: string | null) => {
    const base: Record<string, string> = {
      access_token: token,
      token,
      partner_id: partnerId ?? '',
    }
    if (refreshToken) base.refresh_token = refreshToken
    if (academyIntent) base.screen = 'academy'
    return base
  }

  /** After website OTP: open Partner web dashboard already logged in (no second OTP). */
  const redirectToPartnerPortalSso = (
    accessToken: string,
    refreshToken: string | null | undefined,
    partnerId: string | null,
  ) => {
    setRedirecting(true)
    const params = new URLSearchParams(appOpenParams(accessToken, partnerId, refreshToken))
    const portal = SITE.partnerPortalUrl.replace(/\/$/, '')
    window.location.assign(`${portal}/login#${params.toString()}`)
  }

  const redirectToAppWithToken = (
    token: string,
    partnerId: string | null,
    refreshToken?: string | null,
  ) => {
    // Desktop / any browser: SSO into partner.kuberone.online dashboard
    redirectToPartnerPortalSso(token, refreshToken, partnerId)
  }

  const handleOpenApp = () => {
    const token = getPartnerToken()
    const profile = getPartnerProfile()
    if (token && profile?.partner_id) {
      redirectToPartnerPortalSso(token, null, profile.partner_id)
      return
    }
    window.location.assign(`${SITE.partnerPortalUrl.replace(/\/$/, '')}/login`)
  }

  const onPasswordLogin = async (data: LoginFormData) => {
    setLoginError(null)
    setLoginSuccess(null)

    const idError = validateIdentifier(data.identifier)
    if (idError) {
      setLoginError(idError)
      showError(idError)
      return
    }

    const result = await loginPartner({
      identifier: data.identifier.trim().replace(/\.+$/, ''),
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
      : academyIntent
        ? 'Login successful. Opening Partner Academy…'
        : 'Login successful. Opening Partner dashboard…'
    setLoginSuccess(successMessage)
    showSuccess(successMessage)

    redirectToAppWithToken(result.token, result.partner.partner_id, result.refresh_token)
  }

  const onRequestOtp = async () => {
    const identifier = getValues('identifier')?.trim()
    const idError = validateIdentifier(identifier || '')
    if (idError) {
      setLoginError(idError)
      showError(idError)
      return
    }

    setLoginError(null)
    setLoginSuccess(null)

    const result = await loginPartner({
      identifier: identifier!.replace(/\.+$/, ''),
      mode: 'otp_request',
    })

    if (!result.ok) {
      const message = result.error ?? 'Could not send OTP.'
      setLoginError(message)
      showError(message)
      return
    }

    setOtpRequested(true)
    const parts: string[] = []
    if (result.phone_hint) parts.push(`mobile ${result.phone_hint}`)
    if (result.email_sent && result.email_hint) parts.push(`email ${result.email_hint}`)
    const where =
      parts.length > 0
        ? `OTP sent to ${parts.join(' and ')}.`
        : result.message ?? 'OTP sent to your registered mobile.'
    const otpMessage =
      import.meta.env.DEV || result.dev_otp
        ? `${where} Dev OTP: ${result.dev_otp ?? '123456'}.`
        : where
    setLoginSuccess(otpMessage)
    showSuccess(otpMessage)
  }

  const onOtpLogin = async () => {
    const identifier = getValues('identifier')?.trim()
    const otp = getValues('otp')?.trim()

    const idError = validateIdentifier(identifier || '')
    if (idError) {
      setLoginError(idError)
      showError(idError)
      return
    }
    if (!otp || otp.length !== 6) {
      const message = 'Please enter the 6-digit OTP sent to your mobile.'
      setLoginError(message)
      showError(message)
      return
    }

    setLoginError(null)
    setLoginSuccess(null)

    const result = await loginPartner({
      identifier: identifier!.replace(/\.+$/, ''),
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

    const codeHint = result.partner.partner_id
      ? ` Partner Code: ${result.partner.partner_id}.`
      : ''
    const successMessage = academyIntent
      ? `Login successful.${codeHint} Opening Partner Academy…`
      : `Login successful.${codeHint} Opening Partner dashboard…`
    setLoginSuccess(successMessage)
    showSuccess(successMessage)
    redirectToAppWithToken(result.token, result.partner.partner_id, result.refresh_token)
  }

  const handleForgotPassword = () => {
    const message = encodeURIComponent(
      'Hi KuberFinserve, I need help resetting my KuberOne partner login password.',
    )
    window.open(`https://wa.me/${SITE.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="partner-login-page relative min-h-[calc(100vh-7.5rem)] overflow-x-hidden">
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

      {/* Local free-to-use background (Unsplash License — commercial OK) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src="/images/partner-login-bg.jpg"
          alt=""
          className="h-full w-full scale-105 object-cover object-center blur-[2px]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#0a2e26]/50 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e26]/35 via-[#0a2e26]/25 to-[#0a2e26]/60" />
      </div>

      <section className="relative flex min-h-[calc(100vh-7.5rem)] items-center justify-center px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-[440px]">
          <Link
            to={SITE.becomePartnerUrl}
            className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/85 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Become a Partner
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-white/95 p-7 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.4)] backdrop-blur-md ring-1 ring-white/50 sm:p-8"
          >
            <div className="mb-5 text-center">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4faf7] ring-1 ring-brand-100">
                <PlatformLogo size="sm" showName={false} nameBelow={false} />
              </span>
              <h1 className="font-heading text-xl font-bold tracking-tight text-navy-900">
                {academyIntent ? 'Login to Partner Academy' : 'Partner Login'}
              </h1>
              <p className="mt-1 text-[13px] text-slate-500">
                {academyIntent
                  ? 'After login, Academy opens in the KuberOne DSA app'
                  : `${SITE.platformName} · Partner role · OTP after Admin approval`}
              </p>
              {academyIntent ? (
                <p className="mt-3 rounded-xl bg-brand-50 px-3 py-2 text-left text-[12px] leading-snug text-brand-900 ring-1 ring-brand-100">
                  Website shows Academy overview only. Courses, dashboard and certificates unlock inside the
                  app after this login. Employee / Admin / Lender use KuberOne Admin — not this page.
                </p>
              ) : (
                <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-left text-[12px] leading-snug text-slate-600 ring-1 ring-slate-100">
                  This login is for <strong className="font-semibold text-navy-900">Partner</strong> accounts.
                  Employee, Admin, Lender and Sales Coordinator dashboards open in KuberOne Admin.
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit(onPasswordLogin)} className="space-y-3.5" noValidate>
              <div>
                <label
                  htmlFor="partner-identifier"
                  className="mb-1.5 block text-[12px] font-semibold text-slate-700"
                >
                  Mobile / Email / Partner Code
                </label>
                <input
                  id="partner-identifier"
                  {...register('identifier', { required: 'Required' })}
                  placeholder="9876543210 or DSA-XXXXXX"
                  autoComplete="username"
                  className={cn(inputClass, errors.identifier && 'border-red-400')}
                />
                {errors.identifier && (
                  <p className="mt-1 text-[11px] text-red-600">{errors.identifier.message}</p>
                )}
              </div>

              {loginMode === 'password' && (
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="partner-password"
                      className="text-[12px] font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[11px] font-medium text-brand-700 hover:underline"
                    >
                      Forgot password?
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-800"
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
                    className="mb-1.5 block text-[12px] font-semibold text-slate-700"
                  >
                    Enter OTP
                  </label>
                  <input
                    id="partner-otp"
                    {...register('otp')}
                    placeholder="6-digit code"
                    inputMode="numeric"
                    maxLength={6}
                    className={cn(inputClass, 'tracking-[0.2em]')}
                  />
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    OTP goes to the partner&apos;s registered mobile
                    {import.meta.env.DEV ? ' · Dev OTP: 123456' : ''}
                    {' '}(and email when SMTP is configured). SMS gateway comes later.
                  </p>
                </div>
              )}

              {loginError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
                  {loginError}
                </p>
              )}

              {loginSuccess && (
                <p className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2 text-[12px] text-brand-800">
                  {loginSuccess}
                </p>
              )}

              {redirecting && (
                <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] text-slate-600">
                  Opening Partner dashboard…
                </p>
              )}

              {loginMode === 'password' ? (
                <button
                  type="submit"
                  disabled={isSubmitting || redirecting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white shadow-md shadow-brand-900/25 transition hover:bg-brand-800 disabled:opacity-70"
                >
                  <LogIn className="h-4 w-4" />
                  {isSubmitting || redirecting ? 'Signing in…' : 'Sign in'}
                </button>
              ) : !otpRequested ? (
                <button
                  type="button"
                  onClick={onRequestOtp}
                  disabled={isSubmitting || redirecting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white shadow-md shadow-brand-900/25 transition hover:bg-brand-800 disabled:opacity-70"
                >
                  <KeyRound className="h-4 w-4" />
                  Continue with OTP
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOtpLogin}
                  disabled={isSubmitting || redirecting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 py-3 text-sm font-semibold text-white shadow-md shadow-brand-900/25 transition hover:bg-brand-800 disabled:opacity-70"
                >
                  <KeyRound className="h-4 w-4" />
                  {isSubmitting || redirecting ? 'Verifying…' : 'Verify & sign in'}
                </button>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode(loginMode === 'password' ? 'otp' : 'password')
                    setOtpRequested(false)
                    setLoginError(null)
                    setLoginSuccess(null)
                  }}
                  className="text-[12px] font-medium text-slate-500 hover:text-brand-800"
                >
                  {loginMode === 'otp' ? 'Use password' : 'Use OTP'}
                </button>
                <button
                  type="button"
                  onClick={handleOpenApp}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-700 hover:text-brand-900"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  Open Partner Portal
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-[12px] text-slate-500">
              New partner?{' '}
              <Link
                to={SITE.becomePartnerUrl}
                className="font-semibold text-brand-700 hover:underline"
              >
                Register here
              </Link>
            </p>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <Lock className="h-3 w-3" />
              Secure login · After Admin approval
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
