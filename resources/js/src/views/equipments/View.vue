<template>
  <div>


    <b-modal
      cancel-variant="outline-secondary"
      :hide-footer="true"
      :title="t('Equipment Details')"
      size="lg"
      @close="$emit('update:is-equipment-details-active', false)"
      :visible="isEquipmentDetailsActive"
      @hide="$emit('update:is-equipment-details-active', false)"
    >
      <b-media class="mb-2">
        <template #aside>
          <div
            class="border"
          >
            <b-img
              v-if="equipmentDetailsData.image_url"
              ref="previewEl"
              width="160"
              :src="equipmentDetailsData.image_url"
              :alt="t('Image Preview')"
            />
          </div>
        </template>
      </b-media>
      <b-row v-if="equipmentDetailsData">

        <b-col
          sm="6"
        >
          <b-card-text class="mt-1">
            <span class="font-weight-bolder">{{ t('Name') }}: </span> {{ equipmentDetailsData.name }}
          </b-card-text>
          <b-card-text class="mt-1">
            <span class="font-weight-bolder">{{ t('Category') }}: </span> {{ equipmentDetailsData.category }}
          </b-card-text>
          <b-card-text class="mt-1">
            <span class="font-weight-bolder">{{ t('Certificate Number') }}: </span> {{ equipmentDetailsData.certificate_number }}
          </b-card-text>

          <b-card-text
            class="mt-1"
            v-if="equipmentDetailsData.project"
          >
            <span class="font-weight-bolder">{{ t('Storage Location') }}: </span> {{ equipmentDetailsData.project.name }}
          </b-card-text>


        </b-col>
        <b-col
          sm="6"
        >
          <b-card-text class="mt-1">
            <span class="font-weight-bolder">{{ t('Supplier') }}: </span> {{ equipmentDetailsData.supplier }}
          </b-card-text>
          <b-card-text class="mt-1">
            <span class="font-weight-bolder">{{ t('Serial Number') }}: </span> {{ equipmentDetailsData.serial_number }}
          </b-card-text>
          <b-card-text class="mt-1">
            <span class="font-weight-bolder">{{ t('Valid Until') }}: </span> {{ equipmentDetailsData.valid_until }}
          </b-card-text>
        </b-col>
      </b-row>
      <b-row
        class="mt-3"
      >
        <b-col
          cols="4"
          md="4"
          class="bequipment "
        >
          <h4>{{ t('Files') }}</h4>
          <table
            style="width:100%"
            v-if="equipmentDetailsData.media && equipmentDetailsData.media.length > 0"
          >
            <tr
              v-for="(item, index) in equipmentDetailsData.media"
              :key="index"
              class="border"
            >
              <th class="p-1">
                {{ item.filename }}.{{ item.extension }}
              </th>
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
        <!-- <b-col
          cols="12"
          md="12"
        >
          <b-button
            @click="handleZipDownload"
            class="mt-4 "
            size="sm"
            v-if="equipmentDetailsData.media && equipmentDetailsData.media.length > 0"
          >
            <feather-icon
              icon="DownloadIcon"
              class="mr-50"
            />
            Download All Documents
          </b-button>

        </b-col> -->
      </b-row>
      <div class="d-flex mt-2 justify-content-between">
        <div>
          <b-button
            variant="danger"
            class="mr-2"
            type="button"
            size="sm"
            @click="deleteConfirm"
          >
            <feather-icon
              icon="TrashIcon"
              class="mr-50"
            />
            {{ t('Delete') }}
          </b-button>

          <b-button
            variant="primary"
            class="mr-2"
            size="sm"
            type="button"
            @click="isEditEquipmentActive = true"
            v-if="$can('equipments-edit', 'all')"
          >
            {{ t('Edit') }}
          </b-button>
          <b-button
            size="sm"
            variant="primary"
            @click="isShowLendingHistoryActive = true"
          >
            {{ t('Show Lending History') }}
          </b-button>
        </div>
        <b-button
          type="button"
          size="sm"
          variant="outline-secondary"
          @click="
            $emit(
              'update:is-equipment-details-active',
              false
            )
          "
        >
          {{ t('Close') }}
        </b-button>
      </div>
    </b-modal>
    <LendingHistory
      :is-show-lending-history-active.sync="isShowLendingHistoryActive"
      :equipment="equipmentDetailsData"
      v-if="isShowLendingHistoryActive"
    />
    <EditEquipment
      :is-edit-equipment-active.sync="isEditEquipmentActive"
      v-if="isEditEquipmentActive"
      :equipment="equipmentDetailsData"
      @refetch-data="$emit('update:is-equipment-details-active', false)"
    />
  </div>
</template>

<script>
import {
  BModal, BRow, BCol, BLink, BCardText, VBTooltip, BButton, BMedia, BImg,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import { startCase } from 'lodash'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import moment from 'moment'
import useEquipments from '@/composables/equipments'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import i18n from '@/libs/i18n'
import LendingHistory from './LendingHistory.vue'
import EditEquipment from './Edit.vue'

export default {
  components: {
    BRow,
    BCol,
    BImg,
    BLink,
    BModal,
    BMedia,
    BButton,
    BCardText,
    LendingHistory,
    EditEquipment,
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

    const { t } = useI18nUtils()

    onMounted(() => {
      if (props.isEquipmentDetailsActive) {
        equipmentDetailsData.value = props.equipment
      }
    })
    const isShowLendingHistoryActive = ref(false)
    const isEditEquipmentActive = ref(false)


    const deleteConfirmed = async () => {
      await deleteEquipment(equipmentDetailsData.value.id)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-equipment-details-active', false)
      }
    }


    const deleteConfirm = () => {
      root.$bvModal
        .msgBoxConfirm(i18n.t('Please confirm that you want to delete equipment.'), {
          title: i18n.t('Please Confirm'),
          size: 'sm',
          centered: true,
          okTitle: i18n.t('Yes, Delete it'),
          cancelTitle: i18n.t('NO'),
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
      t,
      startCase,
      deleteConfirm,
      handleZipDownload,
      equipmentDetailsData,
      isEditEquipmentActive,
      isShowLendingHistoryActive,
    }
  },
}
</script>

