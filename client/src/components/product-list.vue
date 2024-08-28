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
    const result = await axios.get(
      "https://pizzaorder-2rtb.onrender.com/api/v1/product/getAllProduct"
    );
    products.value = result.data.data;
  } catch (error) {
    console.log("Error fetching products:", error);
  }
};

const addToCart = async (product) => {
  try {
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
    alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
  }
};

onMounted(() => {
  getAllProduct();
});
</script>

<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card-footer-item {
  color: black;
}
.card-footer-item:hover {
  color: rgb(255, 251, 5);
  background-color: rgb(244, 106, 1);
  transition: all 0.2s ease;
}
.card-content {
  flex-grow: 1;
}

.image.is-4by3 {
  background-position: center;
  background-size: cover;
}
</style>
