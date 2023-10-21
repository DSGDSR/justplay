import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
    pre?: ReactNode
    title?: string
    className?: string
    [key: string]: any
}

const Section = ({ children, title, className, pre, ...props }: Props) => (
  <section className={cn("flex flex-col gap-3.5", className)} {...props}>
    { pre ?? <></> }
    { title ? <h3 className="text-base uppercase font-bold text-slate-400">{title}</h3> : <></> }
    { children }
  </section>
)

export default Section