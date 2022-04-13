/* eslint-disable */

export default {
    name: 'MyProject',
    props: {},
    data() {
        return {
            disabled: true,
            subject: {
                subjectId: 0,
                name: 'PLANEJAMENTO E CONTROLE DE PRODUÇÃO',
            },
            user: {
                userId: 0,
                fullName: 'Gustavo Rodrigues',
                email: 'gustavo@email.com',
                phoneNumber: '(61) 99999-9999',
            },
            project: {
                projectId: 0,
                name: 'Melhorar o controle de estoque da padaria Sonho Bom',
                createdAt: '',
                problem: 'Eu não consigo controlar o estoque da padaria, então alguns itens acabam estragando, outros faltam e também não consigo mensurar a demanda. Eu sei quais são os meses que mais vendem, mas não exatamente a quantidade.',
                expectedResult: 'Espero ter uma noção, uma quantidade média da demanda da minha empresa, saber qual é o giro de estoque também para enfim conseguir reduzir os desperdícios e quero também qual é a produção recomendada.',
                status: 'SUBMETIDO',
                feedback: '',
            },
            selectedKeywords: [],
            keywords: [
                { value: 0, text: 'Vue.js' },
                { value: 1, text: 'Javascript' },
                { value: 2, text: 'Open Source' }
            ],
            mainKeyword: {}
        };
    },
    methods: {
        toggleEnableForm: function () {
            this.disabled = !this.disabled;
        },

        handleChangeKeyWords: function () {
            console.log('mainKeyword')
            console.log(this.mainKeyword)
        }
    },
}