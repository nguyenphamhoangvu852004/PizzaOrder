<template>
  <div class="user-profile">
    <header class="profile-header">
      <h1>Thông tin tài khoản</h1>
    </header>
    <div class="profile-content">
      <div class="profile-section">
        <h2>Thông tin cá nhân</h2>
        <div class="info-group">
          <label>Họ tên:</label>
          <p>{{ userInfo.fullName }}</p>
          <!-- Chú ý tên thuộc tính này -->
        </div>
        <div class="info-group">
          <label>Email:</label>
          <p>{{ userInfo.email }}</p>
        </div>
        <div class="info-group">
          <label>Số điện thoại:</label>
          <p>{{ userInfo.phone }}</p>
        </div>
        <button @click="editProfile" class="edit-button">Chỉnh sửa</button>
      </div>

      <div class="profile-section">
        <h2>Địa chỉ giao hàng</h2>
        <!-- <div v-if="userInfo.addresses.length > 0">
          <div
            v-for="(address, index) in userInfo.addresses"
            :key="index"
            class="address-item"
          >
            <p>{{ address }}</p>
          </div>
        </div> -->
        <!-- <p v-else>Bạn chưa có địa chỉ giao hàng nào.</p> -->
        <button @click="addAddress" class="add-button">Thêm địa chỉ mới</button>
      </div>

      <div class="profile-section">
        <h2>Điểm tích lũy</h2>
        <!-- <div class="points-display">
          <span class="points">{{ userInfo.points }}</span>
          <span class="points-label">điểm</span>
        </div> -->
        <button @click="showPointsHistory" class="history-button">
          Xem lịch sử điểm
        </button>
      </div>
    </div>

    <button @click="logout" class="logout-button">Đăng xuất</button>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "@/axios.js";

const userID = localStorage.getItem("userID");

const userInfo = reactive({
  fullName: null,
  email: null,
  phone: null,
  // addresses: [],
  // points: 0,
});

onMounted(async () => {
  await fetchUserInfo();
});

async function fetchUserInfo() {
  try {
    const response = await axios.get(`/user/userInfo/${userID}`);
    userInfo.fullName = response.data[0].Username;
    userInfo.email = response.data[0].Email;
    userInfo.phone = response.data[0].Phone;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
}

function editProfile() {
  // Implement edit profile logic
  console.log("Edit profile");
}

function addAddress() {
  // Implement add address logic
  console.log("Add new address");
}

function showPointsHistory() {
  // Implement show points history logic
  console.log("Show points history");
}

function logout() {
  localStorage.removeItem("userToken");
  // Thực hiện các hành động khác khi đăng xuất, ví dụ: chuyển hướng về trang đăng nhập
  console.log("User logged out");
  window.location.href = "/form-login"; // Hoặc bất kỳ đường dẫn nào bạn muốn chuyển đến sau khi đăng xuất
}
</script>

<style src="../styles/components/user.css" scoped></style>
