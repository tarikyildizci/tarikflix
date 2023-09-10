import { useEffect, useState } from 'react'

export const SearchInput: React.FC<{
  value?: string
  onChange: (newSearch?: string) => void
}> = ({ onChange, value }) => {
  const [internalValue, setInternalValue] = useState<string | undefined>(value)

  // two way state setters, needed because of debouncing
  useEffect(() => {
    value !== internalValue && setInternalValue(value)
  }, [value])

  useEffect(() => {
    value !== internalValue && onChange(internalValue)
  }, [internalValue])

  return (
    <div className="field-wrapper">
      <label htmlFor="search">Search</label>
      <input
        name="search"
        value={internalValue ?? ''} // casts undefined to empty string to prevent controlled / uncontrolled error
        onChange={e => setInternalValue(e.target.value)}
      />
    </div>
  )
}
