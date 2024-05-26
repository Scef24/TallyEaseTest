<template>
    <div>
      <h1>Manage Committees</h1>
      <h1 v-if="showNotification">{{ notificationMessage }}</h1>
      <form @submit.prevent="addCommittee">
        <label for="name">Name</label>
        <input type="text" v-model="name" id="" required>
        <br>
        <label for="email">Username</label>
        <input type="email" v-model="email" required>
        <br>
        <label for="password">Password</label>
        <input type="password" v-model="password" required>

        <button type="submit">Add Committee</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'ManageCommittees',
    data(){
      return{
        name:'',
        email:'',
        password:'',
        role:'committee',
        showNotification:false,
        notificationMessage:''
      }
    },
    methods:{
      async addCommittee(){
        try{
          const token = localStorage.getItem('token')
          const response = await axios.post('http://127.0.0.1:8000/api/committees',{
            name: this.name,
            email:this.email,
            password:this.password,
            role:this.role
          },{
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Content-type' :'application/json'
            }
          })
          console.log('You added a Committee Successfully')
          this.name = '',
          this.email = '',
          this.password = '',
     
          
          setTimeout(()=>{
            this.showNotification = true;
            this.notificationMessage = 'You added a Committee Succesfully'
          },2000)
        }
     
        catch(error) {
          console.error('Error adding committee',error)
          setTimeout(()=>{
          this.showNotification = true
          this.notificationMessage = 'Fail to Add'
        },2000)
        }
      }
    }
  }
  </script>
  