<template>
  <div class="container">
    <div class="user-information-container">
      <div class="user-details">
        <h2>Welcome, {{ username }}</h2>
        <img
          src="/images/Designer.png"
          alt="Profile Image"
          class="profile-image"
        />
        <button @click="logout" class="logout-button">Log Out</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/axios.js";
onMounted(() => {
  checkLoginStatus();
});
const username = ref("");
const getUsernameFromID = async (id) => {
  try {
    const response = await axios.get(`user/username/${id}`);
    username.value = response.data.username;
  } catch (error) {
    console.log("Error fetching username:", error);
  }
};
function checkLoginStatus() {
  let userToken = localStorage.getItem("userToken");
  let userID = localStorage.getItem("userID");
  getUsernameFromID(userID);
  if (!userToken) {
    window.location.href = "/form-login ";
  }
}

function logout() {
  localStorage.removeItem("userToken");
  window.location.href = "/";
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3ec78, #af4261);
}

.user-information-container {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 350px;
  text-align: center;
  transition: transform 0.3s;
}

.user-information-container:hover {
  transform: translateY(-10px);
}

.user-details h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.profile-image {
  border-radius: 50%;
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.profile-image:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.logout-button {
  background-color: #af4261;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.logout-button:hover {
  background-color: #f3ec78;
  color: #333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.logout-button:focus {
  outline: none;
}
</style>
