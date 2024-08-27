<template>
  <v-container>
   <v-form @submit.prevent="login">
      <v-text-field v-model="username" label="아이디" required>
			</v-text-field>
      <v-text-field v-model="password" label="비밀번호" required>
			</v-text-field>
      <v-btn type="submit" color="primary">
        로그인
      </v-btn>
    </v-form>
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert> 
  </v-container>
</template>
<script>
import authService from '@/services/authService';

export default {
	name: 'Login',
	data() {
		return {
			username: '',
			password: '',
			error: null
		}
	},
	methods: {
		async login() {
			try {
        const response = await authService.login(this.username, this.password);
        const token = response.data
        localStorage.setItem('token', token)
        this.$router.push('/')
			} catch (error) {
				console.error(error)
				this.error = 'login fails'
			}
		}
	}
}


</script>