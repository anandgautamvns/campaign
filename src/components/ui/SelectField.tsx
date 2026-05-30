import Icon from './Icon'
import './SelectField.css'

interface SelectFieldProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SelectField = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}: SelectFieldProps) => {
  return (
    <div className="select-field">
      <label className="select-field__label">{label}</label>
      <div className="select-field__wrapper">
        <select
          className="select-field__select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder ?? `Select ${label.toLowerCase()}`}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="select-field__icon">
          <Icon name='chevron-down' size={16} color='#1977f2' />
        </span>
      </div>
    </div>
  )
}

export default SelectField
