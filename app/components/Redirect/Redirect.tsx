import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode,
  link: string,
  shallow: boolean,
  propagateEvent?: boolean, 
  parentElementDetails?: boolean,
  className?: string,
}

export const shallowRedirect = (e: React.MouseEvent,link: string, propagate: boolean, parentElementDetails: boolean) => {
  if (parentElementDetails) {
    if((e.currentTarget.parentElement?.parentElement as HTMLDetailsElement).open) {
      e.preventDefault();
    }
  } else if (!propagate) {
    e.preventDefault();
  }
  window.history.pushState(null, '', `${link}`)
}

const Redirect = ({ children, link, shallow, propagateEvent=false, parentElementDetails=false, className }: Props) => {
  if (shallow) {
    return (<div onClick={(e) => shallowRedirect(e, link, propagateEvent, parentElementDetails)} className={className}>{children}</div>);
  }
  return (
    <Link prefetch={false} href={link} className={className}>
      {children}
    </Link>
  )
}

export default Redirect