import { ReactNode } from 'react'
import Section from './Section'
import { cn } from '@/lib/utils'

interface Props {
    children: ReactNode
    condition?: boolean
    title?: string
    className?: string
    pre?: ReactNode
}

const AsideSection = ({ children, title, condition, className, pre }: Props) => {
    return condition === undefined || condition ? <Section title={title} className={cn('gap-2.5', className)} pre={ pre ? pre : <hr className="mt-4 mb-1.5" />}>
        { children }
    </Section> : <></>
}

export default AsideSection
