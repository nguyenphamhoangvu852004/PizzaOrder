<template>
  <div class="container">
    <h1 class="title">QUÉT MÃ ĐỂ CHUYỂN KHOẢN</h1>

    <div class="bill-container">
      <h2 class="subtitle">Đơn đặt hàng</h2>
      <div v-if="cartItems.length > 0" class="product-list">
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="product-item"
        >
          <img :src="`/images/${item.image}`" alt="Product Image" />

          <span class="product-name">{{ item.name }}</span>
          <span class="product-quantity">x{{ item.quantity }} </span>
          <span class="product-price">
            {{ formatPrice(item.price * item.quantity) }} đ
          </span>
        </div>
      </div>
      <div v-else>
        <p>Giỏ hàng trống.</p>
      </div>
      <div class="total-amount">
        <strong>Tổng cộng:</strong> {{ formatPrice(totalAmount) }} đ
      </div>
    </div>

    <div class="img-container">
      <img src="/images/QR_Bank.jpg" alt="QR Code for payment" />
    </div>
  </div>
  <div class="payment-container">
    <button @click="payment()" class="payment-button">
      Tiến Hành Thanh Toán
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cartItems = ref([]);
const totalAmount = ref(0);
const userId = localStorage.getItem("userID"); // Lấy ID người dùng từ localStorage

onMounted(() => {
  loadCartItems(userId);
});

const loadCartItems = (userId) => {
  const storedCart = localStorage.getItem("cart");
  console.log("Stored Cart:", storedCart); // Kiểm tra giá trị này

  if (storedCart) {
    const cartData = JSON.parse(storedCart);
    cartItems.value = cartData[userId] || []; // Lấy giỏ hàng của người dùng
    console.log("Parsed Cart Items:", cartItems.value); // Kiểm tra giá trị sau khi phân tích cú pháp
    calculateTotalAmount();
  }
};

const calculateTotalAmount = () => {
  totalAmount.value = cartItems.value.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity; // Chuyển đổi giá thành số
  }, 0);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

const payment = () => {
  alert(`Thanh Toán Thành Công. Quay Về Trang Chủ.`);
  window.location.href = "/";
};
</script>

<style src="../styles/components/payment.css" scoped></style>
