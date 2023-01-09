<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Handbooks"
    size="lg"
    class="modal-add-handbooks-active"
    id="add-handbooks-active"
    @close="$emit('update:add-handbooks-active', false)"
    :visible="addHandbooksActive"
    @hide="$emit('update:add-handbooks-active', false)"
  >
    <div>
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >
          <div>
            <b-row>
              <b-col
                cols="4"
                md="4"
              >
                <validation-provider
                  #default="validationContext"
                  name="Organization Name"
                  rules="required"
                >
                  <b-form-group
                    label="Organization Name"
                    label-for="oname"
                  >
                    <b-form-input
                      v-model="formData.organization_name"
                      placeholder="Organization Name"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="4"
                md="4"
              >
                <validation-provider
                  #default="validationContext"
                  name="Company Name"
                  rules="required"
                >
                  <b-form-group
                    label="Company Name"
                    label-for="cname"
                  >
                    <b-form-input
                      v-model="formData.company_name"
                      placeholder="Company Name"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider></b-col>
              <b-col
                cols="4"
                md="4"
              >
                <validation-provider
                  #default="validationContext"
                  name="Visiting Address"
                  rules="required"
                >
                  <b-form-group
                    label="Visiting Address "
                    label-for="address"
                  >
                    <b-form-input
                      v-model="formData.visiting_address"
                      placeholder="Visiting Address"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider></b-col>
            </b-row>
            <b-row>
              <h3 class="mt-2 ml-1">
                Establishment
              </h3>
            </b-row>
            <b-row>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Registered Date"
                  rules="required"
                >
                  <b-form-group
                    label="Registered"
                    label-for="registered"
                  >
                    <b-form-input
                      type="date"
                      v-model="formData.registered"
                      placeholder="00.00.0000"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider></b-col>
              <b-col
                cols="6"
                md="6"
              >
                <validation-provider
                  #default="validationContext"
                  name="Company type"
                  rules="required"
                >
                  <b-form-group
                    label="Company Type"
                    label-for="companytyper"
                  >
                    <b-form-input
                      v-model="formData.company_type"
                      placeholder="Company Type"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>

            </b-row>
            <b-row>
              <b-col
                cols="12"
                md="12"
              >
                <validation-provider
                  #default="validationContext"
                  name="Industry"
                  rules="required"
                >
                  <b-form-group
                    label="Industry Code/Industry"
                    label-for="code"
                  >
                    <b-form-input
                      v-model="formData.industry"
                      placeholder="Industry"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row>
              <h3 class="mt-2 ml-1">
                Contact Information
              </h3>
            </b-row>
            <b-row>
              <b-col
                cols="4"
                md="4"
              >
                <validation-provider
                  #default="validationContext"
                  name="Website"
                  rules="required"
                >
                  <b-form-group
                    label="Website"
                    label-for="website"
                  >
                    <b-form-input
                      type="url"
                      v-model="formData.website"
                      placeholder="Website"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider></b-col>
              <b-col
                cols="4"
                md="4"
              >
                <validation-provider
                  #default="validationContext"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-group
                    label="Email"
                    label-for="email"
                  >
                    <b-form-input
                      type="email"
                      v-model="formData.email"
                      placeholder="Email"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="4"
                md="4"
              >
                <validation-provider
                  #default="validationContext"
                  name="Telephone"
                  rules="required"
                >
                  <b-form-group
                    label="Telephone"
                    label-for="telephone"
                  >
                    <b-form-input
                      type="number"
                      v-model="formData.telephone"
                      placeholder="Telephone"
                      :state="getValidationState(validationContext)"
                    />
                    <b-form-invalid-feedback>
                      {{ validationContext.errors[0] }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider></b-col>
            </b-row>
            <b-row>
              <h3 class="mt-2 ml-1">
                Logo
              </h3>
            </b-row>
            <b-row>
              <b-col>
                <b-media class="mb-2">
                  <template #aside>
                    <b-avatar
                      ref="previewEl"
                      :src="formData.avatar_url"
                      size="90px"
                      rounded
                    />
                  </template>
                  <div class="d-flex flex-wrap">
                    <b-button
                      variant="primary"
                      class="mt-2"
                      @click="$refs.refInputEl.click()"
                    >
                      <input
                        ref="refInputEl"
                        type="file"
                        class="d-none"
                        @input="inputImageRenderer"
                      >
                      <span class="d-none d-sm-inline">Browse</span>
                      <feather-icon
                        icon="EditIcon"
                        class="d-inline d-sm-none"
                      />
                    </b-button>
                    <b-button
                      variant="outline-secondary"
                      class="ml-1 mt-2"
                      @click="removeImage"
                    >
                      <span class="d-none d-sm-inline">Remove</span>
                      <feather-icon
                        icon="TrashIcon"
                        class="d-inline d-sm-none"
                      />
                    </b-button>
                  </div>
                </b-media>
              </b-col>
            </b-row>
            <div class="mb-2">
              <b-row>
                <b-col>
                  <div
                    class="d-flex align-items-center justify-content-end"
                  >
                    <b-button
                      variant="primary"
                      type="submit"
                    >
                      <span class="text-nowrap">Submit</span>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-form>
      </validation-observer>
    </div>
  </b-modal>
</template>

<script>
import {
  BRow,
  BCol,
  BFormInput,
  BButton,
  BFormGroup,
  BMedia,
  BAvatar,
  BForm,
  BFormInvalidFeedback,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    // Export,
    BCol,
    BRow,
    BFormInput,
    BButton,
    BFormGroup,
    BMedia,
    BAvatar,
    ValidationObserver,
    ValidationProvider,
    BForm,
    BFormInvalidFeedback,
  },
  model: {
    prop: 'addHandbooksActive',
    event: 'update:add-handbooks-active',
  },
  props: {
    addHandbooksActive: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const {
      refFormObserver, getValidationState, resetForm,
    } = formValidation()

    const formSubmitted = () => {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    }
    const refInputEl = ref(null)
    const formData = ref(
      {
        company_name: '',
        organization_name: '',
        visiting_address: '',
        registered: '',
        company_type: '',
        industry: '',
        website: '',
        telephone: '',
        avatar: '',
        avatar_url: '',
        avatar_new: '',
      },
    )

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      formData.value.avatar_url = base64
      formData.value.avatar_new = base64
    })

    const removeImage = () => {
      formData.value.avatar = ''
    }

    const onSubmit = async () => {
    //   await updateGeneral(formData.value)
    }

    const tableColumns = [
      { key: 'Title' },
      { key: 'Created' },
      { key: 'View' },
      { key: 'File' },
    ]
    return {
      formData,
      tableColumns,
      removeImage,
      refInputEl,
      inputImageRenderer,
      required,
      alphaNum,
      refFormObserver,
      getValidationState,
      resetForm,
      email,
      onSubmit,
      formSubmitted,

    }
  },
}
</script>
    <style lang="scss" scoped>
    .per-page-selector {
    width: 90px;
    }
</style>

