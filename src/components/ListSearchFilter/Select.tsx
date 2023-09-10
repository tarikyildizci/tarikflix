import { ChangeFilterFunctionType } from '@/util/useFilters'

type SelectProps = {
  value?: string
  onChange: ChangeFilterFunctionType
  options: Array<string>
  defaultValue: { label: string; value: string }
  name: 'type' | 'year'
  label: string
}

export const Select: React.FC<SelectProps> = ({
  onChange,
  value,
  defaultValue,
  options,
  label,
  name,
}) => (
  <div className="field-wrapper">
    <label htmlFor={name}>{label}</label>
    <select
      name={name}
      value={value ?? defaultValue.value}
      onChange={e =>
        onChange(
          name,
          e.target.value === defaultValue.value ? undefined : e.target.value
        )
      }
    >
      <option value={defaultValue.value}>{defaultValue.label}</option>
      {options.map((opt, index) => (
        <option key={index} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
)
