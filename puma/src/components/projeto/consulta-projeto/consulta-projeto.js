import ProjectService from '../../../services/projectService';

const statusProjetoEnum = require('../../../../utils/enums/status-projeto.enum');

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
            sort: 'desc',
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
      projects: [],
      aux: [],
      projectService: new ProjectService(),
    };
  },
  beforeMount() {
    this.getProjects();
  },
  mounted() {
    console.log(this.$route);
    console.log(statusProjetoEnum('SB'));
  },
  methods: {
    getProjects() {
      this.isLoading = true;
      this.projectService.getMyProposals().then((response) => {
        console.log(response.data);
        this.projects  = response.data;
        this.configProjectButtons();
        this.configSearchDiv();
        this.configSearch(this.configSearchInput(), this.configSearchIcon());
        this.configTable();
        this.isLoading = false;
      }).catch((error) => {
        alert(`Infelizmente houve um erro ao recuperar os projetos: ${error}`);
      });
    },
    configProjectButtons() {
      this.projects.forEach((project) => {
        const row = project;
        row.etapa = project.status === 'IC' || project.status === 'EX' || project.status === 'EC' ? 'Projeto' : 'Proposta';
        row.status = statusProjetoEnum(project.status);
        row.name = project.name.slice(0,20);
        row.buttons = '<button name="visualizar" class="btn  mr-2" id='+ project.projectid +'><i class="fa-solid fa-circle-info mr-2"></i>VER DETALHES</button> <button name="excluir" class="btn mr-2"><i class="fa-solid fa-trash mr-2"></i>EXCLUIR</button><button name="editar" class="btn" id='+ project.projectid +'><i class="fa-solid fa-edit mr-2"></i>EDITAR</button>';
        this.data.rows.push(row);
      });
    },
    configTable() {
      const table = document.getElementsByTagName('table');
      const headerDiv = document.getElementsByClassName('col-sm-6 col-md-8')[0];
      headerDiv.remove();
      table[0].deleteTFoot();
      table[0].style.textAlign = 'center';
      table[0].id = 'projects-table';
      this.addTdListener();
    },
    configSearchDiv() {
      const inputDiv = document.getElementsByClassName('dataTables_filter float-right pb-2 mt-4 pt-2')[0];
      inputDiv.classList.remove('float-right');
      inputDiv.classList.add('ml-4');
      inputDiv.classList.add('input-group');
    },
    configSearchInput() {
      const searchInput = document.getElementsByTagName('input')[0];
      searchInput.placeholder = 'Pesquise por item, título do projeto, status...';
      // searchInput.setAttribute('value', 'math');
      // searchInput.dispatchEvent(new Event('input'));
      searchInput.classList.add('search-input');
      return searchInput;
    },
    configSearchIcon() {
      const searchIcon = document.createElement("i");
      searchIcon.classList.add('fas');
      searchIcon.classList.add('fa-search');
      searchIcon.classList.add('input-group-prepend');
      searchIcon.classList.add('search-icon');
      return searchIcon;
    },
    configSearch(searchInput, searchIcon) {
      searchInput.after(searchIcon);
    },
    addTdListener() {
      document.querySelector("#projects-table tbody").addEventListener("click", (event) => {
        const button = event.target;
        const operacao = button.name;
        console.log(button.name);
        if (button.id && operacao !== 'excluir') { this.$router.push(`/projetos/${operacao}/${button.id}`); }
      });
    },
  },
};
