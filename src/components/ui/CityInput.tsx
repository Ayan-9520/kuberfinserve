import { forwardRef, useId } from 'react'
import { DELHI_NCR_CITIES } from '@/data/cities'
import { cn } from '@/utils/cn'

interface CityInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const CityInput = forwardRef<HTMLInputElement, CityInputProps>(
  ({ className, error, placeholder = 'Type city name', ...props }, ref) => {
    const listId = useId()

    return (
      <>
        <input
          ref={ref}
          type="text"
          list={listId}
          autoComplete="off"
          placeholder={placeholder}
          className={cn(className, error && 'border-red-400')}
          {...props}
        />
        <datalist id={listId}>
          {DELHI_NCR_CITIES.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </>
    )
  },
)

CityInput.displayName = 'CityInput'
