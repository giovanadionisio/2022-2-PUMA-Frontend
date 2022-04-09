/* eslint-disable */

export default {
    components: {},
    data() {
        return {
            value: [],
            options: [
                { name: 'Vue.js', code: 'vu', created: true },
                { name: 'Javascript', code: 'js', created: true },
                { name: 'Open Source', code: 'os', created: true }
            ]
        }
    },
    methods: {
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
                created: false,
            }
            this.options.push(tag)
            this.value.push(tag)
        }
    }
}