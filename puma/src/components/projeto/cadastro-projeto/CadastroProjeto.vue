<template src="./cadastro-projeto.html"></template>

<script src="./cadastro-projeto.js"></script>

<style src="./cadastro-projeto.css" scoped></style>

<style lang="css" scoped>
.multiselect-custom >>> .multiselect__tag {
    background: #2c496e;
    font-weight: bold;
    font-size: 16px;
}

.multiselect-custom >>> .multiselect__tags {
    border: 2px solid #15355e;
}

.multiselect-custom-hover >>> .multiselect__tags:hover {
    border: 2px solid #f7db36;
}

.multiselect-custom-error >>> .multiselect__tags {
    border: 2px solid #EB0600;
}

.multiselect-custom >>> .multiselect__tag-icon {
    background: #2c496e;
    line-height: 25px;
}

.multiselect-custom >>> .multiselect__tag-icon:hover {
    background: #15355e;
}

.multiselect-custom >>> .multiselect__tag-icon:after {
    content: "\D7";
    color: #ccc;
    font-size: 16px;
}

.multiselect-custom >>> .multiselect__tag-icon:hover:after {
    color: #fff;
}

.multiselect-custom >>> .multiselect__select {
    background: transparent !important;
}
</style>
