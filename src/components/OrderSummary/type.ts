
export type CouponCode = 'WELCOME20' | 'ANNUAL50'

export interface Coupon {
  code: CouponCode
  label: string
}

export type PLAN_TYPE =
    | 'MONTHLY'
    | 'ANNUAL'
    | 'LIFETIME'
    | 'HALF_YEARLY'
    | 'QUARTERLY';