<template>
  <div>
    <h1>Manage Games</h1>
    <h1 v-if="showNotification">{{ notificationMessage }}</h1>
    <form @submit.prevent="addGames">
      <label for="name">Game Name: </label>
      <input type="text" v-model="gameName" id="">
      <br>
      <label for="description">Description: </label>
      <input type="text" v-model="description" id="">
      <br>
      <label for="category">Category: </label>
      <input type="text" v-model="category">
      <br>
      <label for="type">Type: </label>
      <input type="text" v-model="type">
      <br>
      <button type="submit">Add Game</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'; // Ensure you import Axios

export default {
  name: 'ManageGames',
  data() {
    return {
      gameName: '',
      description: '',
      category: '',
      type: '',
      showNotification:false,
      notificationMessage:''
    };
  },
  methods: {
    async addGames() {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        const response = await axios.post('http://127.0.0.1:8000/api/games', {
          name: this.gameName,
          description: this.description,
          category: this.category,
          type: this.type
        }, {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          }
        });

        console.log('You added a game successfully:', response.data);
        this.gameName = '';
        this.description = '';
        this.category = '';
        this.type = '';
        setTimeout(()=>{
          this.showNotification = true
          this.notificationMessage = 'Game Added Successfully'
        },2000)
      } catch (error) {
        console.error('Error adding game:', error.response ? error.response.data : error.message);
        setTimeout(()=>{
          this.showNotification = true
          this.notificationMessage = 'Fail to Add'
        },2000)
      }
    }
  }
};
</script>
