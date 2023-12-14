import { ReactNode } from 'react'
import Section from './Section'
import { cn } from '@/lib/utils'

interface Props {
    children: ReactNode
    condition?: boolean
    title?: string
    className?: string
}

const AsideSection = ({ children, title, condition, className }: Props) => {
    return condition !== undefined && condition ? <Section title={title} className={cn('gap-2.5', className)} pre={<hr className="mt-4 mb-1.5" />}>
        { children }
    </Section> : <></>
}

export default AsideSection
