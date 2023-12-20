import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ReactNode } from 'react'
import Skeleton from './Skeleton'

interface Props {
    children: ReactNode
    pre?: ReactNode
    title?: ReactNode
    className?: string
    linkText?: string | number
    linkUrl?: string
    [key: string]: any
}

const Section = ({ children, title, className, pre, linkText, linkUrl, ...props }: Props) => (
  <section className={cn('flex flex-col gap-3.5', className)} {...props}>
    { pre ?? <></> }
    { title ? <hgroup className='flex justify-between items-center'>
      <h3 className="text-base lg:text-lg uppercase font-bold text-slate-400">
        { linkUrl ? <Link href={linkUrl}>{title}</Link> : title }
      </h3>
      { (linkUrl && linkText) ? <Link href={linkUrl} className='text-xs lg:text-sm uppercase text-slate-400 hover:text-primary'>{linkText}</Link> : <></> }
    </hgroup> : <></> }
    { children }
  </section>
)

export const SectionSkeleton = ({height = 80}) => <Section
  title={<Skeleton className="h-7 w-28" />}
  pre={<></>}
>
  <Skeleton style={{height}} className="w-full" />
</Section>

export default Section