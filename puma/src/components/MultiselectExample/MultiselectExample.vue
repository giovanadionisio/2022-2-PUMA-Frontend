<template src="./MultiselectExample.html"></template>

<script src="./MultiselectExample.js"></script>

<style src="./MultiselectExample.css" scoped></style>

<style lang="css" scoped>
.multiselect-custom >>> .multiselect__tag {
    background: #2c496e;
    font-weight: bold;
    font-size: 16px;
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
</style>
