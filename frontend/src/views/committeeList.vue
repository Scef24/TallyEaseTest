<template>
  <div>
    <h1>List of Committee</h1> 
    <div class="card-container">
      <div v-for="committee in committees" :key="committee.id" class="card">
        <img src="" height="50px" width="100px">
        <h3>Name: {{ committee.name}}</h3>
        <h2>{{ committee.id}}</h2>
        <button @click="deleteCommittee(committee.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
name: 'CommitteeList',
data() {
  return {
    committees: []
  };
},
mounted() {
  this.fetchCommittees();
},
methods: {
  fetchCommittees() {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/committees', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      if (response.data && Array.isArray(response.data.committees)) {
        this.committees = response.data.committees;
        console.log(response.data.committees)
      } else {
        console.error('Expected an array but got:', typeof response.data.committees);
      }
    })
    .catch(error => {
      console.error('Error fetching committee list:', error);
    });
  },
  deleteCommittee(id) {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:8000/api/committees/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      console.log('Committee deleted:', response.data);
      this.committees = this.committees.filter(committee => committee.id !== id);
    })
    .catch(error => {
      console.error('Error deleting committee member:', error);
    });
  }
}
};
</script>
<style>
.card-container {
display: flex;
flex-wrap: wrap;
gap: 16px;
}

.card {
background-color: rgb(2, 2, 2);
border: 1px solid #ccc;
border-radius: 8px;
padding: 16px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
flex: 1 1 calc(33.333% - 32px);
box-sizing: border-box;
text-align: center;
}

.card h3 {
margin: 0;
font-size: 1.5em;
}

.card button {
background-color: red;
color: white;
border: none;
border-radius: 4px;
padding: 8px 16px;
cursor: pointer;
margin-top: 10px;
}

.card button:hover {
background-color: darkred;
}
</style>
