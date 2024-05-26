<template>
    <div>
        <h1>Login</h1>
        <h1 v-if="showNotification">{{  notificationMessage }}</h1>
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
            username:'',
            notificationMessage:'',
            showNotification:false
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
                localStorage.setItem('userName',response.data.name)
                this.showNotification = true;
                this.notificationMessage = 'Login Successful'
                setTimeout(()=>{
                    this.$router.push('/admin');
                },2000)
                
            } catch (error) {
                console.error('Login error:', error);
                setTimeout(()=>{
                this.showNotification = true
                this.notificationMessage = 'Invalid Credentials'
                },2000)
            }
        }
    }
};
</script>
