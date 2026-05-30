
import type { Coupon } from "./type";

export const COUPONS: Coupon[] = [
    { code: 'WELCOME20', label: '20% off on your first month' },
    { code: 'ANNUAL50', label: '50% off on annual plans' },
]

export const SUBTOTAL = 14999
export const TAX = 1079.64
export const total = SUBTOTAL + TAX

export const planData = {
    price: 4999,
    currency: '₹',
    period: 'monthly',
    credits: '5,000 credits/mo.',
    planType: 'Startup',
    wallet_balance: 500
}