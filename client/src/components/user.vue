<template>
  <div class="user-profile">
    <header class="profile-header">
      <h1>Thông tin tài khoản</h1>
    </header>
    <div v-if="loading" class="loading-spinner">
      <span class="icon is-large">
        <i class="fas fa-spinner fa-pulse fa-3x"></i>
      </span>
    </div>
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchUserInfo" class="retry-button">Thử lại</button>
    </div>
    <div v-else class="profile-content">
      <div class="profile-section">
        <h2>Thông tin cá nhân</h2>
        <div v-if="!isEditing">
          <div class="info-group">
            <label>Họ tên:</label>
            <p>{{ userInfo.fullName }}</p>
          </div>
          <div class="info-group">
            <label>Email:</label>
            <p>{{ userInfo.email }}</p>
          </div>
          <div class="info-group">
            <label>Số điện thoại:</label>
            <p>{{ userInfo.phone }}</p>
          </div>
          <button @click="startEditing" class="edit-button">Chỉnh sửa</button>
        </div>
        <div v-else>
          <form @submit.prevent="saveChanges">
            <div class="info-group">
              <label>Họ tên:</label>
              <input v-model="editedInfo.fullName" required />
            </div>
            <div class="info-group">
              <label>Email:</label>
              <input v-model="editedInfo.email" type="email" required />
            </div>
            <div class="info-group">
              <label>Số điện thoại:</label>
              <input v-model="editedInfo.phone" type="tel" required />
            </div>
            <button type="submit" class="save-button">Lưu thay đổi</button>
            <button @click="cancelEditing" class="cancel-button">Hủy</button>
          </form>
        </div>
      </div>

      <div class="profile-section">
        <h2>Địa chỉ giao hàng</h2>
        <p>Bạn chưa có địa chỉ giao hàng nào.</p>
        <button @click="addAddress" class="add-button">Thêm địa chỉ mới</button>
      </div>

      <div class="profile-section">
        <h2>Điểm tích lũy</h2>
        <p>Thông tin điểm tích lũy chưa có sẵn.</p>
        <p>Bạn cần mua hàng để tích lũy điểm.</p>
        <button @click="showPointsHistory" class="history-button">
          Xem lịch sử điểm
        </button>
      </div>
    </div>

    <button @click="logout" class="logout-button">Đăng xuất</button>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "@/axios.js";
import { useRouter } from "vue-router";

const router = useRouter();
const userID = localStorage.getItem("userID");
const loading = ref(true);
const error = ref(null);
const isEditing = ref(false);
const userInfo = reactive({
  fullName: null,
  email: null,
  phone: null,
});
const editedInfo = reactive({
  fullName: "",
  email: "",
  phone: "",
});

onMounted(() => {
  checkLoggedIn();
  fetchUserInfo();
});

async function fetchUserInfo() {
  loading.value = true;
  error.value = null;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get(`/user/userInfo/${userID}`);
    userInfo.fullName = response.data[0].Username;
    userInfo.email = response.data[0].Email;
    userInfo.phone = response.data[0].Phone;
  } catch (err) {
    console.error("Error fetching user info:", err);
    error.value = "Không thể tải thông tin người dùng. Vui lòng thử lại sau.";
  } finally {
    loading.value = false;
  }
}

const checkLoggedIn = () => {
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    router.push("/form-login");
  }
};

function startEditing() {
  editedInfo.fullName = userInfo.fullName;
  editedInfo.email = userInfo.email;
  editedInfo.phone = userInfo.phone;
  isEditing.value = true;
}

function cancelEditing() {
  isEditing.value = false;
}

async function saveChanges() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.put(`/user/updateUser/${userID}`, {
      Username: editedInfo.fullName,
      Email: editedInfo.email,
      Phone: editedInfo.phone,
    });
    if (response.data.success) {
      userInfo.fullName = editedInfo.fullName;
      userInfo.email = editedInfo.email;
      userInfo.phone = editedInfo.phone;
      isEditing.value = false;
    } else {
      throw new Error("Cập nhật không thành công");
    }
  } catch (err) {
    console.error("Error updating user info:", err);
    error.value = "Không thể cập nhật thông tin người dùng. Vui lòng thử lại sau.";
  } finally {
    loading.value = false;
  }
}

function addAddress() {
  console.log("Add new address");
  // Implement add address logic
}

function showPointsHistory() {
  console.log("Show points history");
  // Implement show points history logic
}

function logout() {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userID");
  router.push("/form-login");
}
</script>

<style src="../styles/components/user.css" scoped></style>
