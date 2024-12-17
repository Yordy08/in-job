import { createRouter, createWebHashHistory } from 'vue-router'

import facturas from '../views/FactuasView.vue'
import domicilios from '../views/DomicilioView.vue'
const routes = [
 
  {
    path: '/',
    name: 'facture',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: facturas
  },
  {
    path: '/domicilios',
    name: 'domicilios', 
    component: domicilios
  },

{

  path: '/analisis',
  name: 'anali',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/AnalissView.vue')
},
{

  path: '/listadomicilio',
  name: 'domicil',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/ListadoDomicilio.vue')
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
