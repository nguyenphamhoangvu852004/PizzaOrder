<template>
  <div class="form-login-container">
    <div class="form-login">
      <section>
        <div>
          <h3>LOGIN FORM</h3>
          <img src="/images/My_Logo.jpg" alt="" />
        </div>
        <p v-if="usernameError" class="error">{{ usernameError }}</p>
        <b-field>
          <b-input
            type="text"
            v-model="account.username"
            placeholder="Enter Username"
            :class="{ 'is-danger': usernameError }"
          ></b-input>
        </b-field>
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
        <b-field>
          <b-input
            type="password"
            v-model="account.password"
            placeholder="Enter Password"
            password-reveal
            :class="{ 'is-danger': passwordError }"
          ></b-input>
        </b-field>

        <b-button @click="loginButton">Log In</b-button>
        
        <div style="display: flex; text-align: center">
          <p>Not Have An Account Yet?</p>
          <a href="/form-signup"> Sign Up</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // Import useRouter từ vue-router

const ds_account = ref([
  { id: "aaa", username: "admin", password: "admin" },
  { id: 1, username: "account1", password: "password1" },
  { id: 2, username: "account2", password: "password2" },
  { id: 3, username: "account3", password: "password3" },
]);

const account = ref({
  username: "",
  password: "",
});

const usernameError = ref("");
const passwordError = ref("");

const router = useRouter(); // Khởi tạo router

const validateForm = () => {
  usernameError.value = "";
  passwordError.value = "";

  if (!account.value.username) {
    usernameError.value = "Username is required.";
  }
  if (!account.value.password) {
    passwordError.value = "Password is required.";
  }

  return !usernameError.value && !passwordError.value;
};

const loginButton = () => {
  if (validateForm()) {
    // Kiểm tra tài khoản có trong danh sách không
    const user = ds_account.value.find(
      (user) =>
        user.username === account.value.username &&
        user.password === account.value.password
    );

    if (user) {
      console.log("Login successful.");
      // Chuyển hướng về trang chủ
      router.push("/");
    } else {
      console.log("Invalid username or password.");
      usernameError.value = "Invalid username or password.";
    }
  }
};
</script>

<style>
.form-login-container h3 {
  font-size: 30px;
  font-weight: 700;
}
.form-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-login {
  border: 2px solid black;
  border-radius: 5px;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.is-danger {
  border-color: red;
}
</style>
