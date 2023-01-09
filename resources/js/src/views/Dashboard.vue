<!-- eslint-disable vue/no-parsing-error -->
<template>
  <b-row>
    <b-col sm="6">
      <InformationBoard />
    </b-col>
    <b-col sm="6">
      <Equipments />
    </b-col>
  </b-row>
</template>


<script>
import { onMounted } from '@vue/composition-api'
import {
  VBTooltip, BRow, BCol,
} from 'bootstrap-vue'
// eslint-disable-next-line import/no-cycle
import InformationBoard from './components/InformationBoard.vue'
import Equipments from './components/Equipments.vue'

export default {
  components: {
    BRow,
    BCol,
    InformationBoard,
    Equipments,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  setup() {
    onMounted(() => {
    })

    return {
    }
  },
}
</script>
