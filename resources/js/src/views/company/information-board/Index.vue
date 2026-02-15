<template>
    <div>
        <b-card>
            <QuickOptions />

            <b-overlay id="overlay-background" variant="transparent" rounded="sm">
                <b-table
                    :busy="apiHelpers.loading"
                    ref="refTable"
                    id="infoBoardTable"
                    :items="items"
                    responsive
                    :fields="columns"
                    show-empty
                    :empty-text="t('No matching records found')"
                    style="min-height: 60vh"
                >
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle" label="Spinning" small></b-spinner>
                            <strong>{{ t('Loading...') }}</strong>
                        </div>
                    </template>

                    <template #cell(title)="data">
                        <span>{{ data.value }}</span>
                    </template>

                    <template #cell(created_at)="data">
                        <span>{{ data.value }}</span>
                    </template>

                    <template #cell(author)="data">
                        <span v-if="data.item.user">{{ data.item.user.first_name }} {{ data.item.user.last_name }}</span>
                    </template>

                    <template #cell(visible_to)="data">
                        <span>{{ data.value ? data.value.join(', ') : '' }}</span>
                    </template>

                    <template #cell(status)="data">
                        <b-badge :variant="data.value === 'published' ? 'light-success' : 'light-warning'">
                            {{ data.value === 'published' ? t('Published') : t('Draft') }}
                        </b-badge>
                    </template>

                    <template #cell(action)="data">
                        <b-dropdown variant="link" no-caret>
                            <template #button-content>
                                <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                            </template>
                            <b-dropdown-item @click="editItem(data.item)">
                                <feather-icon icon="EditIcon" />
                                <span class="align-middle ml-50">{{ t('Edit') }}</span>
                            </b-dropdown-item>
                            <b-dropdown-item @click="deleteInformation(data.item.id)">
                                <feather-icon icon="TrashIcon" />
                                <span class="align-middle ml-50">{{ t('Delete') }}</span>
                            </b-dropdown-item>
                        </b-dropdown>
                    </template>
                </b-table>
            </b-overlay>

            <div class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <span class="text-muted">{{ t('Showing') }} {{ dataMeta.from }}
                            {{ t('to') }} {{ dataMeta.to }} {{ t('of') }}
                            {{ dataMeta.of }} {{ t('entries') }}</span>
                    </b-col>

                    <b-col cols="12" sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end">
                        <b-pagination
                            v-model="pagination.current_page"
                            :total-rows="pagination.total"
                            :per-page="pagination.per_page"
                            first-number
                            last-number
                            class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item"
                            next-class="next-item"
                            :key="pagination.current_page"
                            @change="onPagination"
                        >
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18" />
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18" />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>

        <AddInformation
            v-if="dialog.show.add"
            :showing="dialog.show.add"
            @closeDialog="dialog.toggleDialog('add')"
        />

        <EditInformation
            v-if="dialog.show.edit"
            :showing="dialog.show.edit"
            @closeDialog="dialog.toggleDialog('edit')"
        />
    </div>
</template>

<script>
import { onMounted, ref, watch } from '@vue/composition-api'
import QuickOptions from './QuickOptions.vue'
import AddInformation from './AddInformation.vue'
import EditInformation from './EditInformation.vue'
import {
    BCard,
    BOverlay,
    BTable,
    BPagination,
    BCol,
    BRow,
    BDropdownItem,
    BDropdown,
    BSpinner,
    BBadge,
} from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useInformationBoard from '@/composables/informationBoard'

export default {
    components: {
        BCard,
        BOverlay,
        BTable,
        QuickOptions,
        BCol,
        BPagination,
        BRow,
        BDropdownItem,
        BDropdown,
        BSpinner,
        BBadge,
        AddInformation,
        EditInformation,
    },
    setup() {
        const refTable = ref(null)

        const {
            items,
            form,
            filters,
            columns,
            dialog,
            pagination,
            apiHelpers,
            dataMeta,
            reset,
            fetchBoardInformation,
            deleteInformation,
        } = useInformationBoard()

        const { t } = useI18nUtils()

        onMounted(async () => {
            reset()
            fetchBoardInformation()

            watch(
                () => ({
                    search: filters.search,
                    accordion: filters.accordion.map(({ key, model }) => ({ key, model })),
                }),
                () => {
                    pagination.current_page = 1
                    fetchBoardInformation()
                },
                { deep: true }
            )
        })

        const onPagination = (page) => {
            pagination.current_page = page
            fetchBoardInformation()
        }

        const editItem = (item) => {
            dialog.temp.data = item
            dialog.temp.id = item.id
            form.set(item)
            dialog.toggleDialog('edit')
        }

        return {
            t,
            refTable,
            items,
            filters,
            columns,
            dialog,
            pagination,
            apiHelpers,
            dataMeta,
            onPagination,
            editItem,
            deleteInformation,
        }
    },
}
</script>

<style lang="scss">
#infoBoardTable th,
#infoBoardTable td {
    padding: 0.72rem 1rem !important;
}

#infoBoardTable {
    th:first-child {
        display: none !important;
    }

    td:first-child {
        display: none !important;
    }
}
</style>
