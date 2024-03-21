import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode,
  link: string,
  shallow: boolean,
  className?: string,
}

const shallowRedirect = (e: React.MouseEvent,link: string) => {
  e.preventDefault()
  window.history.pushState(null, '', `${link}`)
}

const Redirect = ({ children, link, shallow, className }: Props) => {
  if (shallow) {
    return (<div onClick={(e) => shallowRedirect(e, link)} className={className}>{children}</div>);
  }
  return (
    <Link href={link} className={className}>
      {children}
    </Link>
  )
}

export default Redirect