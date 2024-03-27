import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode,
  link: string,
  shallow: boolean,
  propagateEvent?: boolean, 
  className?: string,
}

export const shallowRedirect = (e: React.MouseEvent,link: string, propagate: boolean) => {
  if (!propagate) {
    e.preventDefault()
  }
  window.history.pushState(null, '', `${link}`)
}

const Redirect = ({ children, link, shallow, propagateEvent=false, className }: Props) => {
  if (shallow) {
    return (<div onClick={(e) => shallowRedirect(e, link, propagateEvent)} className={className}>{children}</div>);
  }
  return (
    <Link prefetch={false} href={link} className={className}>
      {children}
    </Link>
  )
}

export default Redirect