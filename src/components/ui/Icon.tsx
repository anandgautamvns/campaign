import type { SVGProps } from 'react'

export type IconName =
  | 'back-arrow'
  | 'chevron-down'
  | 'chevron-up'
  | 'code'
  | 'comment'
  | 'crown'
  | 'hand'
  | 'menu'
  | 'plus'
  | 'plus-circle'
  | 'search'
  | 'tag'
  | 'user'
  | 'wallet'

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  color?: string
}

type IconDef = {
  viewBox: string
  children: React.ReactNode
}

const iconDefs: Record<IconName, IconDef> = {
  'back-arrow': {
    viewBox: '0 0 20 20',
    children: (
      <path d="M12 16L6 10L12 4" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  'chevron-down': {
    viewBox: '0 0 16 16',
    children: (
      <path d="M4 6L8 10L12 6" stroke="#1977f2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  'chevron-up': {
    viewBox: '0 0 16 16',
    children: (
      <path d="M12 10L8 6L4 10" stroke="#1977f2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  'code': {
    viewBox: '0 0 24 24',
    children: (
      <path d="M8 8L4 12L8 16M16 8L20 12L16 16M14 4L10 20" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  'comment': {
    viewBox: '0 0 24 24',
    children: (
      <path d="M7 8H17M7 12H13M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.74467 19.0511L3 20L4.39499 16.28C3.51156 15.0423 3 13.5743 3 12C3 7.58172 7.02944 4 12 4C16.9706 4 21 7.58172 21 12Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  'crown': {
    viewBox: '0 0 18 18',
    children: (
      <>
        <path d="M2 13L3 6L6.5 9L9 3L11.5 9L15 6L16 13H2Z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M2 13H16V15H2V13Z" fill="#F59E0B" />
        <circle cx="3" cy="6" r="1" fill="#F59E0B" />
        <circle cx="9" cy="3" r="1" fill="#F59E0B" />
        <circle cx="15" cy="6" r="1" fill="#F59E0B" />
      </>
    ),
  },
  'hand': {
    viewBox: '0 0 24 24',
    children: (
      <path d="M8 11V7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7V11M12 11V6C12 4.89543 12.8954 4 14 4C15.1046 4 16 4.89543 16 6V11M16 11V7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7V13C20 16.866 16.866 20 13 20H11C8.23858 20 6 17.7614 6 15V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  'menu': {
    viewBox: '0 0 24 24',
    children: (
      <path d="M4 6H20M4 12H20M4 18H20" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    ),
  },
  'plus': {
    viewBox: '0 0 18 18',
    children: (
      <path d="M9 3V15M3 9H15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    ),
  },
  'plus-circle': {
    viewBox: '0 0 20 20',
    children: (
      <>
        <circle cx="10" cy="10" r="8.5" stroke="#3B82F6" strokeWidth="1.5" />
        <path d="M10 6V14M6 10H14" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  'search': {
    viewBox: '0 0 20 20',
    children: (
      <>
        <circle cx="8.5" cy="8.5" r="6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 13L17 17" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  'tag': {
    viewBox: '0 0 20 20',
    children: (
      <>
        <path d="M9.5 2L2 9.5L10.5 18L18 10.5L9.5 2Z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="11.5" cy="7.5" r="1.2" fill="#6B7280" />
        <path d="M7 12L11 8" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
  },
  'user': {
    viewBox: '0 0 24 24',
    children: (
      <>
        <circle cx="12" cy="9" r="3.5" fill="white" />
        <path d="M5 19C5 15.134 8.134 12 12 12C15.866 12 19 15.134 19 19" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  'wallet': {
    viewBox: '0 0 20 20',
    children: (
      <>
        <rect x="2" y="5" width="16" height="12" rx="2" stroke="#3B82F6" strokeWidth="1.5" />
        <path d="M2 8H18" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="13" y="10.5" width="3" height="3" rx="0.5" fill="#3B82F6" />
        <path d="M4 5L6 3H14L16 5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
}

const Icon = ({ name, size, width, height, className, style, ...props }: IconProps) => {
  const def = iconDefs[name]
  const w = width ?? size
  const h = height ?? size

  return (
    <svg
      viewBox={def.viewBox}
      fill="none"
      width={w}
      height={h}
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      {def.children}
    </svg>
  )
}

export default Icon
