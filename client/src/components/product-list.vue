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
                <img :src="product.image" :alt="product.name" />
              </figure>
            </div>
            <div class="card-content">
              <p class="title is-4">{{ product.name }}</p>
              <p class="subtitle is-6">{{ product.price }} đ</p>
            </div>
            <div class="card-footer">
              <a @click="clickMe()" class="card-footer-item">Chi Tiết</a>
              <a @click="clickMe()" class="card-footer-item">Thêm vào giỏ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    clickMe() {
      this.$buefy.notification.open("Clicked!!");
    },
  },
  data() {
    return {
      products: [
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
        {
          name: "Pizza Hải Sản",
          price: 150000,
          image: require("../resource/images/home-img-1.png"),
        },
      ],
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
  transition-delay: 0.2;
}
.card-footer-item:hover {
  color: white;
  background-color: rgb(150, 150, 6);
}
.card-content {
  flex-grow: 1;
}

.image.is-4by3 {
  background-position: center;
  background-size: cover;
}
</style>
