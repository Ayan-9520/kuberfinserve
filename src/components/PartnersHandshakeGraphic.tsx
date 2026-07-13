import { Landmark } from 'lucide-react'

export function PartnersHandshakeGraphic() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] lg:max-w-[360px]" aria-hidden>
      {/* Dark green offset shadow */}
      <div className="absolute left-4 top-5 h-[88%] w-[92%] rounded-[3.5rem] rounded-bl-[2rem] bg-brand-900" />
      {/* Brand green speech-bubble body */}
      <div className="relative flex items-center justify-center rounded-[3.5rem] rounded-bl-[2rem] bg-brand-600 px-14 py-16 md:px-16 md:py-20">
        <Landmark className="h-24 w-24 text-white md:h-28 md:w-28 lg:h-32 lg:w-32" strokeWidth={1.75} />
        <span className="absolute -bottom-7 left-1/2 h-0 w-0 -translate-x-[45%] border-l-[28px] border-r-[12px] border-t-[36px] border-l-transparent border-r-transparent border-t-brand-600 md:-bottom-8 md:border-l-[34px] md:border-t-[42px]" />
        <span className="absolute -bottom-9 left-[42%] h-0 w-0 -translate-x-1/2 border-l-[30px] border-r-[14px] border-t-[40px] border-l-transparent border-r-transparent border-t-brand-900 md:-bottom-10" />
      </div>
    </div>
  )
}
