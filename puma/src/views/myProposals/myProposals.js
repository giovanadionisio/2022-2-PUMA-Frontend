import ProjectService from '../../services/projectService';
import ProjectCard from '../../components/ProjectCard.vue';

const projectService = new ProjectService();

export default {
  components: {
    ProjectCard,
  },
  name: 'Approval',
  data() {
    return {
      projs: [],
    };
  },
  methods: {
    goToNewProposal() {
      this.$router.push({ name: 'Cadastro de Projeto' });
    },
  },
  created() {
    projectService.getMyProposals().then((response) => {
      response.data.forEach((project) => {
        this.projs.push({ ...project, is_last: false, submit: { apply() {} } });
      });
      this.projs.push({ is_last: true, submit: this.goToNewProposal });
    });
  },
};
