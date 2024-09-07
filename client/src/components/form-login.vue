<template>
  <div class="form-login-container">
    <div class="form-login">
      <section>
        <div>
          <h3>LOGIN FORM</h3>
          <img src="/images/My_Logo.jpg" alt="Logo" />
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
        <div><GoogleLogin :callback="callback" prompt auto-login /></div>

        <div style="display: flex; text-align: center; margin-top: 10px">
          <p>Not Have An Account Yet?</p>
          <a href="/form-signup"> Sign Up</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/axios";
import { decodeCredential } from "vue3-google-login";

const user = ref(null);
const isLoggedIn = ref(false);
const account = ref({
  username: "",
  password: "",
});
const googleAccount = ref({
  name: "",
  email: "",
});

const usernameError = ref(null);
const passwordError = ref(null);
const generalError = ref(null);

const checkLoginStatus = () => {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    // Lấy thông tin người dùng từ token hoặc API
    isLoggedIn.value = true;
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

const callback = async (response) => {
  const googleToken = response.credential;

  if (!googleToken) {
    console.error("Không có token Google.");
    return;
  }
  // const fullUserInformation = decodeCredential(response.credential); //Xem thông tin của tài khoản
  // console.log(fullUserInformation);
  console.log("Token:", googleToken); //Token ma google da ma hoa

  const headers = {
    Authorization: `Bearer ${googleToken}`,
  };

  try {
    const serverResponse = await axios.post(
      "/user/authGoogle/log-in", // Đảm bảo URL là chính xác
      {},
      { headers }
    );

    if (serverResponse.data && serverResponse.data.success) {
      localStorage.setItem("userToken", serverResponse.data.token);
      localStorage.setItem("userID", serverResponse.data.user.id);
      window.location.href = "/";
    } else {
      const errorMessage =
        serverResponse.data.message || "Đăng nhập không thành công.";
      console.error(errorMessage);
      generalError.value = errorMessage;
    }
  } catch (error) {
    console.error("Lỗi khi đăng nhập bằng Google:", error);
    generalError.value =
      "Đăng nhập bằng Google không thành công. Vui lòng thử lại.";
  }
};

onMounted(checkLoginStatus);
</script>

<style src="../styles/components/form-login-signup.css" scoped></style>
