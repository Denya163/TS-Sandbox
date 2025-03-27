import { ref } from "vue";

interface ApiRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export function useApiRequest<T>(url: string, options: ApiRequestOptions = {}) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref<boolean>(false);
  const isSuccess = ref<boolean>(false);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    isSuccess.value = false;

    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers: options.headers || {},
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      data.value = await response.json();
      isSuccess.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Unknown error";
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, isSuccess, fetchData };
}
