<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Chapters"
    size="lg"
    class="modal-is-manage-chapters-active"
    id="is-manage-chapters-active"
    @close="$emit('update:is-manage-chapters-active', false)"
    :visible="isManageChaptersActive"
    @hide="$emit('update:is-manage-chapters-active', false)"
  >
    <div>
      <Chapters />
    </div>
  </b-modal>
</template>

<script>
import Chapters from '../settings/chapters/Index.vue'

export default {
  components: {
    Chapters,
  },
  model: {
    prop: 'isManageChaptersActive',
    event: 'update:is-manage-chapters-active',
  },
  props: {
    isManageChaptersActive: {
      type: Boolean,
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
.modal-lg, .modal-xl {
    max-width: 1058px;
}
</style>
