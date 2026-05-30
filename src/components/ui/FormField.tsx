import './FormField.css'

interface FormFieldProps {
  label: string
  optional?: boolean
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: string
}

const FormField = ({
  label,
  optional = false,
  placeholder,
  value,
  onChange,
  type = 'text',
}: FormFieldProps) => {
  return (
    <div className="form-field">
      <label className="form-field__label">
        {label}
        {optional && <span className="form-field__optional"> (Optional)</span>}
      </label>
      <input
        type={type}
        className="form-field__input"
        placeholder={placeholder ?? label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default FormField
