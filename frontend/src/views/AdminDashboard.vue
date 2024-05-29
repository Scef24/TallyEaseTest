<template>
  <div class="admin-dashboard">
    <aside class="sidebar">
      <h2>Admin Dashboard</h2>
      <nav>
        <router-link to="/admin/games">Manage Games</router-link>
        <router-link to="/admin/committees">Manage Committees</router-link>
        <router-link to="/admin/gamelist">Game List</router-link>
        <router-link to="/admin/committeelist">Committee List</router-link>
      </nav>
      <button @click="logout">Logout</button>
    </aside>
    <main class="main-content">
      <router-view></router-view>
    </main>
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

<style scoped >
.admin-dashboard {
  display: flex;
  min-height: 100vh;
}



.sidebar {
  width: 250px;
  background-color: #1a1a1a;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar h2 {
  margin-top: 0;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.sidebar nav a {
  color: white;
  text-decoration: none;
  padding: 10px 0;
}

.sidebar nav a:hover {
  background-color: #251c8e;
  border-radius: 5px;
}

.sidebar button {
  background-color: #646cff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-top: auto;
}

.sidebar button:hover {
  background-color: #535bf2;
}

.main-content {
  flex-grow: 1;
  padding: 1px;
 
  background: linear-gradient(90deg, rgba(39,39,57,1) 0%, rgba(30,39,68,1) 56%, rgba(10,10,78,1) 98%);
  color: white;
}

h1 {
  color: white;
} 


</style>
