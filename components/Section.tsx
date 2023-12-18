import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    pre?: ReactNode
    title?: string
    className?: string
    linkText?: string
    linkUrl?: string
    [key: string]: any
}

const Section = ({ children, title, className, pre, linkText = 'Show all', linkUrl, ...props }: Props) => (
  <section className={cn('flex flex-col gap-3.5', className)} {...props}>
    { pre ?? <></> }
    { title ? <hgroup className='flex justify-between items-end'>
      <h3 className="text-base lg:text-lg uppercase font-bold text-slate-400">
        { linkUrl ? <Link href={linkUrl}>{title}</Link> : title }
      </h3>
      { linkUrl ? <Link href={linkUrl} className='text-xs lg:text-sm uppercase text-slate-400 hover:text-primary'>{linkText}</Link> : <></> }
    </hgroup> : <></> }
    { children }
  </section>
)

export default Section