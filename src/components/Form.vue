<script setup lang="ts">
import { useFormValidation } from "../composables/useFormValidation";

const schema = {
  username: [
    (value: any) =>
      value.length >= 3 || "Имя должно содержать минимум 3 символа",
  ],
  email: [(value: any) => /\S+@\S+\.\S+/.test(value) || "Некорректный email"],
  age: [
    (value: any) => !isNaN(value) || "Должно быть числом",
    (value: any) => value >= 18 || "Возраст должен быть 18+",
  ],
};

const { form, validateField, validateForm, isFormValid } = useFormValidation(
  { username: "", email: "", age: "" },
  schema
);

const submitForm = () => {
  if (validateForm()) {
    alert("Форма успешно отправлена!");
  }
};
</script>

<template>
  <div class="container">
    <h2>Форма регистрации</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Имя</label>
        <input
          id="username"
          v-model="form.username.value"
          @blur="validateField('username')"
          type="text"
        />
        <p v-if="form.username.error" class="error">
          {{ form.username.error }}
        </p>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email.value"
          @blur="validateField('email')"
          type="email"
        />
        <p v-if="form.email.error" class="error">{{ form.email.error }}</p>
      </div>

      <div class="form-group">
        <label for="age">Возраст</label>
        <input
          id="age"
          v-model="form.age.value"
          @blur="validateField('age')"
          type="number"
        />
        <p v-if="form.age.error" class="error">{{ form.age.error }}</p>
      </div>

      <button type="submit" :disabled="!isFormValid">Отправить</button>
    </form>

    <div class="result">
      <h3>Введённые данные:</h3>
      <p><strong>Имя:</strong> {{ form.username.value }}</p>
      <p><strong>Email:</strong> {{ form.email.value }}</p>
      <p><strong>Возраст:</strong> {{ form.age.value }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.result {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
