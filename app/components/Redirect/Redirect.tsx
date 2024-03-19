import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode,
  link: string,
  shallow: boolean,
  className?: string,
}

const shallowRedirect = (link: string) => {
  window.history.pushState(null, '', `${link}`)
}

const Redirect = ({ children, link, shallow, className }: Props) => {
  if (shallow) {
    return (<div onClick={() => shallowRedirect(link)} className={className}>{children}</div>);
  }
  return (
    <Link href={link} className={className}>
      {children}
    </Link>
  )
}

export default Redirect