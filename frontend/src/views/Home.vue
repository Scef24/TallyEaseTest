<template>
    <div class="container">
      <header class="header">
        <h1>Student Dashboard</h1>
        <router-link to="/Login" class="nav-link">Login as admin?</router-link>
      </header>
      <table>
        <thead>
          <tr>
            <th>Standing</th>
            <th>Course</th>
            <th>Gold</th>
            <th>Silver</th>
            <th>Bronze</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.standing }}</td>
            <td>{{ student.course }}</td>
            <td>
              <span v-for="n in student.gold" :key="'gold-' + n" class="medal gold">
                <i class="fas fa-medal"></i>
              </span>
            </td>
            <td>
              <span v-for="n in student.silver" :key="'silver-' + n" class="medal silver">
                <i class="fas fa-medal"></i>
              </span>
            </td>
            <td>
              <span v-for="n in student.bronze" :key="'bronze-' + n" class="medal bronze">
                <i class="fas fa-medal"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        students: [
          { id: 1, standing: 1, course: 'BSIT', gold: 2, silver: 1, bronze: 0 },
          { id: 2, standing: 2, course: 'BSHM', gold: 1, silver: 2, bronze: 1 },
        
        ]
      };
    }
  };
  </script>
  
  <style scoped lang = "scss">
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: rgb(39,39,57);
    background: linear-gradient(90deg, rgba(39,39,57,1) 0%, rgba(30,39,68,1) 56%, rgba(10,10,78,1) 98%);
    color: white;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  h1 {
    margin: 0;
    font-size: 2.5em;
    text-align: center;
    color: #fff;
  }
  
  .nav-link {
    text-decoration: none;
    color: #646cff;
    font-weight: 600;
  }
  
  .nav-link:hover {
    color: #535bf2;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #1a1a1a;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #333;
  }
  
  th {
    background-color: #2a2a2a;
    color: #f1f1f1;
    text-transform: uppercase;
  }
  
  tr:nth-child(even) {
    background-color: #252323;
  }
  
  tr:hover {
    background-color: #251c8e;
  }
  
  .medal {
    margin-right: 5px;
  }
  
  .medal.gold i {
    color: gold !important;
  }
  
  .medal.silver i {
    color: silver !important;
  }
  
  .medal.bronze i {
    color: #cd7f32 !important;
  }
  </style>
  