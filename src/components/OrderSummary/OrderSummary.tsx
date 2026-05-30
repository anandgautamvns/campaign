import { useState } from 'react'
import './OrderSummary.css'
import type { CouponCode } from './type'
import { COUPONS, planData, SUBTOTAL, TAX, total } from './constant'
import Icon from '../ui/Icon'

const TagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
    <path
      d="M1.5 1.5H7.5L13.5 7.5L7.5 13.5L1.5 7.5V1.5Z"
      stroke="#374151"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="4.5" cy="4.5" r="1" fill="#374151" />
  </svg>
)

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M13.5 2.5C12.1 1 10.2 0 8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C11.7 16 14.8 13.6 15.7 10.3"
      stroke="#374151"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M16 0L13.5 2.5L11 0"
      stroke="#374151"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ── Component ── */
const OrderSummary = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<CouponCode | null>('WELCOME20')
  const [couponInput, setCouponInput] = useState('')
  const [walletApplied, setWalletApplied] = useState(false)
  const [couponOpen, setCouponOpen] = useState(true)

  const applyInputCoupon = () => {
    const match = COUPONS.find(
      (c) => c.code === couponInput.toUpperCase().trim()
    )
    if (match) {
      setSelectedCoupon(match.code)
      setCouponInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applyInputCoupon()
  }

  const handleProceed = () => {
    alert('Proceeding to payment with the following details:\n' +
      `Selected Plan: ${planData.planType}\n` +
      `Wallet Applied: ${walletApplied ? 'Yes' : 'No'}\n` +
      `Selected Coupon: ${selectedCoupon || 'None'}\n` +
      `Total Amount: ₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
    )
  }

  return (
    <aside className="order-summary">
      <h2 className="order-summary__title">Order Summary</h2>

      {/* Plan card */}
      <div className="order-summary__plan-card">
        <div className="order-summary__plan-price-row">
          <div className="order-summary__plan-price">
            <span className="order-summary__currency">{planData && planData.currency}</span>
            <span className="order-summary__amount">{planData && planData.price.toLocaleString('en-IN', { minimumFractionDigits: 0 })}</span>
            <span className="order-summary__period">/{planData && planData.period}</span>
          </div>
          <div className="order-summary__plan-badge">
            <span className="order-summary__plan-tag">SELECTED PLAN</span>
            <span className="order-summary__plan-name">{planData && planData.planType}</span>
          </div>
        </div>
        <p className="order-summary__plan-credits">Includes {planData && planData.credits}</p>
      </div>

      {/* Upgrade button */}
      <button type="button" className="order-summary__upgrade-btn" onClick={() => alert('Upgrade flow')} >
        <RefreshIcon />
        Upgrade to Growth Plan
      </button>

      <div className="order-summary__divider" />

      {/* Wallet balance */}
      <div className="order-summary__wallet">
        <div className="order-summary__wallet-info">
          <Icon name='wallet' size={20}/>
          <div>
            <p className="order-summary__wallet-label">Wallet Balance</p>
            <p className="order-summary__wallet-amount">{planData && planData.currency}{planData && planData.wallet_balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })} available</p>
          </div>
        </div>
        <button
          type="button"
          className={`order-summary__apply-btn${walletApplied ? ' order-summary__apply-btn--active' : ''}`}
          onClick={() => setWalletApplied((v) => !v)}
        >
          {walletApplied ? 'Remove' : 'Apply'}
        </button>
      </div>

      <div className="order-summary__divider" />

      {/* Coupon section */}
      <div className="order-summary__coupon-section">
        <button
          type="button"
          className="order-summary__coupon-header"
          onClick={() => setCouponOpen((v) => !v)}
        >
          <span className="order-summary__coupon-header-left">
            <TagIcon />
            Apply Coupon
          </span>
          {couponOpen ? <Icon name='chevron-up' size={16} color='#1977f2' /> : <Icon name='chevron-down' size={16} color='#1977f2' />}
        </button>

        {couponOpen && (
          <div className="order-summary__coupon-body">
            <div className="order-summary__coupon-input-row">
              <input
                type="text"
                className="order-summary__coupon-input"
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="order-summary__coupon-apply-btn"
                onClick={applyInputCoupon}
              >
                Apply
              </button>
            </div>

            <div className="order-summary__coupon-list">
              {COUPONS.map((coupon) => {
                const isSelected = selectedCoupon === coupon.code
                return (
                  <button
                    key={coupon.code}
                    type="button"
                    className={`order-summary__coupon-item${isSelected ? ' order-summary__coupon-item--selected' : ''}`}
                    onClick={() =>
                      setSelectedCoupon(isSelected ? null : coupon.code)
                    }
                  >
                    <div className="order-summary__coupon-item-info">
                      <span className="order-summary__coupon-code">
                        {coupon.code}
                      </span>
                      <span className="order-summary__coupon-desc">
                        {coupon.label}
                      </span>
                    </div>
                    <span
                      className={`order-summary__radio${isSelected ? ' order-summary__radio--selected' : ''}`}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <span className="order-summary__radio-dot" />
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="order-summary__divider" />

      {/* Pricing breakdown */}
      <div className="order-summary__pricing">
        <div className="order-summary__pricing-row">
          <span className="order-summary__pricing-label">Subtotal</span>
          <span className="order-summary__pricing-value">
            ₹{SUBTOTAL.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="order-summary__pricing-row">
          <span className="order-summary__pricing-label">Tax (18% GST)</span>
          <span className="order-summary__pricing-value">
            ₹{TAX.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="order-summary__total-row">
        <span className="order-summary__total-label">Total due today</span>
        <span className="order-summary__total-value">
          {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Proceed button */}
      <button type="button" className="order-summary__proceed-btn" onClick={handleProceed}>
        Proceed to Payment
      </button>
    </aside>
  )
}

export default OrderSummary
