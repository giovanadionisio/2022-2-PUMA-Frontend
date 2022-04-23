<template src="./ViewMyProject.html"></template>

<script src="./ViewMyProject.js"></script>

<style src="./ViewMyProject.css" scoped></style>

<style lang="css" scoped>
.multiselect-custom >>> .multiselect__tag {
    background: #2c496e;
    font-weight: bold;
    font-size: 16px;
}

.multiselect-custom >>> .multiselect__tags {
    border: 1px solid #ced4da;
}

.multiselect-custom-error >>> .multiselect__tags {
    border: 1px solid #dc3545;
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
