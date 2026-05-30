import Navbar from '../../components/Navbar/Navbar'
import BillingForm, { type BillingData } from '../../components/BillingForm/BillingForm'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import Icon from '../../components/ui/Icon'
import './CheckoutPage.css'

const CheckoutPage = () => {

  const onSave = (data: BillingData) => {
    alert('Billing details saved successfully!')
    console.log('Saved billing data:', data)
  }

  const onCancel = () => {
    alert('Billing details cancelled.')
  }

  return (
    <div className="checkout-page">
      <Navbar />

      <main className="checkout-page__main">
        <div className="checkout-page__container">
          <a href="#" className="checkout-page__back-link">
            <Icon name="back-arrow" size={16} />
            Back to plans
          </a>

          <div className="checkout-page__layout">
            <BillingForm onSave={onSave} onCancel={onCancel} />
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  )
}

export default CheckoutPage
