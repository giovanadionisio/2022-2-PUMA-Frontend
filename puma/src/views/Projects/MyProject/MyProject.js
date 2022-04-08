/* eslint-disable */

export default {
    name: 'MyProject',
    props: {},
    data() {
        return {
            value: [
                { name: 'Javascript', code: 'js' }
            ],
            options: [
                { name: 'Vue.js', code: 'vu' },
                { name: 'Javascript', code: 'js' },
                { name: 'Open Source', code: 'os' }
            ],
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
            selectedKeywords: [0, 1, 3],
            keywords: [],
        };
    },
    methods: {
        toggleEnableForm: function () {
            this.disabled = !this.disabled;
        }
    },
}