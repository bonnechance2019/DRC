<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
          <template v-slot:avatar>
            <q-icon name="account_circle" color="primary" />
          </template>
            {{ tab | firstCase }}
      </q-banner>
    </div>

    <div class="row q-mb-md">
      <q-input 
        outlined 
        class="col"
        v-model="formData.email" 
        :rules="[ val => isValidEmail(val) || 'Please enter a valid email']"
        lazy-rules
        ref="email"
        label="Email" />
    </div>

    <div class="row q-mb-md">
      <q-input 
        outlined 
        type="password"
        class="col"
        v-model="formData.password"
        :rules="[
          val => !!val || 'Required',
          val => val.length > 2 || 'Please enter at least 3 character',
        ]"
        lazy-rules 
        ref="password"
        label="Password" />
    </div>

    <div class="row q-mb-md">
      <q-input 
        v-if="tab == 'register'"
        outlined 
        type="password"
        class="col"
        v-model="password2"
        :rules="[
          val => val == formData.password || 'Please confirm your password',
        ]"
        lazy-rules 
        ref="password2"
        label="Confirm Password" />
    </div>

    <div class="row">
      <q-space />
      <q-btn type="submit" color="primary" :label="tab" />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      password2: ''
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    isValidEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase())
    },
    submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (this.tab == 'login') {
        if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          this.loginUser(this.formData)
        }
      }
      else {
        this.$refs.password2.validate()
        if (!this.$refs.email.hasError && !this.$refs.password.hasError && !this.$refs.password2.hasError) {
          this.registerUser(this.formData)
        }
      }
    }
  },
  filters: {
    firstCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>