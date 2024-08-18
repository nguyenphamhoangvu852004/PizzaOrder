import { createRouter, createWebHistory } from 'vue-router'
import carousel from "../components/carousel.vue"
import product_list from "../components/product-list.vue"
import form_login from "../components/form-login.vue"
import form_signup from "../components/form-signup.vue"
import product_detail from "../components/product-detail.vue"
import shopping_cart from "../components/shoppingCart.vue"
import payment from "../components/payment.vue"
const routes = [
  {
    path: '/',
    name: 'carousel',
    components: {
      default: carousel,
      productList: product_list
    }
  }, {
    path: '/form-login',
    name: 'loginForm',
    component: form_login
  },
  {
    path: '/form-signup',
    name: 'signupForm',
    component: form_signup
  },
  {
    path: '/product-detail',
    name: 'product-detail',
    component: product_detail
  },
  {
    path: '/shopping-cart',
    name: 'shopping-car',
    component: shopping_cart
  },
  {
    path: '/payment',

    component: payment
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
