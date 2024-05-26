<template>
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <router-link to="/admin/games">Manage Games</router-link>
        <router-link to="/admin/committees">Manage Committees</router-link>
        <router-link to="/admin/gamelist">Game List</router-link>
        <router-link to="/admin/committeelist">Committe List</router-link>
      </nav>
      <button @click="logout">Logout</button>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminDashboard',
    methods:{
      async logout(){
        localStorage.removeItem('token')
        this.$router.push('/login')
      }
    }
  }
  </script>
  
  <style>

  nav {
    margin-bottom: 20px;
  }
  nav a {
    margin-right: 10px;
  }
  </style>
  