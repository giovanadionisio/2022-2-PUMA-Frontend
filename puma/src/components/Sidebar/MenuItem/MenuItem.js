/* eslint-disable */

export default {
    name: 'MenuItem',
    props: {
        props: { type: Object },
    },
    data() {
        return {
            selected: this.props.key === this.$store.getters.currentNavigation,
            hasAccess: this.props.userTypes.some((type) => type === this.$store.getters.user.type)
        }
    },
    watch: {
        '$store.getters.currentNavigation': function () {
            this.selected = this.props.key === this.$store.getters.currentNavigation;
        }
    }
};