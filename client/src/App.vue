<template>
  <!-- Đây là phần Header -->
  <div class="fixed-navbar">
    <b-navbar class="navbar">
      <template #brand>
        <b-navbar-item href="/">
          <img src="/images/logo.png" class="navbar-logo" alt="Logo" />
        </b-navbar-item>
      </template>
      <template #start></template>
      <template #end>
        <b-navbar-item tag="div">
          <div class="navbar-buttons">
            <a
              v-if="!isLogged"
              href="/form-login"
              class="navbar-button login-button"
            >
              <img src="/images/account-icon.png" alt="Account" />
            </a>
            <p v-else="username">
              Chào, <a href="/user">{{ username }}</a
              >!
            </p>
            <a href="shopping-cart" class="navbar-button cart-button">
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
          <p class="hotline-number">
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
          <a href="https://www.facebook.com/profile.php?id=61556666886780">
            <img src="/images/facebook-icon.png" alt="Facebook" />
          </a>
          <a href="#">
            <img src="/images/instagram-icon.png" alt="Instagram" />
          </a>
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
import axios from "@/axios.js";

// Biến kiểm tra trạng thái đăng nhập
const isLogged = ref(false);
const username = ref("");

// Hàm kiểm tra trạng thái đăng nhập
const checkLoginStatus = () => {
  const token = localStorage.getItem("userToken");
  if (token) {
    isLogged.value = true;
    // Gọi hàm lấy tên người dùng khi đăng nhập thành công
    const userID = localStorage.getItem("userID");
    getUsernameFromID(userID);
  } else {
    isLogged.value = false;
  }
};

// Hàm lấy tên người dùng từ ID
const getUsernameFromID = async (id) => {
  try {
    const response = await axios.get(`user/username/${id}`);
    username.value = response.data.username; // Gán tên người dùng vào biến `username`
  } catch (error) {
    console.log("Error fetching username:", error);
  }
};

// Kiểm tra trạng thái đăng nhập khi component được mounted
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped>
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.navbar-logo {
  width: 100px;
  max-height: 80px;
}

.navbar-buttons {
  display: flex;
  align-items: center;
}

.navbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 15px;
  transition: background-color 0.3s, transform 0.3s;
}

.login-button {
  background-color: #ddd;
}

.cart-button {
  background-color: grey;
}

.navbar-button img {
  width: 24px;
  height: 24px;
}

.navbar-button:hover {
  background-color: #f0c02f;
  transform: scale(1.1);
}

.main-content {
  margin-top: 80px;
  padding: 20px;
  background-color: #f5f5f5;
}

.footer {
  background: #333;
  padding: 40px 20px;
  color: #fff;
  margin-top: 20px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-left,
.footer-middle,
.footer-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-logo {
  width: 120px;
  margin-bottom: 20px;
}

.footer-hotline p {
  margin: 0;
  font-size: 14px;
}

.hotline-number {
  font-size: 18px;
  font-weight: bold;
  color: #f0c02f;
  margin-top: 10px;
}

.footer-middle {
  align-items: center;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.footer-links a {
  color: #ddd;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #f0c02f;
}

.footer-right {
  align-items: flex-end;
  text-align: right;
}

.footer-social {
  margin-bottom: 20px;
}

.footer-social a {
  margin-right: 15px;
}

.footer-social img {
  width: 30px;
  transition: transform 0.3s;
}

.footer-social img:hover {
  transform: scale(1.2);
}

.footer-payment img {
  width: 60px;
  margin-right: 15px;
}

.footer-language button {
  background-color: #f0c02f;
  color: #333;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.footer-language button:hover {
  background-color: #ddd;
}
</style>
