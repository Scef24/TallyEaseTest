<template>
  <div>
    <h1>Game List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <table v-if="games.length > 0">
        <thead>
          <tr>
            <th>Game Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in games" :key="game.id">
            <td>{{ game.name }}</td>
            <td>{{ game.description }}</td>
            <td>{{ game.category }}</td>
            <td>{{ game.type }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else>No games available.</div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GameList',
  data() {
    return {
      games: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.error = 'Authorization token not found';
      this.loading = false;
      return;
    }

    axios.get('http://127.0.0.1:8000/api/games', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.data && Array.isArray(response.data.games)) {
        this.games = response.data.games;
      } else {
        console.error('Expected an array but got:', typeof response.data.games);
        this.error = 'Unexpected response format';
      }
      this.loading = false;
    })
    .catch(error => {
      console.error('Error fetching game list:', error);
      this.error = 'Failed to fetch game list';
      this.loading = false;
    });
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #0e0d0d;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
