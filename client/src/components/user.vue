<template>
  <div>
    <div v-if="isLoggedIn">This Is User Page</div>

    <div v-else>You are not logged in.</div>

    <div v-if="isLoggedIn">
      <button @click="logout()">Đăng Xuất</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { ref, onMounted, watch } from "vue";

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

    username.value = JSON.parse(userData).name;
  } else {
    isLoggedIn.value = false;

    username.value = "";
  }
}

function logout() {
  if (isLoggedIn.value) {
    localStorage.removeItem("user");

    isLoggedIn.value = false;

    username.value = "";

    window.location.href = "/";
  } else {
    console.log("Không có người dùng nào đang đăng nhập.");
  }
}
</script>
