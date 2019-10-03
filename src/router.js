import Vue from 'vue';
import Router from 'vue-router';
import Clients from './views/Clients.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/clients',
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
    },
  ],
});
