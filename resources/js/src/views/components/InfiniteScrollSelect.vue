<template>
    <div>
        <v-select @search="handleSearch" :clearable="props.clearable" v-model="modelValue"  :options="options" :filterable="false">
            <template #list-footer>
                <li v-if="hasNextPage" class="text-center p-1 ">
                    <button @click="loadMore" :disabled="loading" class="btn btn-outline-primary btn-sm w-100">
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        {{ loading ? 'Loading...' : 'Load More' }}
                    </button>
                </li>
            </template>
        </v-select>
    </div>

</template>
<script>
import { ref, watch, } from "@vue/composition-api";
import { debounce } from "lodash";
import vSelect from 'vue-select';

export default {
    components: { vSelect },
    props: {
        value: {
            type: [String, Number, null],
            default: null,
        },
        hasNextPage: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
        loading: {
            type: Boolean,
            default: false,
        },
        selectValue: {
            type: String,
            defualt: ''
        },
        clearable: {
            type: Boolean,
            defualt: false
        }
    },
    emits: ["input", "onFetchOptions", "onPaginate", "onSearch"],
    setup(props, { emit }) {
        const modelValue = ref(props.selectValue);

        watch(modelValue, (newValue) => {
            if(!newValue) return emit("input", newValue)
            emit("input", newValue.value);
        });

        const loadMore = async () => {
            if (props.loading || !props.hasNextPage) return;
            emit("onPaginate");
            emit("onFetchOptions");
        };

        const debouncedSearch = debounce((searchTerm) => {
            emit("onSearch", searchTerm);
        }, 300);

        const handleSearch = (search) => {
            debouncedSearch(search);
        }
        
        return {
            props,
            modelValue,
            loadMore,
            handleSearch
        };
    },
};
</script>
