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

        <div style="display: flex; margin-top: 10px">
          <input type="checkbox" />
          <p>
            I have read and agree to
            <a
              href="https://vietnamnet.vn/toi-dong-y-voi-dieu-khoan-va-dieu-kien-su-doi-tra-lon-nhat-cua-cong-nghe-i36033.html"
              >the Terms</a
            >
          </p>
        </div>
        <b-button @click="signupButton">Sign Up</b-button>

        <p>Go to <a href="/form-login">login page</a></p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref();
const password = ref();

const loginButton = () => {};
const signupButton = () => {};
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
