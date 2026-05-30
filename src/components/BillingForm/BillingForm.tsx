import { useState } from 'react'
import FormField from '../ui/FormField'
import SelectField from '../ui/SelectField'
import './BillingForm.css'
import { CITIES_BY_STATE, INDIAN_STATES } from '../../mockData/data'

export interface BillingData {
  companyName: string
  email: string
  gstNumber: string
  panNumber: string
  premise: string
  street: string
  state: string
  city: string
  country: string
  pinCode: string
}

const initialData: BillingData = {
  companyName: '',
  email: '',
  gstNumber: '',
  panNumber: '',
  premise: '',
  street: '',
  state: '',
  city: '',
  country: 'India',
  pinCode: '',
}

interface BillingFormProps {
  onCancel?: () => void
  onSave?: (data: BillingData) => void
}

const BillingForm = ({ onCancel, onSave }: BillingFormProps) => {
  const [formData, setFormData] = useState<BillingData>(initialData)

  const setField = (field: keyof BillingData) => (value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === 'state') updated.city = ''
      return updated
    })
  }

  const cityOptions = formData.state ? (CITIES_BY_STATE[formData.state] ?? []) : []

  const handleSave = () => {
    if(!formData.companyName || !formData.email || !formData.premise || !formData.street || !formData.state || !formData.city || !formData.country || !formData.pinCode) {
      alert('Please fill in all required fields.')
      return
    }
    onSave?.(formData)
  }

   const handleCancel = () => {
    setFormData(initialData)
    onCancel?.()
  }

  return (
    <div className="billing-form">
      <h1 className="billing-form__title">Review your details</h1>

      <section className="billing-form__section">
        <h2 className="billing-form__section-title">Billing Information</h2>

        <div className="billing-form__grid">
          <FormField
            label="Company Name"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={setField('companyName')}
          />
          <FormField
            label="Email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={setField('email')}
          />
          <FormField
            label="GST Number"
            optional
            placeholder="GST Number"
            value={formData.gstNumber}
            onChange={setField('gstNumber')}
          />
          <FormField
            label="PAN Number"
            optional
            placeholder="PAN Number"
            value={formData.panNumber}
            onChange={setField('panNumber')}
          />
          <FormField
            label="Premise/House no."
            placeholder="Premise/House no."
            value={formData.premise}
            onChange={setField('premise')}
          />
          <FormField
            label="Street"
            placeholder="Street"
            value={formData.street}
            onChange={setField('street')}
          />
          <SelectField
            label="State"
            options={INDIAN_STATES}
            value={formData.state}
            onChange={setField('state')}
            placeholder="Select state"
          />
          <SelectField
            label="City"
            options={cityOptions}
            value={formData.city}
            onChange={setField('city')}
            placeholder="Select city"
          />
          <FormField
            label="Country"
            placeholder="India"
            value={formData.country}
            onChange={setField('country')}
          />
          <FormField
            label="Pin Code"
            placeholder="Pincode"
            value={formData.pinCode}
            onChange={setField('pinCode')}
          />
        </div>
      </section>

      <div className="billing-form__actions">
        <button
          type="button"
          className="billing-form__btn billing-form__btn--cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="billing-form__btn billing-form__btn--save"
          onClick={handleSave}
        >
          Save Details
        </button>
      </div>
    </div>
  )
}

export default BillingForm
