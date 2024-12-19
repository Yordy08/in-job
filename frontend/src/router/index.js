import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'facturas',  // Cambio de 'facture' a 'facturas'
    component:()=> import ('../views/FactuasView.vue')
  },
  {
    path: '/domicilios',
    name: 'domicilios',
    component: ()=> import ('../views/DomicilioView.vue')
  },
  {
    path: '/analisis',
    name: 'analisis',  // Cambio de 'anali' a 'analisis'
    component: () => import(/* webpackChunkName: "analisis" */ '../views/AnalissView.vue')
  },
  {
    path: '/listadomicilio',
    name: 'listadomicilio',  // Cambio de 'domicil' a 'listadomicilio'
    component: () => import(/* webpackChunkName: "listadomicilio" */ '../views/ListadoDomicilio.vue')
  },
  {
    path: '/egresos',
    name: 'egresos',  // Ruta para los egresos
    component: ()=> import ('../views/EgresosView.vue')
  },
  {
    path: '/admin',
    name: 'admin',  // Ruta para el admin
    component: ()=> import ('../views/AdminDashboard.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
