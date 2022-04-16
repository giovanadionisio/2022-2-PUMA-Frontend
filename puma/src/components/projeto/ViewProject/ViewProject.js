/* eslint-disable */

export default {
    name: 'ViewProject',
    props: {},
    data() {
        return {
            editable: false,
            disabled: true,
            currentUserAdmin: false,
            initialForm: {
                project: {
                    projectId: 0,
                    name: 'Melhorar o controle de estoque da padaria Sonho Bom',
                    createdAt: '',
                    problem: 'Eu não consigo controlar o estoque da padaria, então alguns itens acabam estragando, outros faltam e também não consigo mensurar a demanda. Eu sei quais são os meses que mais vendem, mas não exatamente a quantidade.',
                    expectedResult: 'Espero ter uma noção, uma quantidade média da demanda da minha empresa, saber qual é o giro de estoque também para enfim conseguir reduzir os desperdícios e quero também qual é a produção recomendada.',
                    status: 'RL',
                    feedback: 'Espero ter uma noção, uma quantidade média da demanda da minha empresa, sabe',
                },
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
                mainKeyword: null,
                selectedKeywords: [],
                selectedSubject: null,
                selectedEvaluation: null,
            },
            form: {},
            evaluations: [
                { value: 0, text: 'Aceitar proposta' },
                { value: 1, text: 'Rejeitar proposta' },
                { value: 2, text: 'Encaminhar proposta para outra disciplina' },
                { value: 3, text: 'Eu não sei para qual disciplina encaminhar' }
            ],
            keywords: [
                { value: 0, text: 'Vue.js' },
                { value: 1, text: 'Javascript' },
                { value: 2, text: 'Open Source' }
            ],
            subjects: [
                { value: 0, text: 'Planejamento e Controle de Produçao - PSP 4' },
                { value: 1, text: 'Gestão da Qualidade - PSP 5' },
                { value: 2, text: 'Engenharia de Produto - PSP 6' },
                { value: 3, text: 'Eu não sei para qual disciplina encaminhar' }
            ],
        };
    },
    async created() {
        this.form = JSON.parse(JSON.stringify(this.initialForm));
        await this.handleLoadData();
        this.editable = ['SB', 'RL', 'AL'].includes(this.form.project.status);
    },
    methods: {
        toggleEnableForm: function () {
            this.disabled = !this.disabled;
        },
        isChecked: function (keyword) {
            return this.form.selectedKeywords.find((k) => k.value === keyword.value);
        },
        hasFeedback: function () {
            return ['RL', 'AL', 'AC', 'RC', 'IC', 'EX', 'EC'].includes(this.form.project.status);
        },
        makeToast: function (title, message, variant) {
            this.$bvToast.toast(message, { title: title, variant: variant, solid: true });
        },
        handleLoadData: async function () {
            const projectId = this.$route.params.id;
            this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
            // 1. request and set all keywords
            // 2. request and set all subjects
            // 3. request and set project (projectId) in this.initialForm and this.form
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.$store.commit('CLOSE_LOADING_MODAL');
        },
        handleSubmit: async function () {
            try {
                this.$store.commit('OPEN_LOADING_MODAL', { title: 'Enviando...' });
                let payload = { projectId: this.form.project.projectId, feedback: this.form.project.feedback };
                if (this.form.selectedEvaluation === 0) {
                    payload = { ...payload, status: 'AC' };
                    // request to evaluate api
                } else if (this.form.selectedEvaluation === 1) {
                    payload = { ...payload, status: 'RC' };
                    // request to evaluate api
                } else if (this.form.selectedEvaluation === 2) {
                    payload = { ...payload, status: 'RL', subjectId: this.form.selectedSubject };
                    // request to realocate api
                } else if (this.form.selectedEvaluation === 3) {
                    payload = { ...payload, status: 'AL', subjectId: this.form.selectedSubject };
                    // request to realocate api
                }
                await new Promise(resolve => setTimeout(resolve, 3000));
                this.$store.commit('CLOSE_LOADING_MODAL');
                await this.$router.push({ path: `/projetos-disciplina` });
                this.makeToast('Sucesso', 'Operação realizada com sucesso', 'success');
            } catch (error) {
                this.$store.commit('CLOSE_LOADING_MODAL');
                this.makeToast('Erro', 'Falha ao realizar operação', 'danger');
            }
        },
        handleEvaluate: function () {
            this.form.project.feedback = '';
            this.toggleEnableForm();
        },
        handleCancelEvaluate: function () {
            this.form = JSON.parse(JSON.stringify(this.initialForm));
            this.toggleEnableForm();
        },
    },
}