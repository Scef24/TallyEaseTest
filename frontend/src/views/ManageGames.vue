<template>
  <div class="container">
    <h1>Manage Games</h1>
    <div v-if="showNotification" class="notification">{{ notificationMessage }}</div>
    <form @submit.prevent="addGames" class="form">
      <div class="form-group">
        <label for="gameName">Game Name:</label>
        <input type="text" v-model="gameName" id="gameName" required>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" v-model="description" id="description" required>
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <input type="text" v-model="category" id="category" required>
      </div>
      <div class="form-group">
        <label for="type">Type:</label>
        <input type="text" v-model="type" id="type" required>
      </div>
      <button type="submit">Add Game</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageGames',
  data() {
    return {
      gameName: '',
      description: '',
      category: '',
      type: '',
      showNotification: false,
      notificationMessage: ''
    };
  },
  methods: {
    async addGames() {
      try {
        const token = localStorage.getItem('token');
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
        this.showNotification = true;
        this.notificationMessage = 'Game Added Successfully';
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      } catch (error) {
        console.error('Error adding game:', error.response ? error.response.data : error.message);
        this.showNotification = true;
        this.notificationMessage = 'Failed to Add Game';
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
/*
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2em;
  margin-bottom: 20px; 
  color:black;
}

.notification {
  background-color: #f44336;
  color: white;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.form {
  display: flex;
  flex-direction: column;
  
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}



/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
} 
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.notification {
  margin-top: 10px;
  color: green;
}

.form {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color:black;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>
