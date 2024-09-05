<template>
  <div id="app">
    <h1>Lịch Sử Đơn Hàng</h1>
    <div class="order-list">
      <div
        class="order-item"
        v-for="(order, index) in groupedOrders"
        :key="index"
      >
        <h2>Đơn hàng #{{ order.CartID }}</h2>
        <p>Ngày đặt: {{ order.DateOfOrder }}</p>
        <p>Tổng tiền: {{ order.totalAmount }} VNĐ</p>
        <h3>Chi tiết:</h3>
        <ul>
          <li v-for="item in order.items" :key="item.Name">
            {{ item.Name }} - {{ item.Quantity }} x {{ item.Price }} VNĐ
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "@/axios";

const userID = localStorage.getItem(`userID`);
const userToken = localStorage.getItem(`userToken`);

// Khởi tạo carts bằng ref
const carts = ref([]);

onMounted(() => {
  getCartFromID();
});

const getCartFromID = async () => {
  try {
    const response = await axios.get(`user/cart/getCartFromID`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    // Cập nhật carts với dữ liệu từ API
    carts.value = response.data.carts;
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};

const groupedOrders = computed(() => {
  const orders = [];
  const orderMap = {};

  carts.value.forEach((item) => {
    if (!orderMap[item.CartID]) {
      orderMap[item.CartID] = {
        CartID: item.CartID,
        DateOfOrder: item.DateOfOrder,
        totalAmount: 0,
        items: [],
      };
      orders.push(orderMap[item.CartID]);
    }

    orderMap[item.CartID].items.push({
      Name: item.Name,
      Quantity: item.Quantity,
      Price: item.Price,
    });

    orderMap[item.CartID].totalAmount += parseInt(item.TotalAmount);
  });

  return orders;
});
</script>

<style src="../styles/components/history.css" scoped></style>
