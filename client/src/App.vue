<template>
  <!-- Đây là phần Header -->
  <div class="fixed-navbar">
    <b-navbar style="height: 80px">
      <template #brand>
        <b-navbar-item href="/">
          <img
            src="/images/logo.png"
            style="width: 100px; max-height: 80px"
            alt="Logo"
          />
        </b-navbar-item>
      </template>
      <template #start></template>
      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <p v-if="username">
              Chào, <a href="/user">{{ username }}</a
              >!
            </p>
            <p v-else></p>
            <a
              v-if="!isLogged.value"
              href="/form-login"
              class="button"
              style="background-color: #ddd"
            >
              <img src="/images/account-icon.png" alt="" />
            </a>
            <a
              href="shopping-cart"
              class="button"
              style="background-color: grey"
            >
              <img src="/images/cart.png" alt="Cart" />
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
  <!-- Đây là phần Header -->

  <!-- Đây là phần BODY -->
  <div class="main-content">
    <router-view />
    <router-view name="productList"></router-view>
  </div>
  <!-- Đây là phần BODY -->

  <!-- Đây là phần FOOTER -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-left">
        <img src="/images/logo.png" alt="Logo" class="footer-logo" />
        <div class="footer-hotline">
          <p>Hotline Đặt Hàng</p>
          <p style="" class="hotline-number">
            The website is in the process of being developed <br />
            by Nguyen Pham Hoang Vu
          </p>
        </div>
      </div>
      <div class="footer-middle">
        <div class="footer-links">
          <a href="#">Blog</a>
          <a href="#">Tuyển Dụng</a>
          <a href="#">Chính Sách</a>
          <a href="#">Thực Đơn</a>
          <a href="#">Mã e-voucher</a>
          <a href="#">Khuyến Mãi</a>
          <a href="#">Theo Dõi Đơn Hàng</a>
          <a href="#">Danh Sách Cửa Hàng</a>
          <a href="#">Rewards</a>
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-social">
          <a href="https://www.facebook.com/profile.php?id=61556666886780"
            ><img src="/images/facebook-icon.png" alt="Facebook"
          /></a>
          <a href="#"
            ><img src="/images/instagram-icon.png" alt="Instagram"
          /></a>
        </div>
        <div class="footer-payment">
          <img src="/images/mastercard-logo.png" alt="MasterCard" />
          <img src="/images/secured-logo.png" alt="Secured" />
        </div>
        <div class="footer-language">
          <button>Switch To English Version</button>
        </div>
      </div>
    </div>
  </footer>
  <!-- Đây là phần FOOTER -->
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "@/axios"; // Đảm bảo bạn đã cấu hình axios

const isLogged = ref(false);
const route = useRoute();

onMounted(() => {
  checkLoginStatus();
});

const username = ref("");
const getUserFromID = async (userId) => {
  if (!userId) return;
  try {
    const response = await axios.get(`/user/username/${userId}`);
    username.value = response.data.username;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const checkLoginStatus = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userObject = JSON.parse(storedUser);
    isLogged.value = true;
    getUserFromID(userObject.id);
  } else {
    isLogged.value = false;
    username.value = "";
  }
};
</script>
<style scoped>
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff; /* hoặc màu nền bạn muốn */
}

.main-content {
  margin-top: 80px; /* Điều chỉnh giá trị này để phù hợp với chiều cao của navbar */
}

body {
  margin: 0;
  padding: 0;
}
.footer {
  background: #e4f792;
  padding: 20px 0;
  font-family: Arial, sans-serif;
  color: black;
  margin-top: 20px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-logo {
  width: 120px;
  margin-bottom: 10px;
}

.footer-hotline p {
  margin: 0;
  font-size: 14px;
}

.hotline-number {
  font-size: 24px;
  font-weight: bold;
  color: #f0c02f;
  margin-top: 5px;
}

.footer-middle {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.footer-links a {
  color: black;
  text-decoration: none;
  font-size: 14px;

  transition: color 0.1s;
}

.footer-links a:hover {
  color: #f0c02f;
}

.footer-right {
  text-align: right;
}

.footer-social {
  margin-bottom: 15px;
}

.footer-social a {
  margin-right: 10px;
}

.footer-social img {
  width: 30px;
  transition: transform 0.3s;
}

.footer-social img:hover {
  transform: scale(1.1);
}

.footer-payment {
  margin-bottom: 15px;
}

.footer-payment img {
  width: 60px;
  margin-right: 10px;
}

.footer-language button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.footer-language button:hover {
  background-color: #0056b3;
}
</style>
