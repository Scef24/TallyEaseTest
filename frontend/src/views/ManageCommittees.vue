<template>
  <div class="container">
    <h1>Manage Committees</h1>
    <h2 v-if="showNotification" class="notification">{{ notificationMessage }}</h2>
    <form @submit.prevent="addCommittee" class="form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" v-model="name" id="name" required>
      </div>
      <div class="form-group">
        <label for="email">Username</label>
        <input type="email" v-model="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit">Add Committee</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageCommittees',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'committee',
      showNotification: false,
      notificationMessage: ''
    };
  },
  methods: {
    async addCommittee() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:8000/api/committees', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
          }
        });
        console.log('You added a Committee Successfully');
        this.name = '';
        this.email = '';
        this.password = '';
        
        setTimeout(() => {
          this.showNotification = true;
          this.notificationMessage = 'You added a Committee Successfully';
        }, 2000);
      } catch (error) {
        console.error('Error adding committee', error);
        setTimeout(() => {
          this.showNotification = true;
          this.notificationMessage = 'Failed to Add';
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.form-group{
  color:black;
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

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
</style>
