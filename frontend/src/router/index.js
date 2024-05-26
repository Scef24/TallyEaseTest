import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import ManageGames from '../views/ManageGames.vue';
import ManageCommittees from '../views/ManageCommittees.vue';
import GameList from '../views/GameList.vue';
import CommitteeList from '../views/committeeList.vue'; 
import axios from '../axios';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }, 
    children: [
      { path: 'games', name: 'ManageGames', component: ManageGames },
      { path: 'committees', name: 'ManageCommittees', component: ManageCommittees },
      { path: 'gamelist', name: 'GameList', component: GameList },
      { path: 'committeelist', name: 'CommitteeList', component: CommitteeList } 
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
