<template>
    <div>
      <h1>Game List</h1>
      <div v-if="loading">Loading...</div>
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
      <div v-else-if="!loading">No games available.</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'GameList',
    data() {
      return {
        games: [],
        loading: true
      };
    },
    mounted() {
      const token = localStorage.getItem('token');
      axios.get('http://127.0.0.1:8000/api/games', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      })
      .then(response => {
        
        console.log('Response data:', response.data);
  
        
        if (response.data && Array.isArray(response.data.games)) {
          this.games = response.data.games;
        } else {
          console.error('Expected an array but got:', typeof response.data.games);
        }
  
        this.loading = false;
      })
      .catch(error => {
        console.error('Error fetching game list:', error);
        this.loading = false;
      });
    }
  };
  </script>
  
  <style>
  
  </style>
  