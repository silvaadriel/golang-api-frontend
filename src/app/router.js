import Vue from 'vue';
import Router from 'vue-router';
import Clients from './views/Clients.vue';
import AddClient from './views/AddClient.vue';
import EditClient from './views/EditClient.vue';

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
    {
      path: '/add-client',
      name: 'add-client',
      component: AddClient,
    },
    {
      path: '/edit-client/:id',
      name: 'edit-client',
      component: EditClient,
    },
  ],
});
