/* eslint-disable */

export default {
    name: 'MenuItem',
    props: {
        props: { type: Object },
    },
    mounted() {
        // console.log(this.props.show());
    },
    data() {
        return {
            selected: this.props.key === this.$store.getters.currentNavigation,
            hasAccess: this.props.show(),
        }
    },
    watch: {
        '$store.getters.currentNavigation': function () {
            this.selected = this.props.key === this.$store.getters.currentNavigation;
        }
    }
};
