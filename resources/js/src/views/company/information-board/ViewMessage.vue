<template>
    <b-modal
        centered
        :hide-footer="false"
        :hide-header-close="false"
        :title="''"
        size="lg"
        :visible="showing"
        @hide="$emit('close')"
        @close="$emit('close')"
    >
        <div class="py-1">
            <!-- Title + Date -->
            <div class="d-flex justify-content-between align-items-start mb-2">
                <h4 class="font-weight-bold mb-0">{{ item.title }} <span v-if="item.author" class="font-weight-normal">{{ item.author }}</span><span v-else-if="item.user" class="font-weight-normal">{{ item.user.first_name }} {{ item.user.last_name }}</span></h4>
                <span class="text-muted text-nowrap ml-2">{{ item.created_at }}</span>
            </div>

            <hr class="mt-0" />

            <!-- Content -->
            <div class="message-content mb-2" v-html="item.content"></div>

            <hr />

            <!-- Author -->
            <div class="d-flex align-items-center">
                <b-avatar
                    size="32"
                    :text="authorInitials"
                    variant="light-danger"
                    class="mr-75"
                />
                <span class="text-muted">{{ authorName }}</span>
            </div>
        </div>

        <template #modal-footer>
            <b-button variant="outline-secondary" @click="$emit('close')">
                {{ t('Close') }}
            </b-button>
        </template>
    </b-modal>
</template>

<script>
import { computed } from '@vue/composition-api'
import { BModal, BButton, BAvatar } from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
    components: {
        BModal,
        BButton,
        BAvatar,
    },
    props: {
        showing: {
            type: Boolean,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { t } = useI18nUtils()

        const authorName = computed(() => {
            if (props.item.author) return props.item.author
            if (props.item.user) return `${props.item.user.first_name} ${props.item.user.last_name}`
            return 'Unknown'
        })

        const authorInitials = computed(() => {
            const name = authorName.value
            if (!name || name === 'Unknown') return '?'
            return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        })

        return {
            t,
            authorName,
            authorInitials,
        }
    },
}
</script>

<style scoped>
.message-content {
    min-height: 100px;
}
</style>
