import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode,
  link: string,
  external?: boolean,
  shallow?: boolean,
  propagateEvent?: boolean, 
  parentElementDetails?: boolean,
  className?: string,
}

const openNewTab = (e: React.MouseEvent, link: string) => {
  console.log(link)
  window.open(encodeURI(`${link}`));
}

export const shallowRedirect = (e: React.MouseEvent, link: string, propagate: boolean, parentElementDetails: boolean) => {
  if (parentElementDetails) {
    if((e.currentTarget.parentElement?.parentElement as HTMLDetailsElement).open) {
      e.preventDefault();
    }
  } else if (!propagate) {
    e.preventDefault();
  }
  window.history.pushState(null, '', `${link}`)
}

const Redirect = ({ children, link, external=false, shallow=false, propagateEvent=false, parentElementDetails=false, className }: Props) => {
  if(external) {
    return (<div onClick={(e) => openNewTab(e, link)} className={className}>{children}</div>);
  }
  if(shallow) {
    return (<div onClick={(e) => shallowRedirect(e, link, propagateEvent, parentElementDetails)} className={className}>{children}</div>);
  }
  return (
    <Link prefetch={false} href={link} className={className}>
      {children}
    </Link>
  )
}

export default Redirect