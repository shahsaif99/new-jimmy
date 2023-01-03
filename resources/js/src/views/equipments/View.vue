<template>
  <b-modal
    cancel-variant="outline-secondary"
    :hide-footer="true"
    title="Equipment Details"
    size="lg"
    @close="$emit('update:is-equipment-details-active', false)"
    :visible="isEquipmentDetailsActive"
    @hide="$emit('update:is-equipment-details-active', false)"
  >
    <b-row v-if="equipmentDetailsData">
      <b-col
        sm="6"
      >
        <b-card-text class="mt-1">
          <span class="font-weight-bolder">Name: </span> {{ equipmentDetailsData.name }}
        </b-card-text>
        <b-card-text class="mt-1">
          <span class="font-weight-bolder">Serial Number: </span> {{ equipmentDetailsData.serial_number }}
        </b-card-text>
        <b-card-text class="mt-1">
          <span class="font-weight-bolder">Supplier: </span> {{ equipmentDetailsData.supplier }}
        </b-card-text>
        <b-card-text class="mt-1">
          <span class="font-weight-bolder">Category: </span> {{ equipmentDetailsData.category }}
        </b-card-text>
      </b-col>
      <b-col
        sm="6"
      >
        <b-card-text class="mt-1">
          <span class="font-weight-bolder">Certificate Number: </span> {{ equipmentDetailsData.certificate_number }}
        </b-card-text>
        <b-card-text class="mt-1">
          <span class="font-weight-bolder">Valid Until: </span> {{ equipmentDetailsData.valid_until }}
        </b-card-text>
        <b-card-text
          class="mt-1"
          v-if="equipmentDetailsData.project"
        >
          <span class="font-weight-bolder">Project: </span> {{ equipmentDetailsData.project.name }}
        </b-card-text>
      </b-col>
    </b-row>
    <b-row
      class="mt-3"
      v-if="equipmentDetailsData.media && equipmentDetailsData.media.length > 0"
    >
      <b-col
        cols="4"
        md="4"
        class="bequipment "
      >
        <h4>Files</h4>
        <table style="width:100%">
          <tr
            v-for="(item, index) in equipmentDetailsData.media"
            :key="index"
            class="border"
          >
            <th> {{ item.filename }}:</th>
            <td>
              <b-link
                :to="`/storage/${item.directory}/${item.filename}.${item.extension}`"
                class="font-weight-bold"
                target="_blank"
                download
                v-b-tooltip.hover
                :title="`Download ${startCase(index)}`"
              >
                <feather-icon
                  icon="DownloadIcon"
                  size="22"
                />
              </b-link>
              <b-link
                :to="`/storage/${item.directory}/${item.filename}.${item.extension}`"
                class="font-weight-bold ml-1"
                target="_blank"
                v-b-tooltip.hover
                :title="`View ${startCase(index)}`"
              >
                <feather-icon
                  icon="EyeIcon"
                  size="22"
                />
              </b-link>
            </td>
          </tr>
        </table>
      </b-col>
      <b-col
        cols="12"
        md="12"
        v-if="equipmentDetailsData.media && equipmentDetailsData.media.length > 0"
      >
        <b-button
          @click="handleZipDownload"
          class="mt-4 "
          size="sm"
        >
          <feather-icon
            icon="DownloadIcon"
            class="mr-50"
          />
          Download All Documents
        </b-button>
      </b-col>
    </b-row>
    <div class="d-flex mt-2 justify-content-between">
      <div>
        <b-button
          variant="danger"
          class="mr-2"
          type="button"
          @click="deleteConfirm"
        >
          <feather-icon
            icon="TrashIcon"
            class="mr-50"
          />
          Delete
        </b-button>
      </div>
      <b-button
        type="button"
        variant="outline-secondary"
        @click="
          $emit(
            'update:is-equipment-details-active',
            false
          )
        "
      >
        Close
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import {
  BModal, BRow, BCol, BLink, BCardText, VBTooltip, BButton,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import { startCase } from 'lodash'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import moment from 'moment'
import useEquipments from '@/composables/equipments'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BModal,
    BButton,
    BCardText,
  },
  model: {
    prop: 'isEquipmentDetailsActive',
    event: 'update:is-equipment-details-active',
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    isEquipmentDetailsActive: {
      type: Boolean,
      required: true,
    },
    equipment: {
      type: Object,
      required: false,
      default: () => { },
    },
  },


  setup(props, { root, emit }) {
    const equipmentDetailsData = ref({})
    const {
      respResult,
      deleteEquipment,
    } = useEquipments()

    onMounted(() => {
      if (props.isEquipmentDetailsActive) {
        equipmentDetailsData.value = props.equipment
        console.log(props.equipment)
      }
    })

    const statuses = ref([
      'Pending',
      'Arrived At WareHouse',
      'In Production',
      'Completed',
      'Pick Up',
    ])

    const deleteConfirmed = async () => {
      await deleteEquipment(equipmentDetailsData.value.id)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-equipment-details-active', false)
      }
    }


    const deleteConfirm = () => {
      root.$bvModal
        .msgBoxConfirm('Please confirm that you want to delete equipment.', {
          title: 'Please Confirm',
          size: 'sm',
          centered: true,
          okTitle: 'Yes, Delete it',
          cancelTitle: 'NO',
          okVariant: 'danger',
        })
        .then(value => {
          if (value) {
            deleteConfirmed()
          }
        })
    }

    const handleZipDownload = async () => {
      const zip = new JSZip()
      const remoteFiles = props.equipment.media.map(async document => {
        const url = `${window.location.origin}/storage/${document.directory}/${document.filename}.${document.extension}`
        const response = await fetch(url).then()
        const data = {
          name: `${document.filename}.${document.extension}`,
          data: await response.blob(),
        }
        return data
      })
      Promise.all(remoteFiles).then(files => {
        files.forEach(element => {
          zip.file(element.name, element.data, { binary: true })
        })
        zip.generateAsync({ type: 'blob' }).then(content => {
          saveAs(content, `${props.equipment.name} - ${moment().format('YYYY-MM-DD')}.zip`)
        })
      })
    }
    return {
      statuses,
      startCase,
      deleteConfirm,
      equipmentDetailsData,
      handleZipDownload,
    }
  },
}
</script>

