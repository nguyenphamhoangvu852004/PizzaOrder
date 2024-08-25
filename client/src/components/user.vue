<template>
  <div class="container" v-if="isLoggedIn">
    <p>Xin Chào, Bạn là {{ username }}</p>
    <img src="" alt="hinh anh" />
    <button @click="logout()">Đăng Xuất</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted, watch } from "vue";

import deleteAllCookies from "../services/resetCookie.js";

const router = useRouter();

const isLoggedIn = ref(false);

const username = ref("");

onMounted(() => {
  checkLoginStatus();
});

watch(
  () => router.currentRoute.value.path,

  () => {
    checkLoginStatus();
  }
);

function checkLoginStatus() {
  const userData = localStorage.getItem("user");

  if (userData) {
    isLoggedIn.value = true;

    username.value = JSON.parse(userData).username;
  } else {
    isLoggedIn.value = false;
    window.location.href = "/form-login";
    username.value = "";
  }
}

function logout() {
  if (isLoggedIn.value) {
    deleteAllCookies();

    // Xóa dữ liệu từ localStorage (nếu cần)
    localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Xóa dữ liệu từ sessionStorage (nếu cần)
    sessionStorage.clear();

    // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chủ
    // window.location.href = "/login";
    window.location.href = "/";
    // localStorage.removeItem("user");

    // isLoggedIn.value = false;

    // username.value = "";

    // window.location.href = "/";
  } else {
    console.log("Không có người dùng nào đang đăng nhập.");
  }
}
</script>
