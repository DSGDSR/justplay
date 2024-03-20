import { cn } from "@wheretoplay/shared/utils";
import { Fragment } from "react";

interface KbdProps {
    keys: any[];
    className?: string
}

export const Kbd = ({ keys, className }: KbdProps) => {
    return <div className={cn('text-xs flex gap-1 items-center text-muted-foreground', className)}>
        {keys.map((key, index) => {
            return <Fragment key={index}><KbdKey>{key}</KbdKey>{index !== keys.length - 1 ? '+' : null}</Fragment>
        })}
    </div>
}

const KbdKey = ({ children }: any) => <kbd className={`pointer-events-none h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono font-medium opacity-100 flex`}>
    {children}
</kbd>