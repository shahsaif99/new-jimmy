<template>
    <b-modal
        cancel-variant="outline-secondary"
        centered
        :hide-footer="true"
        :title="t('New message')"
        size="lg"
        no-enforce-focus
        :visible="showing"
        @hide="$emit('closeDialog')"
        @close="$emit('closeDialog')"
    >
        <validation-observer #default="{ handleSubmit }" ref="refFormObserver">
            <b-form @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="resetForm">
                <!-- Title -->
                <b-row>
                    <b-col cols="12">
                        <validation-provider
                            #default="validationContext"
                            :name="t('Title')"
                            rules="required"
                        >
                            <b-form-group label-for="title">
                                <template #label>
                                    <strong>{{ t('Title:') }}</strong>
                                </template>
                                <b-form-input
                                    v-model="form.title"
                                    :state="getValidationState(validationContext)"
                                />
                                <b-form-invalid-feedback>
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                </b-row>

                <!-- Message (Rich Text Editor) -->
                <b-row>
                    <b-col cols="12">
                        <b-form-group label-for="content">
                            <template #label>
                                <strong>{{ t('Message:') }}</strong>
                            </template>
                            <ckeditor
                                :editor="ClassicEditor"
                                :config="editorConfig"
                                v-model="form.content"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- Publishing -->
                <b-row>
                    <b-col cols="12">
                        <b-form-group label-for="publishing">
                            <template #label>
                                <strong>{{ t('Publishing') }}</strong>
                            </template>
                            <b-form-radio
                                v-model="form.publishing"
                                name="publishing"
                                value="draft"
                                class="mb-1"
                            >
                                {{ t('Draft (Not published)') }}
                            </b-form-radio>
                            <b-form-radio
                                v-model="form.publishing"
                                name="publishing"
                                value="now"
                                class="mb-1"
                            >
                                {{ t('Now') }}
                            </b-form-radio>
                            <b-form-radio
                                v-model="form.publishing"
                                name="publishing"
                                value="scheduled"
                                class="mb-1"
                            >
                                {{ t('Select date and time') }}
                            </b-form-radio>

                            <b-form-input
                                v-if="form.publishing === 'scheduled'"
                                type="datetime-local"
                                v-model="form.publish_at"
                                class="mt-1"
                                style="max-width: 300px"
                            />
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- Visible to -->
                <b-row>
                    <b-col cols="12">
                        <validation-provider
                            #default="validationContext"
                            :name="t('Visible to')"
                            rules="required"
                        >
                            <b-form-group label-for="visible_to">
                                <template #label>
                                    <strong>{{ t('Visible to:') }}</strong>
                                </template>
                                <v-select
                                    v-model="form.visible_to"
                                    :options="visibleToOptions"
                                    :reduce="option => option.value"
                                    label="label"
                                    multiple
                                    :placeholder="t('Select...')"
                                    :class="{ 'is-invalid': validationContext.errors.length }"
                                />
                                <b-form-invalid-feedback :state="getValidationState(validationContext)">
                                    {{ validationContext.errors[0] }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                        </validation-provider>
                    </b-col>
                </b-row>

                <!-- Push Notification -->
                <b-row>
                    <b-col cols="12">
                        <b-form-group label-for="push_notification">
                            <template #label>
                                <strong>{{ t('Push Notification:') }}</strong>
                            </template>
                            <b-form-radio
                                v-model="form.push_notification"
                                name="push_notification"
                                :value="false"
                                class="mb-1"
                            >
                                {{ t('No') }}
                            </b-form-radio>
                            <b-form-radio
                                v-model="form.push_notification"
                                name="push_notification"
                                :value="true"
                            >
                                {{ t('Yes') }}
                            </b-form-radio>
                        </b-form-group>
                    </b-col>
                </b-row>

                <!-- Save Button -->
                <b-row>
                    <b-col>
                        <div class="d-flex align-items-center justify-content-end mt-2">
                            <b-button
                                variant="primary"
                                type="submit"
                                :disabled="apiHelpers.loading"
                                class="px-4"
                            >
                                <b-spinner v-if="apiHelpers.loading" small class="mr-1" />
                                {{ t('Save') }}
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </b-form>
        </validation-observer>
    </b-modal>
</template>

<script>
import {
    BRow,
    BCol,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BFormRadio,
    BFormInvalidFeedback,
    BSpinner,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useInformationBoard from '@/composables/informationBoard'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import vSelect from 'vue-select'

export default {
    components: {
        BRow,
        BCol,
        BForm,
        BButton,
        BFormGroup,
        BFormInput,
        BFormRadio,
        BFormInvalidFeedback,
        BSpinner,
        ValidationProvider,
        ValidationObserver,
        ckeditor: CKEditor.component,
        vSelect,
    },
    props: {
        showing: {
            type: Boolean,
            required: true,
        },
    },
    setup(_, { emit }) {
        const {
            form,
            apiHelpers,
            visibleToOptions,
            publishingOptions,
            storeInformation,
        } = useInformationBoard()

        const { t } = useI18nUtils()
        const { refFormObserver, getValidationState, resetForm } = formValidation()

        const editorConfig = ref({
            removePlugins: ['ImageUpload', 'EasyImage'],
        })

        const onSubmit = async () => {
            try {
                await storeInformation()
            } catch (error) {
                // error handled in composable
            }
        }

        return {
            t,
            form,
            apiHelpers,
            visibleToOptions,
            publishingOptions,
            onSubmit,
            required,
            resetForm,
            refFormObserver,
            getValidationState,
            ClassicEditor,
            editorConfig,
        }
    },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';

.ck-editor__editable {
    min-height: 200px;
}
</style>
