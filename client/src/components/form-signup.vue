<template>
  <div class="form-signup-container">
    <div class="form-signup">
      <section>
        <div>
          <h3>SIGNUP FORM</h3>
          <img src="/images/My_Logo.jpg" alt="" />
        </div>
        <b-field>
          <b-input
            v-model="Account.username"
            type="text"
            placeholder="Username"
          >
          </b-input>
        </b-field>
        <b-field>
          <b-input
            v-model="Account.phone"
            type="text"
            placeholder="Phonenumber"
          >
          </b-input>
        </b-field>
        <b-field>
          <b-input v-model="Account.email" type="text" placeholder="Email">
          </b-input>
        </b-field>
        <b-field>
          <b-input
            v-model="Account.password"
            type="password"
            placeholder="Password"
            password-reveal
          >
          </b-input>
        </b-field>
        <b-field>
          <b-input
            v-model="Account.passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            password-reveal
          >
          </b-input>
        </b-field>

        <div>
          <input v-model="isAgreed" type="checkbox" />
          <p>
            I have read and agree to
            <a
              href="https://vietnamnet.vn/toi-dong-y-voi-dieu-khoan-va-dieu-kien-su-doi-tra-lon-nhat-cua-cong-nghe-i36033.html"
              >the Terms</a
            >
          </p>
        </div>
        <b-button @click="signupButton">Sign Up</b-button>

        <p>Go to <a href="/form-login">login page</a></p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/axios"; // Đảm bảo import axios
import { isValidate } from "@/services/validationForm";

const isAgreed = ref(false);
const Account = ref({
  username: "",
  phone: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const sendDataToServer = async (data) => {
  try {
    const response = await axios.post("user/sign-up", {
      username: data.username,
      phone: data.phone,
      email: data.email,
      password: data.password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(
      "Lỗi khi đăng ký:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const signupButton = async () => {
  if (!isAgreed.value) {
    alert("Vui lòng đồng ý với điều khoản và điều kiện");
    return;
  }
  if (isValidate(Account.value)) {
    try {
      const result = await sendDataToServer(Account.value);
      console.log(result);
      alert(`Bạn đã đăng ký thành công, vui lòng đăng nhập`);
      window.location.href = "/form-login";
    } catch (error) {
      console.log("Đăng ký thất bại:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  }
};
</script>

<style>
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
