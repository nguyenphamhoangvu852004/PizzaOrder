<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">Giỏ Hàng</h2>
      <div class="cart-container">
        <div class="list-products">
          <div
            class="product-detail"
            v-for="(product, index) in products"
            :key="index"
          >
            <img :src="`/images/${product.image}`" :alt="product.name" />
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">{{ product.price }} đ</p>
              <div class="quantity-control">
                <button @click="decreaseQuantity(index)">-</button>
                <span>{{ product.quantity }}</span>
                <button @click="increaseQuantity(index)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="removeProduct(index)">X</button>
          </div>
        </div>
        <div class="cart-summary">
          <div class="total">
            <h3>Tổng Tiền</h3>
            <p>{{ calculateTotal() }} đ</p>
          </div>
          <div class="option">
            <a href="/">
              <button class="continue-btn">Tiếp Tục Mua Hàng</button></a
            >
            <a href="/payment">
              <button class="checkout-btn" @click="">Thanh Toán</button></a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    this.loadCart();
  },
  methods: {
    loadCart() {
      // Tải giỏ hàng từ localStorage
      this.products = JSON.parse(localStorage.getItem("cart")) || [];
    },
    decreaseQuantity(index) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(this.products));
    },
    increaseQuantity(index) {
      this.products[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(this.products));
    },
    removeProduct(index) {
      this.products.splice(index, 1);

      // Cập nhật localStorage
      localStorage.setItem("cart", JSON.stringify(this.products));

      // Hiển thị thông báo (tùy chọn)
      if (this.$buefy) {
        this.$buefy.notification.open({
          message: "Sản phẩm đã được xóa khỏi giỏ hàng",
          type: "is-success",
          position: "is-bottom-right",
        });
      }
    },
    calculateTotal() {
      return this.products.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
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
.cart-container {
  display: flex;
  gap: 20px;
}

.list-products {
  flex: 2;
}

.product-detail {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-detail img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-price {
  color: #e53935;
  font-weight: bold;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.quantity-control span {
  margin: 0 10px;
  font-weight: bold;
}

.remove-btn {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.cart-summary {
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.total {
  margin-bottom: 20px;
}

.total h3 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.total p {
  font-size: 1.5em;
  font-weight: bold;
  color: #e53935;
}

.option {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.continue-btn {
  background-color: #4caf50;
  color: white;
}

.checkout-btn {
  background-color: #2196f3;
  color: white;
}

.option button:hover {
  opacity: 0.9;
}
</style>
