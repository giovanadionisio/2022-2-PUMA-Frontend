/* eslint-disable */
import ItemMenuLateral from "./item-menu-lateral/ItemMenuLateral.vue";
import USER_CONST from '../../../utils/enums/users.enum.js';
import NAV_CONST from '../../../utils/enums/navigations.enum.js';

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
                    key: NAV_CONST.ADMIN_PROJECTS,
                    title: 'Projetos',
                    iconUrl: require('@/assets/menu-2.svg'),
                    show: () => { return this.user.isAdmin },
                    onclick: () => {
                        this.$store.commit('SET_CURRENT_NAVIGATION', NAV_CONST.ADMIN_PROJECTS);
                        this.$router.push('/projetos').catch(() => {});
                    },
                },
                subjectProjects: {
                    key: NAV_CONST.SUBJECT_PROJECTS,
                    title: 'Projetos das Disciplinas',
                    iconUrl: require('@/assets/menu-2.svg'),
                    show: () => { return [USER_CONST.TYPES.PROFESSOR.KEY].some((type) => type === this.user.type); },
                    onclick: () => {
                        this.$store.commit('SET_CURRENT_NAVIGATION', NAV_CONST.SUBJECT_PROJECTS);
                        this.$router.push({path: '/projetos-disciplina'}).catch(() => {});
                    },
                },
                myProjects: {
                    key: NAV_CONST.MY_PROJECTS.KEY,
                    title: 'Meus Projetos',
                    iconUrl: require('@/assets/menu-1.png'),
                    show: () => { return true },
                    onclick: () => {
                        this.$store.commit('SET_CURRENT_NAVIGATION', NAV_CONST.MY_PROJECTS.KEY);
                        this.$router.push({ path: '/meus-projetos'}).catch(() => {});
                    },
                },
                subjects: {
                    key: NAV_CONST.SUBJECTS.KEY,
                    title: 'Disciplinas',
                    iconUrl: require('@/assets/subjects.png'),
                    show: () => { return true },
                    onclick: () => {
                        this.$store.commit('SET_CURRENT_NAVIGATION', NAV_CONST.SUBJECTS.KEY);
                        this.$router.push({ path: '/disciplinas'}).catch(() => {});
                    },
                },
                logout: {
                    title: 'Sair',
                    iconUrl: require('@/assets/menu-3.svg'),
                    show: () => { return true },
                    onclick: () => {
                        this.$store.commit('RESET_NAVIGATION_STATE');
                        this.$store.commit('RESET_USER_STATE');
                        this.$router.push({path: '/usuario/login'}).catch(() => {});
                    },
                }
            }
        };
    },
    methods: {
        redirectToUserProjects() {
            this.$store.commit('SET_CURRENT_NAVIGATION', NAV_CONST.MY_PROJECTS.KEY);
            this.$router.push({ path: '/meus-projetos'}).catch(() => {});
        }
    },
};
