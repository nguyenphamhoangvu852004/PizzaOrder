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

        <div style="display: flex; margin-top: 10px">
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
      alert(`Đăng ký thành công.`);
    } catch (error) {
      console.log("Đăng ký thất bại:", error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
    }
  }
};
</script>

<style>
.form-signup-container h3 {
  font-size: 30px;
  font-weight: 700;
}
.form-signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-signup {
  border: 2px solid black;
  border-radius: 5px;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
