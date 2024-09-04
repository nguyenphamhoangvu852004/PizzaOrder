<template>
  <div class="form-login-container">
    <div class="form-login">
      <section>
        <div>
          <h3>LOGIN FORM</h3>
          <img src="/images/My_Logo.jpg" alt="" />
        </div>

        <b-field>
          <b-input
            type="text"
            v-model="account.username"
            placeholder="Enter Username"
            :class="{ 'is-danger': usernameError }"
          ></b-input>
          <span v-if="usernameError" class="error">{{ usernameError }}</span>
        </b-field>

        <b-field>
          <b-input
            type="password"
            v-model="account.password"
            placeholder="Enter Password"
            password-reveal
            :class="{ 'is-danger': passwordError }"
          ></b-input>
          <span v-if="passwordError" class="error">{{ passwordError }}</span>
        </b-field>

        <b-button @click="loginButton">Log In</b-button>

        <div v-if="generalError" class="error">{{ generalError }}</div>

        <div style="display: flex; text-align: center; margin-top: 10px">
          <p>Not Have An Account Yet?</p>
          <a href="/form-signup"> Sign Up</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios";

const account = ref({
  username: "",
  password: "",
});

const usernameError = ref(null);
const passwordError = ref(null);
const generalError = ref(null);

const checkLoginStatus = () => {
  const userData = localStorage.getItem("userToken");
  if (userData) {
    window.location.href = "/user";
  }
};

const loginButton = async () => {
  usernameError.value = null;
  passwordError.value = null;
  generalError.value = null;

  try {
    const response = await axios.post("user/log-in", {
      username: account.value.username,
      password: account.value.password,
    });

    if (!response.data.success) {
      // Xử lý các trường hợp khác nếu cần
      generalError.value =
        response.data.message || "Đăng nhập không thành công.";
    } else {
      localStorage.setItem("userToken", response.data.token);

      localStorage.setItem("userID", response.data.user.id);
      window.location.href = "/";

    }
  } catch (err) {
    if (err.response) {
      const { data } = err.response;
      if (data.field === "username") {
        usernameError.value = data.message;
      } else if (data.field === "password") {
        passwordError.value = data.message;
      } else {
        generalError.value = data.message || "Lỗi không xác định.";
      }
    } else {
      generalError.value = "Không thể kết nối đến máy chủ. Vui lòng thử lại.";
    }
  }
};

checkLoginStatus();
</script>

<style src="../styles/components/form-login-signup.css" scoped></style>
