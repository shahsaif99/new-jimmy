<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Lending History"
    size="lg"
    class="modal-is-show-lending-history-active"
    id="is-show-lending-history-active"
    @close="$emit('update:is-show-lending-history-active', false)"
    :visible="isShowLendingHistoryActive"
    @hide="$emit('update:is-show-lending-history-active', false)"
  >
    <div>
      <LendingHisotry :equipment="equipment" />
    </div>
  </b-modal>
</template>

<script>
import LendingHisotry from '../lending/Index.vue'

export default {
  components: {
    LendingHisotry,
  },
  model: {
    prop: 'isShowLendingHistoryActive',
    event: 'update:is-show-lending-history-active',
  },
  props: {
    isShowLendingHistoryActive: {
      type: Boolean,
      required: true,
    },
    equipment: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
    }
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
.modal-lg, .modal-xl {
    max-width: 1058px;
}
</style>
