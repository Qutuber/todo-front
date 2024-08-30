<template>
	<v-container>
	  <v-form @submit.prevent="register" ref="form">
		<v-text-field v-model="username" label="아이디" required></v-text-field>
		<v-text-field
		  v-model="password"
		  label="비밀번호"
		  type="password"
		  required
		></v-text-field>
		<v-text-field
		  v-model="confirmPassword"
		  label="비밀번호 확인"
		  type="password"
		  required
		></v-text-field>
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
	  };
	},
	methods: {
	  async register() {
		if (this.password !== this.confirmPassword) {
		  this.error = '비밀번호가 일치하지 않습니다.';
		  return;
		}
		try {
		  await authService.register(this.username, this.password);
		} catch (error) {
		  console.error('회원가입 오류:', error);
		  this.error = '회원가입 실패. 다시 시도해 주세요.';
		}
	  }
	}
  };
  </script>
  