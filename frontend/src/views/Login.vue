<template>
    <div class="login-container">
      <div class="logo-container">
        <img src="../images/logo.png" class="logo" alt="Logo" />
      </div>
      <div class="cylinder-header">
        <h1 class="header-title">CPC TallyEase</h1>
        <router-link to="/" class="nav-link">Student Dashboard</router-link>
      </div>
      <h1>Login</h1>
      <h1 v-if="showNotification">{{ notificationMessage }}</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        username: '',
        notificationMessage: '',
        showNotification: false
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/login', {
            email: this.email,
            password: this.password
          });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userName', response.data.name);
          this.showNotification = true;
          this.notificationMessage = 'Login Successful';
          setTimeout(() => {
            this.$router.push('/admin');
          }, 2000);
        } catch (error) {
          console.error('Login error:', error);
          this.showNotification = true;
          this.notificationMessage = 'Invalid Credentials';
        }
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  h1 {
    color: #fff;
  }
  
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .logo-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
  }
  
  .logo {
    width: 80px;
    height: auto;
    border-radius: 50px;
  }
  
  .cylinder-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    background: linear-gradient(90deg, rgba(38, 38, 92, 1) 0%, rgba(37, 68, 168, 1) 52%, rgba(5, 5, 75, 1) 98%);
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 50px;
    margin-bottom: 20px;
  }
  
  .header-title {
    flex-grow: 1;
    text-align: center;
    margin: 0;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
  }
  
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }
  
  button {
    background-color: #0d0d0d;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    width: 100%;
  }
  
  @media (max-width: 768px) {
    .cylinder-header {
      flex-direction: column;
      text-align: center;
    }
    .logo {
      width: 60px;
    }
  }
  
  @media (max-width: 576px) {
    .cylinder-header {
      padding: 10px;
      font-size: 14px;
    }
    .logo {
      width: 50px;
    }
  }
  </style>
  