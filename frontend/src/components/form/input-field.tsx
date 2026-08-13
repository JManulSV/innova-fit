import type { HTMLInputTypeAttribute } from "react"
import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Mono } from "../typography"
import { Input } from "../ui/input"
import { TriangleAlertIcon } from "lucide-react"

interface InputFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  label: string
  type?: HTMLInputTypeAttribute
  error?: FieldError
  isDisabled?: boolean
  placeholder?: string
  register: UseFormRegister<TFieldValues>
  className?: string
}

function InputField<TFieldValues extends FieldValues>({
  name,
  label,
  type = "text",
  error,
  isDisabled,
  placeholder,
  register,
  className,
}: InputFieldProps<TFieldValues>) {
  const inputId = String(name)

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={inputId} className="font-mono">
        <Mono>{label}</Mono>
      </label>

      <Input
        type={type}
        id={inputId}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        disabled={isDisabled}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...register(name)}
      />

      {error && (
        <p 
          id={`${inputId}-error`} 
          className="text-destructive text-xs flex items-center gap-2 mt-1"
        >
          <TriangleAlertIcon className="size-4" />
          {error.message}
        </p>
      )}
    </div>
  )
}

export default InputField