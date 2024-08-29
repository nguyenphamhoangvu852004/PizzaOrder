<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">Sản phẩm của chúng tôi</h2>
      <div class="columns is-multiline">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="column is-3"
        >
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="`/images/${product.Image}`" :alt="product.Name" />
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-4">{{ product.Name }}</p>
              <p class="subtitle is-6">{{ product.Price }} đ</p>
            </div>
            <div class="card-footer">
              <a @click="" class="card-footer-item">Chi Tiết</a>
              <a @click="addToCart(product)" class="card-footer-item">
                Thêm vào giỏ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/axios"; // Import axios từ file axios.js

const products = ref([]);

const getAllProduct = async () => {
  try {
    const result = await axios.get("product/getAllProduct");
    products.value = result.data.data;
    console.log(products.value);
  } catch (error) {
    console.log("Error fetching products:", error);
  }
};

const addToCart = (product) => {
  let userID = localStorage.getItem("userID");

  // Lấy giỏ hàng hiện tại từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Nếu userID chưa có trong giỏ hàng, tạo giỏ hàng cho user đó
  if (!cart[userID]) {
    cart[userID] = [];
  }

  // Tìm xem sản phẩm đã tồn tại trong giỏ hàng chưa
  let existingProduct = cart[userID].find(
    (item) => item.productID === product.ProductID
  );

  if (existingProduct) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng
    existingProduct.quantity += 1;
  } else {
    // Nếu sản phẩm chưa tồn tại, thêm sản phẩm vào giỏ hàng
    cart[userID].push({
      productID: product.ProductID,
      name: product.Name,
      price: product.Price,
      image: product.Image,
      quantity: 1, // Mặc định số lượng là 1 khi thêm vào giỏ hàng
    });
  }

  // Lưu lại giỏ hàng vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
};

onMounted(() => {
  getAllProduct();
});
</script>

<style src="../styles/components/product-list.css" scoped></style>
