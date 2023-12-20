import { ReactNode } from 'react'
import Section from './Section'
import { cn } from '@/lib/utils'
import Skeleton from './Skeleton'

interface Props {
    children: ReactNode
    condition?: boolean
    title?: string
    link?: string
    linkText?: string | number
    className?: string
    pre?: ReactNode
}

const AsideSection = ({ children, title, condition, className, pre, link, linkText }: Props) => {
    return condition === undefined || condition ? <Section
        title={title}
        className={cn('gap-3', className)}
        pre={ pre ? pre : <hr className="mt-4 mb-1.5" />}
        linkUrl={link}
        linkText={linkText}
    >
        { children }
    </Section> : <></>
}

export const AsideSectionSkeleton = () => <Section
    title={<Skeleton className="h-5 my-1 w-28" />}
    className="gap-2"
    pre={<hr className="mt-4 mb-1.5" />}
>
    <Skeleton className="h-4 my-1 w-52" />
</Section>

export default AsideSection
