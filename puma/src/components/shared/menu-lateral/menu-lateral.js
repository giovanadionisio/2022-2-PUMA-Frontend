/* eslint-disable */
import ItemMenuLateral from "./item-menu-lateral/ItemMenuLateral.vue";
import USER_CONST from '../../../utils/enums/users.enum.js';

export default {
    name: 'MenuLateral',
    components: {
        ItemMenuLateral,
    },
    props: {},
    data() {
        return {
            user: this.$store.getters.user,
            menuItems: {
                adminProjects: {
                    basePath: '/projetos-plataforma',
                    title: 'Projetos',
                    iconUrl: require('@/assets/menu-2.svg'),
                    show: () => { return this.user.isAdmin },
                    onclick: () => {
                        this.$router.push({ path: '/projetos-plataforma' });
                    },
                },
                subjectProjects: {
                    basePath: '/projetos-disciplina',
                    title: 'Projetos das Disciplinas',
                    iconUrl: require('@/assets/menu-2.svg'),
                    show: () => { return [USER_CONST.TYPES.PROFESSOR.KEY].some((type) => type === this.user.type); },
                    onclick: () => {
                        this.$router.push({ path: '/projetos-disciplina' });
                    },
                },
                myProjects: {
                    basePath: '/meus-projetos',
                    title: 'Meus Projetos',
                    iconUrl: require('@/assets/menu-1.png'),
                    show: () => { return true; },
                    onclick: () => {
                        this.$router.push({ path: '/meus-projetos' });
                    },
                },
                subjects: {
                    basePath: '/disciplinas',
                    title: 'Disciplinas',
                    iconUrl: require('@/assets/subjects.png'),
                    show: () => { return [USER_CONST.TYPES.PROFESSOR.KEY].some((type) => type === this.user.type); },
                    onclick: () => {
                        this.$router.push({ path: '/disciplinas' });
                    },
                },
                keywords: {
                    basePath: '/palavras-chave',
                    title: 'Palavras-Chave',
                    iconUrl: require('@/assets/menu-4.svg'),
                    show: () => { return [USER_CONST.TYPES.PROFESSOR.KEY].some((type) => type === this.user.type); },
                    onclick: () => {
                        this.$router.push({ path: '/palavras-chave' });
                    },
                },
                logout: {
                    title: 'Sair',
                    iconUrl: require('@/assets/menu-3.svg'),
                    show: () => { return true },
                    onclick: () => {
                        this.$store.commit('RESET_USER_STATE');
                        this.$router.push({ path: '/usuario/login' });
                    },
                }
            }
        };
    },
    methods: {
        redirectToUserProjects() {
            this.$router.push({ path: '/meus-projetos' });
        }
    },
};
