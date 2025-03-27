import { reactive, computed } from "vue";

// Определяем типы для правил валидации и полей формы
interface ValidationRule {
  (value: any): string | true;
}

interface FormField {
  value: any;
  error: string | null;
}

interface FormSchema {
  [key: string]: ValidationRule[];
}

export function useFormValidation(
  initialValues: Record<string, any>,
  schema: FormSchema
) {
  // Создаём реактивное состояние для полей формы
  const form = reactive<Record<string, FormField>>(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = { value: initialValues[key], error: null };
      return acc;
    }, {} as Record<string, FormField>)
  );

  // Функция для валидации одного поля
  const validateField = (key: string) => {
    const rules = schema[key] || [];
    for (const rule of rules) {
      const result = rule(form[key].value);
      if (result !== true) {
        form[key].error = result;
        return false;
      }
    }
    form[key].error = null;
    return true;
  };

  // Функция для валидации всей формы
  const validateForm = () => {
    let isValid = true;
    for (const key of Object.keys(form)) {
      if (!validateField(key)) {
        isValid = false;
      }
    }
    return isValid;
  };

  // Реактивное состояние валидности всей формы
  const isFormValid = computed(() => {
    return Object.values(form).every((field) => field.error === null);
  });

  return {
    form,
    validateField,
    validateForm,
    isFormValid,
  };
}
