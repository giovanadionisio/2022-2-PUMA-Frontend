import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';

export default {
  components: {
    AreaExternaHeader,
  },

  data() {
    return {
      paginaAtual: '/home/sobre',
    };
  },

  methods: {
    showInformacao(element) {
      const content = document.getElementById(element);

      if (!content.style.display) {
        if (element === 'primeira-informacao') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      } else if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    },
  },
};
