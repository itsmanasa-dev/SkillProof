import type { ReactElement, ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Base({
  children,
  ...props
}: IconProps & { children: ReactNode }): ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export type IconName =
  | 'home'
  | 'skills'
  | 'assessment'
  | 'evidence'
  | 'graph'
  | 'passport'
  | 'settings'
  | 'search'
  | 'bell'
  | 'check'
  | 'chevron-right'
  | 'arrow-right'
  | 'play'
  | 'timer'
  | 'code'
  | 'sparkles'
  | 'github'
  | 'briefcase'
  | 'users'
  | 'download'
  | 'share'
  | 'star'
  | 'alert'
  | 'refresh'
  | 'external'
  | 'menu'
  | 'close'
  | 'x'
  | 'trend'
  | 'layers'

export function Icon({
  name,
  ...props
}: IconProps & { name: IconName }): ReactElement {
  switch (name) {
    case 'home':
      return (
        <Base {...props}>
          <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z" />
        </Base>
      )
    case 'skills':
      return (
        <Base {...props}>
          <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9Z" />
          <path d="M12 11 4 6.5M12 11l8-4.5M12 11v9" />
        </Base>
      )
    case 'assessment':
      return (
        <Base {...props}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </Base>
      )
    case 'evidence':
      return (
        <Base {...props}>
          <path d="M12 2.5 19 5v6c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V5Z" />
          <path d="m8.8 12 2.2 2.2 4.2-4.4" />
        </Base>
      )
    case 'graph':
      return (
        <Base {...props}>
          <circle cx="5" cy="6" r="2.5" />
          <circle cx="19" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M7 7.2 10.5 15.5M17 7.2 13.5 15.5M7.4 6h9.2" />
        </Base>
      )
    case 'passport':
      return (
        <Base {...props}>
          <rect x="5" y="3" width="14" height="18" rx="2.5" />
          <circle cx="12" cy="10" r="2.5" />
          <path d="M8.5 16.5c.8-1.2 2-1.8 3.5-1.8s2.7.6 3.5 1.8" />
        </Base>
      )
    case 'settings':
      return (
        <Base {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.07a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h.07a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.07a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
        </Base>
      )
    case 'search':
      return (
        <Base {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </Base>
      )
    case 'bell':
      return (
        <Base {...props}>
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </Base>
      )
    case 'check':
      return (
        <Base {...props}>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </Base>
      )
    case 'chevron-right':
      return (
        <Base {...props}>
          <path d="m9 5 7 7-7 7" />
        </Base>
      )
    case 'arrow-right':
      return (
        <Base {...props}>
          <path d="M4 12h16m0 0-6-6m6 6-6 6" />
        </Base>
      )
    case 'play':
      return (
        <Base {...props}>
          <path d="M6 4.5v15l13-7.5Z" />
        </Base>
      )
    case 'timer':
      return (
        <Base {...props}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2.5M9 2h6" />
        </Base>
      )
    case 'code':
      return (
        <Base {...props}>
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13 4l-2 16" />
        </Base>
      )
    case 'sparkles':
      return (
        <Base {...props}>
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" />
        </Base>
      )
    case 'github':
      return (
        <Base {...props}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.5 2-4.5 0-6-1" />
        </Base>
      )
    case 'briefcase':
      return (
        <Base {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
        </Base>
      )
    case 'users':
      return (
        <Base {...props}>
          <path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20M10.5 9.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 4.2a3.5 3.5 0 0 1 0 6.6M22 20v-1.5a4 4 0 0 0-3-3.9" />
        </Base>
      )
    case 'download':
      return (
        <Base {...props}>
          <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
        </Base>
      )
    case 'share':
      return (
        <Base {...props}>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path d="m8.2 10.8 7.6-4.6m-7.6 7 7.6 4.6" />
        </Base>
      )
    case 'star':
      return (
        <Base {...props}>
          <path d="m12 3 2.7 5.6 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 2.8 1.2-6.1L3 9.4l6.3-.8Z" />
        </Base>
      )
    case 'alert':
      return (
        <Base {...props}>
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v4m0 3.5v.1" />
        </Base>
      )
    case 'refresh':
      return (
        <Base {...props}>
          <path d="M21 12a9 9 0 1 1-2.6-6.3M21 3v5h-5" />
        </Base>
      )
    case 'external':
      return (
        <Base {...props}>
          <path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
        </Base>
      )
    case 'menu':
      return (
        <Base {...props}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </Base>
      )
    case 'close':
      return (
        <Base {...props}>
          <path d="M6 6l12 12M18 6 6 18" />
        </Base>
      )
    case 'trend':
      return (
        <Base {...props}>
          <path d="m3 17 6-6 4 4 8-8M14 7h7v7" />
        </Base>
      )
    case 'layers':
      return (
        <Base {...props}>
          <path d="m12 2 9 5-9 5-9-5Z" />
          <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
        </Base>
      )
    case 'x':
      return (
        <Base {...props}>
          <path d="M6 6l12 12M18 6 6 18" />
        </Base>
      )
    default:
      return <Base {...props}><circle cx="12" cy="12" r="9" /></Base>
  }
}