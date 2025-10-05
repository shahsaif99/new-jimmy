<template>
    <b-modal
        cancel-variant="outline-secondary"
        centered
        :hide-footer="true"
        title="Add Task"
        size="lg"
        class="modal-is-add-document-active"
        id="is-add-document-active"
        :visible="showAddTaskDialog"
        :hide-header="true"
        @hide="onModalHide"
    >
        <input
            class="w-100 sub-heading my-1 check-input"
            type="text"

            placeholder="Name your task or work order"
            required
        />
    </b-modal>
</template>
<script>
import {
    BDropdown,
    BIcon,
    BDropdownItem,
    BCalendar,
    BButton,
    BCollapse,
} from "bootstrap-vue";

import useTasks from "@/composables/tasks";

export default {
    components: {
        BDropdown,
        BDropdownItem,
        BIcon,
        BCalendar,
        BButton,
        BCollapse,
    },

    setup() {
        const { showAddTaskDialog } = useTasks();
        const onModalHide = (event) => {
            event.preventDefault();
        };
        return { onModalHide, showAddTaskDialog };
    },
};
</script>
<style scoped>
.svg-icon {
    background: #0096fd;
    padding: 10px;
    fill: white;
    border-radius: 5px;
    max-width: 60px;
    min-width: 50px;
}
.title-icon {
    height: 100% !important;
    width: 100% !important;
    max-width: 100%;
    position: absolute;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
}
.task-div {
    padding: 10px;
    border: 2px solid darkgrey;
}
.border-bottom-zero {
    border-bottom: 0 !important;
}

.menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 999;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 5px;
    width: 300px;
}
.menu ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.menu li {
    padding: 5px 0;
    cursor: pointer;
}
.menu li:hover {
    background-color: #f0f0f0;
}
.alphabet-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.alphabet-grid .item {
    width: calc(16.666% - 20px);
    margin-bottom: 20px;
    text-align: center;
    padding: 2px;
    border-radius: 5px;
}
.alphabet-grid .item:hover {
    color: brown;
}
.search-box {
    width: 100%;
    height: 50px;
    padding-left: 10px;
    border-radius: 10px;
    border: 1px solid darkgray;
}
.user-name {
    font-size: 20px;
    font-weight: 500;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}
.user-name:hover {
    background: #f7f7f7;
}
.add-item {
    border-radius: 5px !important;
    cursor: pointer;
}
.assign-sub-titles {
    font-size: larger;
}
textarea {
    min-height: 100px;
    width: 100%;
    padding-left: 10px;
    font-size: large;
    font-weight: bolder;
}
.dlt-img {
    right: 20px;
    top: 5px;
    color: white;
    cursor: pointer;
    font-weight: 900;
}

.img-div:hover .assign-img {
    opacity: 0.3;
}
.img-div:hover .dlt-img {
    font-size: larger;

    color: red !important;
}
.sub-heading {
    border: none;
    border-bottom: 1px solid gray;
    background: transparent;
    height: 40px;
    font-size: x-large;
    margin-top: 5px;
}
.sub-heading:focus-visible {
    border: none;
    border-bottom: 1px solid #0096fd;
    outline: none;
}
@media (max-width: 617px) {
    .due-menu {
        right: 1px;
    }
}
</style>
<style lang="scss">
.add-team {
    border: 3px dotted darkgrey !important;
}

.add-team {
    button {
        border: 0px !important;
    }
}
</style>
<style lang="scss" scoped>
@import "~@core/scss/base/bootstrap-extended/include";
@import "~@core/scss/base/components/variables-dark";
.dark-layout {
    .bi-grip-vertical {
        color: white;
    }
    .check-input {
        color: white;
    }
    .menu {
        color: #b4b7bd;
        background: #283046;
    }
    .user-name {
        background-color: #283046 !important;
    }
    .user-name:hover {
        background-color: rgba(115, 103, 240, 0.12) !important;
    }
    .bi-check2 {
        color: yellow !important;
    }
    input {
        background-color: #283046 !important;
        color: white;
    }
    textarea {
        background-color: #283046 !important;
        color: white;
    }
}
</style>
