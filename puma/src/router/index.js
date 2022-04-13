import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../components/usuario/login-usuario/LoginUsuario.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/login',
    name: 'Entrar',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../components/usuario/login-usuario/LoginUsuario.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/cadastro',
    name: 'Cadastro Usuário',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../components/usuario/cadastro-usuario/CadastroUsuario.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/recuperacao-senha',
    name: 'Recuperação Senha',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../components/usuario/recovery-password/RecoveryPassword.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/usuario/atualizar-senha',
    name: 'Nova Senha',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('../components/usuario/new-password/NewPassword.vue'),
    meta: {
      guest: true,
    },
  },
  {
    path: '/projetos',
    name: 'Consulta de Projetos',
    component: () => import('../components/projeto/consulta-projeto/ConsultaProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos-disciplina',
    name: 'Consulta por Disciplina',
    component: () => import('../components/projeto/consulta-projeto/ConsultaProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/meus-projetos',
    name: 'Meus Projetos',
    component: () => import('../components/projeto/consulta-projeto/ConsultaProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos/visualizar/:id',
    name: 'Visualização de Projeto',
    component: () => import('../components/projeto/cadastro-projeto/CadastroProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos/cadastrar',
    name: 'Cadastro de Projeto',
    component: () => import('../components/projeto/cadastro-projeto/CadastroProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/projetos/editar/:id',
    name: 'Edição de Projeto',
    component: () => import('../components/projeto/cadastro-projeto/CadastroProjeto.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/disciplinas/cadastrar',
    name: 'Cadastro de Disciplina',
    component: () => import('../components/disciplina/cadastro-disciplina/CadastroDisciplina.vue'),
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
