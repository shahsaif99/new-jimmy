<template>
  <b-modal cancel-variant="outline-secondary" centered :hide-footer="true" :title="t('Add Lending History')" size="sm"
    class="modal-is-add-lending-active" id="is-add-lending-active" @close="$emit('update:is-add-lending-active', false)"
    :visible="isAddLendingActive" @hide="$emit('update:is-add-lending-active', false)">
    <div>
      <b-tabs v-model="selectedTab">
        <b-tab title="Self Lending">
          <div>
            <validation-observer ref="refFormObserver" #default="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetForm">
                <b-row>
                  <b-col cols="12" md="12">
                    <validation-provider #default="validationContext" :name="t('Equipment')" rules="required">
                      <b-form-group :label="t('Select Equipment')" label-for="equipment">
                        <v-select v-model="formData.equipment" class="w-full"
                          :placeholder="t('Type here to search equipments')" :options="equipments"
                          :close-on-select="true" :select-on-tab="true" :clearable="false" input-id="equipment"
                          :filterable="false" label="name" @search="onSearch"
                          :state="getValidationState(validationContext)">
                          <template slot="no-options">
                            {{ t('type to search equipments..') }}
                          </template>
                          <template slot="option" slot-scope="option">
                            {{ option.name }} - {{ option.serial_number }}
                          </template>
                          <template slot="selected-option" slot-scope="option">
                            {{ option.name }} - {{ option.serial_number }}
                          </template>
                        </v-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <div class="d-flex align-items-center justify-content-end">
                      <b-button variant="primary" class="px-5 mt-2" type="submit">
                        <span class="text-nowrap">{{ t('Self Lending') }}</span>
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </div>
        </b-tab>
        <b-tab title="External Lending">
          <div>
            <!-- Similar form for External Lending -->
            <validation-observer ref="refExternalObserver" #default="{ handleSubmit }">
              <b-form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetExternalForm">

                <b-row>
                  <b-col cols="12" md="12">
                    <validation-provider #default="validationContext" :name="t('Equipment')" rules="required">
                      <b-form-group :label="t('Select Equipment')" label-for="equipment">
                        <v-select v-model="formData.equipment" class="w-full"
                          :placeholder="t('Type here to search equipments')" :options="equipments"
                          :close-on-select="true" :select-on-tab="true" :clearable="false" input-id="equipment"
                          :filterable="false" label="name" @search="onSearch"
                          :state="getValidationState(validationContext)">
                          <template slot="no-options">
                            {{ t('type to search equipments..') }}
                          </template>
                          <template slot="option" slot-scope="option">
                            {{ option.name }} - {{ option.serial_number }}
                          </template>
                          <template slot="selected-option" slot-scope="option">
                            {{ option.name }} - {{ option.serial_number }}
                          </template>
                        </v-select>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="12">
                    <validation-provider #default="validationContext" :name="t('Loaned to')" rules="required">
                      <b-form-group :label="t('Loaned to')" label-for="loaned_to">
                        <b-form-input v-model="formData.loaned_to" :placeholder="t('Loaned to')"
                          :state="getValidationState(validationContext)" />
                        <b-form-invalid-feedback>
                          {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <div class="d-flex align-items-center justify-content-end">
                      <b-button variant="primary" class="px-5 mt-2" type="submit">
                        <span class="text-nowrap">{{ t('Add External') }}</span>
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BForm,
  BFormInput,
  BButton,
  BFormGroup,
  BFormInvalidFeedback,
  BTabs,
  BTab,
} from 'bootstrap-vue'
import { ref, onMounted } from '@vue/composition-api'
import useEquipments from '@/composables/equipments'
import useLendings from '@/composables/lendings'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import debounce from 'lodash/debounce'
import vSelect from 'vue-select'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BCol,
    BRow,
    BForm,
    BButton,
    vSelect,
    BFormGroup,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    BFormInvalidFeedback,
    BTabs,
    BTab,
  },
  model: {
    prop: 'isAddLendingActive',
    event: 'update:is-add-lending-active',
  },
  props: {
    isAddLendingActive: {
      type: Boolean,
      required: true,
    },
    equipment: {
      type: Object,
      default: () => { },
    },
    selected: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const selectedTab = ref(props.selected)
    const initialState = {
      lending_date: '',
      returned_date: '',
      loaned_to: '',
      equipment: '',
    }
    const formData = ref({ ...initialState })
    const { t } = useI18nUtils()

    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const { storeLending, respResult } = useLendings()

    const { fetchEquipmentsList, equipments } = useEquipments()

    onMounted(() => {
      if (props.equipment) {
        formData.value.equipment = props.equipment
      }
    })

    const fetchAsynEquipments = debounce(async (loading, name) => {
      if (!name.length) {
        equipments.value = []
        return
      }
      fetchEquipmentsList(name)
      loading(false)
    }, 350)

    const onSearch = (name, loading) => {
      if (!name.length) {
        equipments.value = []
        return
      }
      loading(true)
      fetchAsynEquipments(loading, name, this)
    }


    const onSubmit = async () => {
      const formNewData = new FormData()
      const user = getUserData()
      formNewData.append('loaned_to', selectedTab.value === 0 ? user.name : formData.value.loaned_to)
      formNewData.append('equipment_id', formData.value.equipment.id)
      await storeLending(formNewData)
      if (respResult.value.status === 200) {
        emit('refetch-data')
        emit('update:is-add-lending-active', false)
      }
    }
    return {
      t,
      formData,
      required,
      onSubmit,
      resetForm,
      onSearch,
      equipments,
      refFormObserver,
      getValidationState,
      fetchAsynEquipments,
      selectedTab
    }
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
