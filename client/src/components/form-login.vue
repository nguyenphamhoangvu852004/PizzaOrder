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

        <b-button :disabled="loading" @click="loginButton">Log In</b-button>

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
const loading = ref(false);

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
  loading.value = true;

  try {
    const response = await axios.post(
      "https://pizzaorder-2rtb.onrender.com/api/v1/user/log-in",
      {
        username: account.value.username,
        password: account.value.password,
      }
    );

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
  } finally {
    loading.value = false;
  }
};

checkLoginStatus();
</script>

<style scoped>
/* Định dạng chung cho cả hai trang */
body {
  font-family: "Poppins", sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.form-signup-container,
.form-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-signup,
.form-login {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.form-signup h3,
.form-login h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-signup img,
.form-login img {
  display: block;
  margin: 0 auto 20px;
  width: 100px;
  height: auto;
}

b-field {
  margin-bottom: 15px;
}

b-input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
}

b-input.is-danger {
  border-color: #ff5252;
}

b-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

b-button:hover {
  opacity: 0.9;
}

b-button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.error {
  color: #ff5252;
  font-size: 0.9em;
}

.form-signup .terms {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.form-signup input[type="checkbox"] {
  margin-right: 10px;
}

.form-signup p {
  font-size: 0.9em;
}

.form-signup a {
  color: #2196f3;
  text-decoration: none;
}

.form-signup a:hover {
  text-decoration: underline;
}

.form-login .error {
  margin-top: 10px;
}

.form-login a {
  color: #2196f3;
  text-decoration: none;
}

.form-login a:hover {
  text-decoration: underline;
}

.form-signup .form-signup-footer,
.form-login .form-login-footer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 0.9em;
}

.form-signup .form-signup-footer a,
.form-login .form-login-footer a {
  color: #2196f3;
  text-decoration: none;
}

.form-signup .form-signup-footer a:hover,
.form-login .form-login-footer a:hover {
  text-decoration: underline;
}
</style>
