export default {
  name: 'EvaluateModal',
  props: ['subjectArray', 'submitHandlerNo', 'submitHandlerYes'],
  data() {
    return {
      isChooseSubject: false,
      selected: '',
    };
  },
  methods: {
    sla() {
      this.isChooseSubject = !this.isChooseSubject;
    },
    selectedHandler(selected) {
      this.submitHandlerNo(selected);
      this.$emit('close');
    },
    approveHandler() {
      this.submitHandlerYes();
      this.$emit('close');
    },
  },
};
