import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode,
  link: string,
  external?: boolean,
  shallow?: boolean,
  className?: string,
}

const openNewTab = (link: string) => {
  window.open(encodeURI(`${link}`));
}

export const shallowRedirect = (link: string) => {
  window.history.pushState(null, '', `${link}`)
}

const Redirect = ({ children, link, external=false, shallow=false, className }: Props) => {
  if(external) {
    return (<div onClick={() => openNewTab(link)} className={className}>{children}</div>);
  }
  if(shallow) {
    return (<div onClick={() => shallowRedirect(link)} className={className}>{children}</div>);
  }
  return (
    <Link prefetch={false} href={link} className={className}>
      {children}
    </Link>
  )
}

export default Redirect