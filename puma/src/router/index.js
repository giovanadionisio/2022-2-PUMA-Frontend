import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/usuario/cadastro',
    name: 'Cadastro Usuário',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/usuario/cadastro-usuario/CadastroUsuario.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/login',
    name: 'Entrar',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/usuario/login-usuario/LoginUsuario.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/recoveryPassword',
    name: 'Recuperação Senha',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/usuario/recovery-password/RecoveryPassword.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/newPassword',
    name: 'Nova Senha',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/usuario/new-password/NewPassword.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/evaluate/:subjectId',
    name: 'Evaluate',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/Evaluate/Evaluate.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/approval/:projId',
    name: 'Approval',
    props: true,
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../views/Approval/Approval.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projeto/cadastro',
    name: 'Cadastro de Projeto',
    component: () => import('../views/cadastroProjeto/cadastro-projeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/myProposals',
    name: 'My Proposals',
    component: () => import('../views/myProposals/myProposals.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/usuario/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (!store.getters.isAuthenticated) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router;
