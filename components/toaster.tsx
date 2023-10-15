"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/toast"
import { useToast } from "@/hooks/use-toast"

const showAt = {
  "top-left": "sm:top-0 sm:left-0",
  "top-center": "sm:top-0 sm:right-0 sm:left-0 sm:mx-auto",
  "top-right": "sm:top-0 sm:right-0",
  "bottom-left": "sm:bottom-0 sm:left-0",
  "bottom-right": "sm:bottom-0 sm:right-0"
}

const slideBy = {
  "top-left": "data-[state=open]:sm:slide-in-from-top-full data-[state=closed]:slide-out-to-left-full",
  "top-center": "data-[state=open]:sm:slide-in-from-top-full data-[state=closed]:slide-out-to-top-full",
  "top-right": "data-[state=open]:sm:slide-in-from-top-full data-[state=closed]:slide-out-to-right-full",
  "bottom-left": "data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-left-full",
  "bottom-right": "data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full"
}

type Props = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export function Toaster({ position, ...props }: Props) {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className={position ? slideBy[position] : slideBy["top-center"]}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className={position ? showAt[position] : showAt["top-center"]} />
    </ToastProvider>
  )
}