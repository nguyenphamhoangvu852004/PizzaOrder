<template>
  <div class="form-signup-container">
    <div class="form-signup">
      <section>
        <div>
          <h3>SIGNUP FORM</h3>
          <img src="/images/My_Logo.jpg" alt="" />
        </div>
        <b-field>
          <b-input type="text" placeholder="Username"> </b-input>
        </b-field>
        <b-field>
          <b-input type="text" placeholder="Phonenumber"> </b-input>
        </b-field>
        <!-- <b-field label="Email" type="is-danger" message="This email is invalid"> -->
        <b-field>
          <b-input type="text" placeholder="Email"> </b-input>
        </b-field>

        <b-field>
          <b-input type="password" placeholder="Password" password-reveal>
          </b-input>
        </b-field>
        <b-field>
          <b-input
            type="password"
            placeholder="Confirm Password"
            password-reveal
          >
          </b-input>
        </b-field>
        <b-button @click="clickMe">
          <router-link to="/form-login">Log In</router-link></b-button
        >
        <b-button @click="clickMe"
          ><router-link to="/form-signup">Sign Up</router-link>
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
.form-signup-container h3 {
  font-size: 30px;
  font-weight: 700;
}
.form-signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-signup {
  border: 2px solid black;
  border-radius: 5px;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
