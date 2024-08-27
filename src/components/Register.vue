<template>
	<v-container>
		<v-form @submit.prevent="register">
			<v-text-field v-model="username" label="아이디" required>
			</v-text-field>
			<v-text-field v-model="password" label="비밀번호" required>
			</v-text-field>
			<v-text-field v-model="confirmPassword" label="비밀번호 확인" required>
			</v-text-field>
			<v-btn type="submit" color="primary">
				회원가입
			</v-btn>
			<v-alert v-if="error" type="error">
				{{ error }}
			</v-alert>
		</v-form>
	</v-container>
</template>

<script>
import authService from '@/services/authService';

export default {
	name: 'Register',
	data() {
		return {
			username: '',
			password: '',
			confirmPassword: '',
			error: null
		}
	},
	methods: {
		async register() {
			console.log("ttttt?")
			if(this.password !== this.confirmPassword) {
				console.log("ttttt")
				this.error = 'password is not correct'
				return
			}
			try {
				await authService.register(this.username, this.password)
			} catch (error) {
				console.error(error)
				this.error = 'sign up fails'
			}
		}
	}
}


</script>