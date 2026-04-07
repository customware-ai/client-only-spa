"use client"

import * as React from "react"
import { Slot as SlotPrimitive } from "radix-ui"
import {
  Controller,
  FormProvider,
  type FormProviderProps,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "~/lib/utils"
import { Label } from "~/components/ui/Label"

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)
const FormItemContext = React.createContext<{ id: string }>({ id: "" })

function Form<TFieldValues extends FieldValues>({
  ...props
}: FormProviderProps<TFieldValues>): React.ReactElement {
  return <FormProvider {...props} />
}

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>): React.ReactElement {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField(): {
  id: string
  name: string
  formItemId: string
  formDescriptionId: string
  formMessageId: string
  error?: { message?: string }
} {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })

  const fieldState = getFieldState(fieldContext.name, formState)
  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: fieldState.error,
  }
}

function FormItem({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof SlotPrimitive.Slot>,
  React.ComponentPropsWithoutRef<typeof SlotPrimitive.Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <SlotPrimitive.Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

function FormDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  const { formDescriptionId } = useFormField()

  return <p id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">): React.ReactElement | null {
  const { error, formMessageId } = useFormField()
  const body = error?.message ?? children

  if (!body) {
    return null
  }

  return <p id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>{body}</p>
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
}
