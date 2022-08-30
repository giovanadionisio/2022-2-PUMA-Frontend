import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';
import ObjetoDisciplina from './ObjetoDisciplina/ObjetoDisciplina.vue';

export default {
  components: {
    AreaExternaHeader,
    ObjetoDisciplina,
  },

  data() {
    return {
      paginaAtual: '/home/disciplinas',
    };
  },
};
