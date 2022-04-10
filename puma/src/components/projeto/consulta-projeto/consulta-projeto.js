import ProjectService from '../../../services/ProjectService';

const statusProjetoEnum = require('../../../utils/enums/status-projeto.enum');

/* eslint-disable*/
export default {
  name: 'ConsultaProjetos',
  data() {
    return {
      data: {
        columns: [
          {
            label: 'ITEM',
            field: 'projectid',
            sort: 'asc',
          },
          {
            label: 'TÍTULO',
            field: 'name',
            sort: 'desc',
          },
          {
            label: 'AUTOR',
            field: 'fullname',
            sort: 'desc',
          },
          {
            label: 'STATUS',
            field: 'status',
            sort: 'desc',
          },
          {
            label: 'DISCIPLINA',
            field: 'subject',
            sort: 'desc',
          },
          {
            label: '',
            field: 'buttons',
          },
        ],
        rows: [],
      },
      isLoading: false,
      wasLoaded: false,
      projects: [],
      projectService: new ProjectService(),
    };
  },
  watch: {
    '$route': {
      handler: 'getProjects',
      immediate: true,
    }
  },
  beforeMount() {
    this.getProjects();
  },
  mounted() {
    document.title = 'PUMA | Consulta Projetos';
  },
  methods: {
    getProjects() {
      this.isLoading = true;
      let user = this.$store.getters.user;
      user.operation = this.$route.path.slice(1);
      this.projectService.getMyProposals(user).then((response) => {
        this.projects = response.data;
        this.data.rows.splice(0);
        this.configTableRows();
        if (!this.wasLoaded) {
          this.configSearchDiv();
          this.configSearch(this.configSearchInput(), this.configSearchIcon());
          this.configTable();
          this.wasLoaded = true;
        }
        this.markThsAsTouched();
        this.setSvgStyles();
        this.isLoading = false;
      }).catch((error) => {
        alert(`Infelizmente houve um erro ao recuperar os projetos: ${error}`);
        this.isLoading = false;
      });
    },
    configTableRows() {
      this.projects.forEach((project) => {
        const row = project;
        row.etapa = project.status === 'IC' || project.status === 'EX' || project.status === 'EC' ? 'Projeto' : 'Proposta';
        row.status = statusProjetoEnum(project.status);
        row.name = project.name.slice(0,20);
        row.buttons = '<button name="visualizar" class="btn mr-2" id='+ project.projectid +'><i class="fa-solid fa-circle-info mr-2"></i>VER DETALHES</button>';
        this.data.rows.push(row);
      });
    },
    configTable() {
      const table = document.getElementsByTagName('table')[0];
      table.deleteTFoot();
      table.id = 'projects-table';

      const headerDiv = document.getElementsByClassName('col-sm-6 col-md-8')[0];
      headerDiv.remove();

      this.addTdListener();
    },
    configSearchDiv() {
      const inputDiv = document.getElementsByClassName('dataTables_filter')[0];
      inputDiv.classList.remove('float-right');
      inputDiv.classList.add('ml-4');
      inputDiv.classList.add('input-group');
      inputDiv.style.flexDirection = 'column';

      this.configAddProjectButton(document.getElementsByTagName('input')[0]);
    },
    configSearchInput() {
      const searchInput = document.getElementsByTagName('input')[0];
      searchInput.placeholder = 'Pesquise por item, título do projeto, status...';
      // searchInput.setAttribute('value', 'math');
      // searchInput.dispatchEvent(new Event('input'));
      searchInput.classList.add('search-input');
      searchInput.style.width = '100%';
      return searchInput;
    },
    configSearchIcon() {
      const searchIcon = document.createElement('i');
      searchIcon.classList.add('fas');
      searchIcon.classList.add('fa-search');
      searchIcon.classList.add('input-group-prepend');
      searchIcon.classList.add('search-icon');
      return searchIcon;
    },
    configSearch(searchInput, searchIcon) {
      searchInput.after(searchIcon);
    },
    configAddProjectButton(searchInput) {
      const addProjectButton = document.createElement('button');
      addProjectButton.classList.add('btn', 'mt-3', 'col-md-8');
      addProjectButton.innerHTML = '<i class="fa-solid fa-plus-circle mr-2 add-project"></i>ADICIONAR PROJETO';
      addProjectButton.name = 'cadastrar';
      addProjectButton.addEventListener('click', () => {
        let routeData = this.$router.resolve({path: `/projetos/cadastrar`});
        window.open(routeData.href, '_blank');
      });
      searchInput.after(addProjectButton);
    },
    addTdListener() {
      document.querySelector("#projects-table tbody").addEventListener("click", (event) => {
        const button = event.target;
        const operacao = button.name;
        if (operacao === 'cadastrar') {
          let routeData = this.$router.resolve({path: `/projetos/cadastrar`});
          window.open(routeData.href, '_blank');
        } else if (button.id && operacao !== 'excluir') {
          let routeData = this.$router.resolve({path: `/projetos/${operacao}/${button.id}`});
          window.open(routeData.href, '_blank');
        }
      });
    },
    markThsAsTouched() {
      if (document.getElementsByTagName('td')[0] && document.getElementsByTagName('td')[6]) {
          const firstValue = Number(document.getElementsByTagName('td')[0].textContent);
          const secondValue = Number(document.getElementsByTagName('td')[6].textContent);
          if (firstValue > secondValue) {
            document.getElementsByTagName('th')[0].dispatchEvent(new MouseEvent("dblclick"));
          } else {
            document.getElementsByTagName('th')[0].click();
          }
      }
    },
    setSvgStyles() {
      const svgs = document.getElementsByTagName('svg');
      if (svgs.item(3) && svgs.item(7)) {
        svgs.item(3).style.marginLeft = '15px';
        svgs.item(7).style.marginLeft = '15px';
      }
    },
  },
};
