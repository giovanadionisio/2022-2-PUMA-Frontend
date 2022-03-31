/* eslint-disable */

const getDefaultState = () => ({
    currentNavigation: null,
});

export default {
    // namespaced: true,
    state: getDefaultState,
    mutations: {
        SET_CURRENT_NAVIGATION(state, currentNav) {
            state.currentNavigation = currentNav;
        },
        RESET_NAVIGATION_STATE(state) {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {},
    getters: {
        currentNavigation: (state) => state.currentNavigation,
    },
};
