/* eslint-disable */
import MenuItem from "./MenuItem/MenuItem.vue";
import USER_CONST from '@/constants/users.js';
import NAV_CONST from '@/constants/navigations.js';

export default {
    name: 'Sidebar',
    components: {
        MenuItem,
    },
    props: {},
    data() {
        return {
            menuItems: {
                myprojects: {
                    key: NAV_CONST.MY_PROJECTS.KEY,
                    title: 'Meus Projetos',
                    iconUrl: require('@/assets/menu-1.png'),
                    userTypes: [
                        USER_CONST.TYPES.PHYSICAL_AGENT.KEY,
                        USER_CONST.TYPES.JURIDICAL_AGENT.KEY,
                        USER_CONST.TYPES.PROFESSOR.KEY,
                        USER_CONST.TYPES.STUDENT.KEY,
                        USER_CONST.TYPES.ADMIN.KEY
                    ],
                    onclick: () => {
                        this.$store.commit('SET_CURRENT_NAVIGATION',
                            NAV_CONST.MY_PROJECTS.KEY);
                        this.$router.push('/projetos');
                    },
                },
                projects: {
                    key: NAV_CONST.PROJECTS.KEY,
                    title: 'Projetos das Disciplinas',
                    iconUrl: require('@/assets/menu-2.svg'),
                    userTypes: [
                        USER_CONST.TYPES.PROFESSOR.KEY,
                        USER_CONST.TYPES.ADMIN.KEY
                    ],
                    onclick: () => {
                        this.$store.commit('SET_CURRENT_NAVIGATION',
                            NAV_CONST.PROJECTS.KEY);
                        this.$router.push('/projetos/listar');
                    },
                },
                logout: {
                    title: 'Sair',
                    iconUrl: require('@/assets/menu-3.svg'),
                    userTypes: [
                        USER_CONST.TYPES.PHYSICAL_AGENT.KEY,
                        USER_CONST.TYPES.JURIDICAL_AGENT.KEY,
                        USER_CONST.TYPES.PROFESSOR.KEY,
                        USER_CONST.TYPES.STUDENT.KEY,
                        USER_CONST.TYPES.ADMIN.KEY
                    ],
                    onclick: () => {
                        this.$store.commit('RESET_NAVIGATION_STATE');
                        this.$store.commit('RESET_USER_STATE');
                        this.$router.push('/usuario/login');
                    },
                }
            }
        };
    },
};
