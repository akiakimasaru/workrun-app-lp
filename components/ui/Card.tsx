import { ReactNode } from 'react'
import Link from 'next/link'

interface CardProps {
  children: ReactNode
  href?: string
  className?: string
}

export default function Card({ children, href, className = '' }: CardProps) {
  const baseClasses =
    'bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow'

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${className} block`}>
        {children}
      </Link>
    )
  }

  return <div className={`${baseClasses} ${className}`}>{children}</div>
}
