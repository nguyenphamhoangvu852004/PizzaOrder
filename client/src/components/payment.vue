<template>
  <div class="container">
    <h1>QUÉT MÃ ĐỂ CHUYỂN KHOẢN</h1>
    
    <div class="bill-container">
      <h2>Chi tiết đơn hàng</h2>
      <div v-if="cartDetails.length > 0" class="product-list">
        <div v-for="(item, index) in cartDetails" :key="index" class="product-item">
          <span class="product-name">{{ item.name }}</span>
          <span class="product-quantity">x{{ item.quantity }}</span>
          <span class="product-price">{{ formatPrice(item.price * item.quantity) }} đ</span>
        </div>
      </div>
      <div class="total-amount">
        <strong>Tổng cộng:</strong> {{ formatPrice(cartTotal) }} đ
      </div>
    </div>

    <div class="img-container">
      <img src="/images/QR_Bank.jpg" alt="QR Code for payment" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cartDetails = ref([]);
const cartTotal = ref(0);

onMounted(() => {
  loadCartDetails();
});

const loadCartDetails = () => {
  const storedDetails = localStorage.getItem('cartDetails');
  const storedTotal = localStorage.getItem('cartTotal');
  
  if (storedDetails) {
    cartDetails.value = JSON.parse(storedDetails);
  }
  
  if (storedTotal) {
    cartTotal.value = parseFloat(storedTotal);
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.bill-container {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.product-list {
  margin-bottom: 20px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.product-name {
  flex: 2;
}

.product-quantity {
  flex: 1;
  text-align: center;
}

.product-price {
  flex: 1;
  text-align: right;
}

.total-amount {
  font-size: 18px;
  text-align: right;
  margin-top: 20px;
}

.img-container {
  display: flex;
  justify-content: center;
}

img {
  border: 1px solid black;
  max-width: 100%;
  height: 400px;
  object-fit: contain;
}
</style>