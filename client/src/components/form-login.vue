<template>
  <div class="form-login-container">
    <div class="form-login">
      <section>
        <div>
          <h3>LOGIN FORM</h3>
          <img src="/images/My_Logo.jpg" alt="" />
        </div>
        <b-field>
          <b-input type="text" placeholder="Enter Username"> </b-input>
        </b-field>

        <b-field>
          <b-input type="password" placeholder="Enter Password" password-reveal>
          </b-input>
        </b-field>
        <b-button @click="clickMe">Log In</b-button>
        <b-button @click="clickMe"
          ><router-link to="/form-signup">Sign Up </router-link>
        </b-button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickMe() {
      this.$buefy.notification.open("Clicked!!");
    },
  },
};
</script>

<style>
.form-login-container h3 {
  font-size: 30px;
  font-weight: 700;
}
.form-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-login {
  border: 2px solid black;
  border-radius: 5px;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
