/* eslint-disable */

export default {
    name: 'MyProject',
    props: {},
    data() {
        return {
            editable: false,
            disabled: true,
            currentUserAdmin: false,
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
                status: 'SB',
                feedback: '',
            },
            selectedKeywords: [],
            keywords: [
                { value: 0, text: 'Vue.js' },
                { value: 1, text: 'Javascript' },
                { value: 2, text: 'Open Source' }
            ],
            mainKeyword: {},
            proposes: [
                { value: 0, text: 'Aceitar proposta' },
                { value: 1, text: 'Rejeitar proposta' },
                { value: 2, text: 'Encaminhar proposta para outra disciplina' },
                { value: 3, text: 'Eu não sei para qual disciplina encaminhar' }
            ],
            selectedPropose: null,
            subjects: [
                { value: 0, text: 'Planejamento e Controle de Produçao - PSP 4' },
                { value: 1, text: 'Gestão da Qualidade - PSP 5' },
                { value: 2, text: 'Engenharia de Produto - PSP 6' },
                { value: 3, text: 'Eu não sei para qual disciplina encaminhar' }
            ],
            selectedSubject: null
        };
    },
    created() {
        if (this.project.status === 'SB') {
            this.editable = true;
        } else if (this.project.status === 'RL') {
            this.editable = true;
            this.selectedPropose = 2
        } else if (this.project.status === 'RC') {
            this.editable = false;
            this.selectedPropose = 1
        } else {
            this.editable = false;
            this.selectedPropose = 0;
        }
    },

    methods: {
        toggleEnableForm: function () {
            this.disabled = !this.disabled;
        },
        isChecked: function (keyword) {
            return this.selectedKeywords.find((k) => k.value === keyword.value);
        },
        handleChangeKeyWords: function () { }
    },
}