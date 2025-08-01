<script lang="ts" setup>
import { X } from 'lucide-vue-next';

const emit = defineEmits<{
  (e: 'change-toast'): void,
  (e: 'close-toast'): void
}>()

const closeAuthToast = () => {
  emit('close-toast')
}

const changeToast = () => {
  emit('change-toast')
}

const signin_title_translated = "Log in to your account";
const signin_title = ref("");
const signin_subtitle_translated = "Welcome! Please fill in the details to log in."
const signin_subtitle = ref("");

</script>

<template>
  <div class="auth-modal">
    <form @submit.prevent="authSignIn">
      <button class="close-modal" type="button" @click="closeAuthToast">
        <X :stroke-width="1.5" :size="18" absoluteStrokeWidth class="close-icon" />
      </button>
      <div class="image-wrapper">Image</div>
      <div class="auth-header">
        <span class="geist-medium">{{signin_title_translated}}</span>
        <span class="subtitle geist-regular">{{ signin_subtitle_translated }}</span>
      </div>
      <div class="input-form">
        <label for="email" class="geist-medium">Email address</label>
        <input type="email" placeholder="Email" class="geist-regular" v-model="email" required />
      </div>
      <div class="input-form">
        <label for="password" class="geist-medium">Password</label>
        <input type="password" placeholder="Password" class="geist-regular" v-model="password" required />
      </div>
      <button class="gtd geist-medium" type="submit" :disabled="is_loading">
        <ReusablesLoader v-if="is_loading" />
        <span class="geist-medium" v-else>Sign in to your account</span>
      </button>
    </form>
    <div class="sign-in">
      <span class="geist-regular">Don't have an account? <button @click="changeToast" class="geist-medium">Sign up</button></span>
    </div>
    <div class="better-auth-wrapper">
      <span class="geist-regular">Powered by <NuxtLink to="https://better-auth.com/" class="link-ref geist-medium">better-auth</NuxtLink></span>
    </div>
  </div>
</template>


<style lang="scss">
.auth-modal {
  width: stretch;
  height: stretch;
  background: rgba(18, 18, 18, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    box-shadow: 0.4px 0.3px 6px 1px rgba(18, 18, 18, 0.3);
    background: #FFFFFF;
    width: 325px;
    //height: 300px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 15px;
    padding: 7.5px;
    padding-top: 25px;
    padding-bottom: 15px;
    border-radius: 10px 10px 0px 0px;
    position: relative;
    .close-modal {
      border-radius: 50%;
      width: 28px;
      height: 28px;
      padding: 2.5px;
      background: transparent;
      border: 0;
      outline: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      cursor: pointer;
      top: 2.5px;
      right: 2.5px;
    }
    .image-wrapper {
      height: 75px;
      width: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(128, 128, 128, 0.7);
      border-radius: 7.5px;
    }
    .auth-header {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      margin-bottom: 15px;
      span {
        font-size: 16px;
        letter-spacing: -0.5px;
        text-align: center;
        margin: 0;
      }
      .subtitle {
        margin: 0;
        display: flex;
        font-size: 13px;
        color: rgba(128, 128, 128);

      }
    }
    .input-form {
      display: flex;
      flex-direction: column;
      justify-content: left;
      align-items: left;
      row-gap: 5px;
      width: 300px;
      label {
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 13px;
      }
      input {
        display: flex;
        width: stretch;
        height: 26px;
        padding-left: 5px;
        padding-right: 5px;
        font-size: 14px;
        outline: 0;
        border: 1px solid rgba(128, 128, 128, 0.4);
        border-radius: 5px;
        align-items: center;
        justify-content: left;
      }
    }
    .gtd {
      margin-top: 10px;
      width: 300px;
      height: 30px;
      border-radius: 2.5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(128, 128, 128, 0.2);
      outline: 0;
      background: #90ee90;
      font-size: 15px;
    }
  }
  .sign-in {
    padding: 7.5px;
    width: 325px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px;
    color: #121212;
    background: #FAFAFA;
    border-top: 1px solid rgba(128, 128, 128, 0.4);
    border-bottom: 1px solid rgba(128, 128, 128, 0.4);
    span {
      display: flex;
      font-size: 14px;
      align-items: center;
      justify-content: center;
      width: stretch;
      color: rgba(128, 128, 128);
    }
    button {
      font-size: 14px;
      height: stretch;
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      outline: 0;
      text-decoration: underline;
      background: transparent;
      cursor: pointer;
    }
  }
  .better-auth-wrapper {
    width: 325px;
    height: 26px;
    padding: 7.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 0px 10px 10px;
    background: #FAFAFA;
    color: #121212;
    span {
      font-size: 14px;
      color: rgba(128, 128, 128);
      .link-ref {
        text-decoration: underline;
        color: #121212;
      }
    }
  }
}
</style>