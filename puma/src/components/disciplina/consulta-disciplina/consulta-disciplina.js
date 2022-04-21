import ProjectService from '../../../services/ProjectService';
import ModalAviso from '../../shared/modal-aviso/ModalAviso.vue';
/* eslint-disable*/
export default {
  name: 'ConsultaDisciplinas',
  components: {ModalAviso},
  data() {
    return {
      data: {
        columns: [
          {
            label: 'ITEM',
            field: 'subjectid',
            sort: 'asc',
          },
          {
            label: 'TÍTULO',
            field: 'name',
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
      isDeletingSubject: false,
      currentSubject: '',
      subjects: [],
      projectService: new ProjectService(),
      operacao: '',
    };
  },
  watch: {
    $route: {
      handler: 'getSubjects',
      immediate: true,
    },
  },
  beforeMount() {
    this.getSubjects();
  },
  mounted() {
    document.title = 'PUMA | Consulta Disciplinas';
  },
  methods: {
    getSubjects() {
      this.isLoading = true;
      // this.operacao = this.$route.path.slice(1);
      this.projectService.getSubjects().then((response) => {
        this.subjects = response.data;
        if (!response.data.length) { delete this.data.columns[0][2]; }
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
        this.configAddProjectButton(document.getElementsByTagName('input')[0]);
        this.isLoading = false;
      }).catch((error) => {
        alert(error);
        this.isLoading = false;
      });
    },
    configTableRows() {
      this.subjects.forEach((subject) => {
        const row = subject;
        row.buttons = '<button name="visualizar" class="btn mr-2" id=' + subject.subjectid + '><i class="fa-solid fa-circle-info mr-2"></i>VER DETALHES</button><button name="excluir" class="btn mr-2" id=' + subject.subjectid + '><i class="fa-solid fa-trash mr-2"></i>EXCLUIR</button>';
        this.data.rows.push(row);
      });
    },
    configTable() {
      const table = document.getElementsByTagName('table')[0];
      table.deleteTFoot();
      table.id = 'subjects-table';

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
    },
    configSearchInput() {
      const searchInput = document.getElementsByTagName('input')[0];
      searchInput.placeholder = 'Pesquise por item ou título';
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
      if (!document.getElementById('btn-add-subject')) {
        const addSubjectButton = document.createElement('button');
        addSubjectButton.classList.add('btn', 'mt-3', 'col-md-8');
        addSubjectButton.innerHTML = '<i class="fa-solid fa-plus-circle mr-2 add-project"></i>ADICIONAR DISCIPLINA';
        addSubjectButton.name = 'cadastrar';
        addSubjectButton.id = 'btn-add-subject';
        addSubjectButton.addEventListener('click', () => {
          this.$router.push({ path: `/disciplinas/cadastrar` }).catch(() => {});
        });
        searchInput.after(addSubjectButton);
      }
    },
    addTdListener() {
      document.querySelector('#subjects-table tbody').addEventListener('click', (event) => {
        const button = event.target;
        const operacao = button.name;
        if (button.id && operacao !== 'excluir') {
          this.$router.push({ path: `/disciplinas/${operacao}/${button.id}` }).catch(() => {});
        } else if (operacao === 'excluir') {
          this.currentSubject = { subjectid: button.id };
          this.$refs['modal-confirmacao-exclusao'].show();
        }
      });
    },
    deleteSubject(bvModalEvent) {
      this.isDeletingSubject = true;
      document.getElementsByClassName('close text-light')[0].remove();
      bvModalEvent.preventDefault();
      this.projectService.deleteSubject(this.currentSubject.subjectid).then(() => {
        this.$refs['modal-confirmacao-exclusao'].hide();
        this.isDeletingSubject = false;
        this.getSubjects();
      }).catch((error) => {
        this.isDeletingSubject = false;
        alert(error);
      });
    },
    markThsAsTouched() {
      if (document.getElementsByTagName('td')[0] && document.getElementsByTagName('td')[6]) {
        const firstValue = Number(document.getElementsByTagName('td')[0].textContent);
        const secondValue = Number(document.getElementsByTagName('td')[6].textContent);
        if (firstValue > secondValue) {
          document.getElementsByTagName('th')[0].dispatchEvent(new MouseEvent('dblclick'));
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
