import AreaExternaHeader from '../AreaExternaHeader/AreaExternaHeader.vue';
import ListaDisciplina from './ListaDisciplina/ListaDisciplina.vue';

export default {
  components: {
    AreaExternaHeader,
    ListaDisciplina,
  },

  data() {
    return {
      paginaAtual: '/home/disciplinas',
      listaDisciplinas: [
        {
          subject: {
            name: 'Disciplina PSP1',
            coursesyllabus: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
          },
          keywords: [
            { keyword: '11111111111' },
            { keyword: 'Qualidade de Serviços' },
            { keyword: 'Qualidade de Produto' },
            { keyword: 'ISO 9001' },
          ],
        },
        {
          subject: {
            name: 'Disciplina PSP2',
            coursesyllabus: '222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222',
          },
          keywords: [
            { keyword: '22222222222222' },
            { keyword: 'Qualidade de Serviços' },
            { keyword: 'Qualidade de Produto' },
            { keyword: 'ISO 9001' },
          ],
        },
        {
          subject: {
            name: 'Disciplina PSP3',
            coursesyllabus: '33333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333',
          },
          keywords: [
            { keyword: '33333333333' },
            { keyword: 'Qualidade de Serviços' },
            { keyword: 'Qualidade de Produto' },
            { keyword: 'ISO 9001' },
          ],
        },
        {
          subject: {
            name: 'Disciplina PSP4',
            coursesyllabus: '4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444',
          },
          keywords: [
            { keyword: '4444444444444444' },
            { keyword: 'Qualidade de Serviços' },
            { keyword: 'Qualidade de Produto' },
            { keyword: 'ISO 9001' },
          ],
        },
        {
          subject: {
            name: 'Disciplina PSP5',
            coursesyllabus: '5555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555',
          },
          keywords: [
            { keyword: '55555555555555' },
            { keyword: 'Qualidade de Serviços' },
            { keyword: 'Qualidade de Produto' },
            { keyword: 'ISO 9001' },
          ],
        },
        {
          subject: {
            name: 'Disciplina PSP6',
            coursesyllabus: '6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666',
          },
          keywords: [
            { keyword: '666666666666666666' },
            { keyword: 'Qualidade de Serviços' },
            { keyword: 'Qualidade de Produto' },
            { keyword: 'ISO 9001' },
          ],
        },
        {
          subject: {
            name: 'Disciplina PSP7',
            coursesyllabus: '7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777',
          },
          keywords: [
            { keyword: '77777777777777777' },
            { keyword: 'Qualidade de Serviços' },
            { keyword: 'Qualidade de Produto' },
            { keyword: 'ISO 9001' },
          ],
        },
        {
          subject: {
            name: 'Disciplina PSP8',
            coursesyllabus: '888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888',
          },
          keywords: [
            { keyword: '88888888888888888' },
            { keyword: 'Qualidade de Serviços' },
            { keyword: 'Qualidade de Produto' },
            { keyword: 'ISO 9001' },
          ],
        },
      ],
    };
  },
};
