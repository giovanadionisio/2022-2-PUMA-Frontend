/* eslint-disable */

export default {
    name: 'ViewMyProject',
    props: {},
    data() {
        return {
            disabled: true,
            editable: false,
            initialForm: {
                project: {
                    projectId: 0,
                    name: 'Melhorar o controle de estoque da padaria Sonho Bom',
                    createdAt: '',
                    problem: 'Eu não consigo controlar o estoque da padaria, então alguns itens acabam estragando, outros faltam e também não consigo mensurar a demanda. Eu sei quais são os meses que mais vendem, mas não exatamente a quantidade.',
                    expectedResult: 'Espero ter uma noção, uma quantidade média da demanda da minha empresa, saber qual é o giro de estoque também para enfim conseguir reduzir os desperdícios e quero também qual é a produção recomendada.',
                    status: 'SB',
                    feedback: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet',
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
            },
            form: {},
            keywords: [
                { value: 0, text: 'Vue.js' },
                { value: 1, text: 'Javascript' },
                { value: 2, text: 'Open Source' }
            ],
        };
    },
    async created() {
        this.form = JSON.parse(JSON.stringify(this.initialForm));
        await this.handleLoadData();
        this.editable = ['SB'].includes(this.form.project.status);
    },
    methods: {
        toggleEnableForm: function () {
            this.disabled = !this.disabled;
        },
        isChecked: function (keyword) {
            return this.form.selectedKeywords.find((k) => k.value === keyword.value);
        },
        hasFeedback: function () {
            return ['AC', 'RC', 'IC', 'EX', 'EC'].includes(this.form.project.status);
        },
        makeToast: function (title, message, variant) {
            this.$bvToast.toast(message, { title: title, variant: variant, solid: true });
        },
        handleLoadData: async function () {
            const projectId = this.$route.params.id;
            this.$store.commit('OPEN_LOADING_MODAL', { title: 'Carregando...' });
            // 1. request and set all keywords
            // 2. request and set project (projectId) in this.initialForm and this.form
            await new Promise(resolve => setTimeout(resolve, 3000));
            this.$store.commit('CLOSE_LOADING_MODAL');
        },
        handleSubmit: async function () {
            try {
                this.$store.commit('OPEN_LOADING_MODAL', { title: 'Salvando...' });
                // request to update api
                await new Promise(resolve => setTimeout(resolve, 3000));
                this.$store.commit('CLOSE_LOADING_MODAL');
                await this.$router.push({ path: `/meus-projetos` });
                this.makeToast('Sucesso', 'Operação realizada com sucesso', 'success');
            } catch (error) {
                this.$store.commit('CLOSE_LOADING_MODAL');
                this.makeToast('Erro', 'Falha ao realizar operação', 'danger');
            }
        },
        handleCancelEdit: function () {
            this.form = JSON.parse(JSON.stringify(this.initialForm));
            this.toggleEnableForm();
        },
        handleDelete: async function () {
            try {
                this.$store.commit('CLOSE_CONFIRM_MODAL');
                this.$store.commit('OPEN_LOADING_MODAL', { title: 'Excluindo...' });
                // request to delete api
                await new Promise(resolve => setTimeout(resolve, 3000));
                this.$store.commit('CLOSE_LOADING_MODAL');
                await this.$router.push({ path: `/meus-projetos` });
                this.makeToast('Sucesso', 'Operação realizada com sucesso', 'success');
            } catch (error) {
                this.$store.commit('CLOSE_LOADING_MODAL');
                this.makeToast('Erro', 'Falha ao realizar operação', 'danger');
            }
        },
        handleDeleteProject: function () {
            this.$store.commit('OPEN_CONFIRM_MODAL', {
                title: 'Excluir Projeto',
                content: 'Você tem certeza que deseja confirmar a exclusão do projeto ?',
                okButton: {
                    text: 'Confirmar', variant: 'danger',
                    onClick: () => this.handleDelete(),
                },
                cancelButton: {
                    text: 'Cancelar', variant: 'outline-danger',
                    onClick: () => this.$store.commit('CLOSE_CONFIRM_MODAL'),
                },
            });
        },
    },
}