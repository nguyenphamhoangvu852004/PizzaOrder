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
import { useRouter } from "vue-router";
import axios from "@/axios";

const router = useRouter();

const account = ref({
  username: "",
  password: "",
});

const usernameError = ref("");
const passwordError = ref("");

const loginButton = async () => {
  // Reset error messages
  usernameError.value = "";
  passwordError.value = "";

  // Validate inputs
  if (account.value.username === "") {
    usernameError.value = "Username is required";
    return;
  }
  if (account.value.password === "") {
    passwordError.value = "Password is required";
    return;
  }

  try {
    const response = await axios.post("user/log-in", {
      username: account.value.username,
      password: account.value.password,
    });

    console.log(response);

    if (response.data.success) {
      // Login successful
      // alert("Login successful!");
      // You can store user data in localStorage or Vuex store here if needed
      // For example:
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to home page or dashboard
      router.push("/");
    } else {
      // Login failed
      alert(response.data.message || "Login failed. Please try again.");
    }
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    alert("Có lỗi xảy ra khi đăng nhập.");
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
