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
                <img :src="`/images/${product.image}`" :alt="product.name" />
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-4">{{ product.name }}</p>
              <p class="subtitle is-6">{{ product.price }} đ</p>
            </div>
            <div class="card-footer">
              <a @click="" class="card-footer-item">Chi Tiết</a>
              <a @click="addToCart(product)" class="card-footer-item"
                >Thêm vào giỏ</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    this.getAllProduct();
  },
  methods: {
    addToCart(product) {
      // Lấy giỏ hàng hiện tại từ localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        cart[existingProductIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới với số lượng là 1
        cart.push({ ...product, quantity: 1 });
      }

      // Lưu giỏ hàng mới vào localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Hiển thị thông báo (nếu bạn đang sử dụng Buefy)
      if (this.$buefy) {
        this.$buefy.notification.open({
          message: `Đã thêm ${product.name} vào giỏ hàng!`,
          type: "is-success",
          position: "is-bottom-right",
        });
      }
    },
    async getAllProduct() {
      try {
        const result = await this.axios.get(
          "http://localhost:8213/api/v1/product/getAllProduct"
        );
        // console.log(result.data.data); check data
        this.products = result.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    return {
      products: [],
    };
  },
};
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
