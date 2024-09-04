<template>
  <div class="user-profile">
    <header class="profile-header">
      <h1>User Information</h1>
    </header>
    <nav class="profile-nav">
      <button @click="goToSection('orders')" class="nav-button">
        <i class="fa-solid fa-cart-shopping" style="color: #ffffff"></i> Orders
      </button>
      <button @click="goToSection('messages')" class="nav-button">
        <i class="fa-solid fa-message" style="color: #ffffff"></i> Messages
      </button>
      <button @click="goToSection('history')" class="nav-button">
        <i class="fa-solid fa-bag-shopping" style="color: #ffffff"></i> History
      </button>
      <button @click="goToSection('address')" class="nav-button">
        <i class="fa-solid fa-location-dot" style="color: #ffffff"></i> Address
      </button>
      <button @click="goToSection('payment')" class="nav-button">
        <i class="fa-solid fa-money-bill" style="color: #ffffff"></i> Payment
      </button>
    </nav>
    <div v-if="loading" class="loading-spinner">
      <span class="icon is-large">
        <i class="fas fa-spinner fa-pulse fa-3x"></i>
      </span>
    </div>
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="fetchUserInfo" class="retry-button">
        <i class="fa-solid fa-arrows-rotate" style="color: #ffffff"></i> Refresh
      </button>
    </div>
    <div v-else class="profile-content">
      <div class="profile-header">
        <div class="avatar-section">
          <div class="avatar-container">
            <img :src="userAvatar" alt="User Avatar" class="avatar-img" />
          </div>
          <input
            type="file"
            @change="updateAvatar"
            id="avatar-upload"
            style="display: none"
          />
          <button @click="triggerFileInput" class="upload-button">
            <i class="fa-solid fa-upload" style="color: #ffffff"></i> Update
            Image
          </button>
        </div>
      </div>

      <div class="profile-section">
        <h2>User Information Detail</h2>
        <div v-if="!isEditing">
          <div class="info-group">
            <label>Username:</label>
            <p>{{ userInfo.fullName }}</p>
          </div>
          <div class="info-group">
            <label>Email:</label>
            <p>{{ userInfo.email }}</p>
          </div>
          <div class="info-group">
            <label>Phone Number:</label>
            <p>{{ userInfo.phone }}</p>
          </div>
          <button @click="startEditing" class="edit-button">
            <i class="fa-solid fa-pen" style="color: #ffffff"></i> Edit
          </button>
        </div>
        <div v-else>
          <form @submit.prevent="saveChanges">
            <div class="info-group">
              <label>Username:</label>
              <input v-model="editedInfo.fullName" required />
            </div>
            <div class="info-group">
              <label>Email:</label>
              <input v-model="editedInfo.email" type="email" required />
            </div>
            <div class="info-group">
              <label>Phone Number:</label>
              <input v-model="editedInfo.phone" type="tel" required />
            </div>
            <button type="submit" class="save-button">
              <i class="fa-solid fa-check" style="color: #ffffff"></i> Save
            </button>
            <button @click="cancelEditing" class="cancel-button">
              <i class="fa-solid fa-x" style="color: #ffffff"></i> Cancel
            </button>
          </form>
        </div>
      </div>

      <div class="profile-section">
        <h2>Delivery address (One Address Only)</h2>
        <div v-if="addresses == ''">
          <p>Bạn chưa có địa chỉ giao hàng nào.</p>
        </div>
        <div v-else>
          <ul>
            <li v-for="(address, index) in addresses" :key="index">
              {{ address }}
              <button @click="removeAddress(index)" class="remove-button">
                <i class="fa-solid fa-x" style="color: #ffffff"></i> Delete
              </button>
            </li>
          </ul>
        </div>
        <div v-if="isAddingAddress">
          <input
            v-model="newAddress"
            placeholder="Nhập địa chỉ mới"
            class="address-input"
          />
          <button @click="saveNewAddress" class="save-button">Save</button>
          <button @click="cancelAddingAddress" class="cancel-button">
            Cancel
          </button>
        </div>
        <button v-else @click="startAddingAddress" class="add-button">
          <i class="fa-solid fa-plus" style="color: #ffffff"></i> Add new
          address
        </button>
      </div>

      <div class="profile-section">
        <h2>Accumulated points</h2>
        <p>Thông tin điểm tích lũy chưa có sẵn.</p>
        <p>Bạn cần mua hàng để tích lũy điểm.</p>
        <button @click="showPointsHistory" class="history-button">
          View point history
        </button>
      </div>
    </div>

    <button @click="logout" class="logout-button">
      <i
        class="fa-solid fa-arrow-right-from-bracket"
        style="color: #ffffff"
      ></i>
      Log Out
    </button>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "@/axios.js";
const userAvatar = ref("/images/My_Logo.jpg");

const userID = localStorage.getItem("userID");
const loading = ref(true);
const error = ref(null);
const isEditing = ref(false);

const addresses = ref();
const isAddingAddress = ref(false);
const newAddress = ref();

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
const token = localStorage.getItem("userToken");
onMounted(() => {
  checkLoggedIn();
  fetchUserInfo();
  fetchAddresses(); // New function to fetch addresses
});

async function fetchUserInfo() {
  loading.value = true;
  error.value = null;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get(`/user/userInfo`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token ở đây
      },
    });

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
    window.location.href = "/form-login";
  }
};

const startEditing = () => {
  editedInfo.fullName = userInfo.fullName;
  editedInfo.email = userInfo.email;
  editedInfo.phone = userInfo.phone;
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const saveChanges = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.put(
      `/user/updateUser`,
      {
        Username: editedInfo.fullName,
        Email: editedInfo.email,
        Phone: editedInfo.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token ở đây
        },
      }
    );
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
    error.value =
      "Không thể cập nhật thông tin người dùng. Vui lòng thử lại sau.";
  } finally {
    loading.value = false;
  }
};

const addAddress = () => {
  console.log("Add new address");
  // Implement add address logic
};

const showPointsHistory = () => {
  console.log("Show points history");
  // Implement show points history logic
};

const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userID");
  window.location.href = "/form-login";
};

const fetchAddresses = async () => {
  try {
    // Assume we have an API endpoint to fetch addresses
    const response = await axios.get(`user/getAddress`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token ở đây
      },
    });
    addresses.value = [response.data[0].Address];
  } catch (err) {
    console.error("Error fetching addresses:", err);
    // Handle error (maybe show a message to the user)
  }
};

const startAddingAddress = () => {
  isAddingAddress.value = true;
};

const cancelAddingAddress = () => {
  isAddingAddress.value = false;
  newAddress.value = "";
};

//Bug Chõ nàyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy // Chỗ này khi mà người dùng thêm mới địa chỉ, thì nó thay thế luôn cái db cũ, như là update
// 1 người - 1 địa chỉ
const saveNewAddress = async () => {
  if (newAddress.value.trim() === "") {
    // Show an error message or handle empty input
    return;
  }

  try {
    // Assume we have an API endpoint to add a new address
    const response = await axios.put(
      `user/addAddress`,
      {
        address: newAddress.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token ở đây
        },
      }
    );
    if (response.data.success) {
      newAddress.value = "";
      isAddingAddress.value = false;
      window.location.href = "/user";
    } else {
      throw new Error("Không thể thêm địa chỉ mới");
    }
  } catch (err) {
    console.error("Error adding new address:", err);
    // Handle error (maybe show a message to the user)
  }
};
const removeAddress = async (index) => {
  try {
    const response = await axios.put(`/user/removeAddress`, null, {
      headers: {
        Authorization: `Bearer ${token}`, // Đảm bảo token được gửi chính xác trong headers
      },
    });

    if (response.data.success) {
      addresses.value = "";
    } else {
      throw new Error("Không thể xóa địa chỉ");
    }
  } catch (err) {
    console.error("Error removing address:", err);
    // Handle error (maybe show a message to the user)
  }
};

function goToSection(section) {
  switch (section) {
    case "orders":
      window.location.href = "/shopping-cart";
      break;
    case "messages":
      window.location.href = "/messages";
      break;
    case "history":
      window.location.href = "/history";
      break;
    case "address":
      window.location.href = "/address";
      break;
    case "payment":
      window.location.href = "/payment";
      break;
    default:
      break;
  }
}
</script>

<style src="../styles/components/user.css" scoped></style>
