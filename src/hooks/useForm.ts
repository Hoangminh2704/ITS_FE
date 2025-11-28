// hooks/useForm.ts - Cập nhật reset function
import { useState } from "react";

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
}

export function useForm<T>({ initialValues, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange =
    (field: keyof T) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await onSubmit(values);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = (newValues?: T) => {
    setValues(newValues || initialValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    reset,
  };
}
