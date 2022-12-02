<template>
  <b-modal
    cancel-variant="outline-secondary"
    centered
    :hide-footer="true"
    title="Add Employee"
    size="lg"
    class="modal-add-new-employee"
    id="add-new-employee"
    @close="$emit('update:add-employee-active', false)"
    :visible="addEmployeeActive"
    @hide="$emit('update:add-customer-active', false)"
    @change="$emit('update:add-customer-active', false)"
  >
    <div>
      <form-wizard
        color="#7367F0"
        :title="null"
        :subtitle="null"
        shape="square"
        finish-button-text="Submit"
        back-button-text="Previous"
        @on-complete="formSubmitted"
      >

        <!-- accoint details tab -->
        <tab-content
          title="Employee Details"
          :before-change="validationForm"
        >
          <validation-observer
            ref="accountRules"
            tag="form"
          >
            <b-row>
              <b-col md="8">
                <b-form-group
                  label="Name"
                  label-for="name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="username"
                    rules="required"
                  >
                    <b-form-input
                      id="name"
                      v-model="name"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter Name"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="Employee Number"
                  label-for="employeeNumber"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="employee number"
                    rules="required"
                  >
                    <b-form-input
                      id="employeeNumber"
                      v-model="employeeNumber"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter employee number"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group
                  label="Address"
                  label-for="address"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Address"
                    vid="Address"
                    rules="required"
                  >
                    <b-form-input
                      id="address"
                      v-model="address"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter Address"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="8">
                <b-form-group
                  label="Post Address"
                  label-for="postAddress"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Postal address"
                    rules="required"
                  >
                    <b-form-input
                      id="postAddress"
                      v-model="postAddress"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter Postal address"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="Post code"
                  label-for="postcode"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="post code"
                    rules="required"
                  >
                    <b-form-input
                      id="postCode"
                      v-model="postCode"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter post code"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="Date of Birth"
                  label-for="dob"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Date of Birth"
                    rules="required"
                  >
                    <b-form-datepicker
                      id="dateOfBirth"
                      v-model="dateOfBirth"
                      placeholder="Enter Date of Birth"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Sex"
                  label-for="sex"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="gender"
                    rules="required"
                  >
                    <v-select
                      id="gender"
                      v-model="gender"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="options"
                      :selectable="option => ! option.value.includes('select_value')"
                      label="text"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="Phone Number"
                  label-for="phonenumber"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="phone"
                    rules="required"
                  >
                    <b-form-input
                      id="postcode"
                      v-model="phonenumber"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter Phone Number"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Citizen Country"
                  label-for="citizencountry"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="citizen country"
                    rules="required"
                  >
                    <b-form-input
                      id="postcode"
                      v-model="citizenCountry"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter Citizen Country"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="8">
                <b-form-group
                  label="Email"
                  label-for="email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="email"
                      v-model="emailValue"
                      type="email"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter Email"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </validation-observer>
        </tab-content>


        <!-- personal details tab -->
        <tab-content
          title="User Information"
          :before-change="validationFormInfo"
        >
          <validation-observer
            ref="infoRules"
            tag="form"
          >
            <b-row>
              <b-col
                cols="8"
              >
                <b-form-group
                  label="Username"
                  label-for="username"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="username"
                    rules="required"
                  >
                    <b-form-input
                      id="username"
                      v-model="userName"
                      placeholder="Enter Username"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  label="Just logged in"
                  label-for="lastloggedin"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="lastloggedin"
                    rules="required"
                  >
                    <b-form-input
                      id="lastloggedin"
                      v-model="lastLoggedIn"
                      type="date"
                      :state="errors.length > 0 ? false:null"
                      placeholder="00.00.0000"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="8">
                <b-form-group
                  label="Password"
                  label-for="password"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="password"
                    rules="required|password"
                  >
                    <b-form-input
                      id="lastloggedin"
                      v-model="passwordValue"
                      type="password"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter password"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </validation-observer>
        </tab-content>

        <!-- address  -->
        <tab-content
          title="Employment Relationship"
          :before-change="validationFormAddress"
        >
          <validation-observer
            ref="addressRules"
            tag="form"
          >
            <b-row>
              <b-col md="6">
                <b-form-group
                  label="Date of Employment"
                  label-for="doe"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Date of Employment"
                    rules="required"
                  >
                    <b-form-datepicker
                      id="dateofemployment"
                      v-model="dateOfEmployment"
                      placeholder="Enter date of employment"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="End Date"
                  label-for="enddates"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="end date"
                  >
                    <b-form-datepicker
                      id="enddate"
                      v-model="endDate"
                      placeholder="Enter End date"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="8">
                <b-form-group
                  label="Description"
                  label-for="description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="description"
                    rules="required"
                  >
                    <b-form-input
                      id="description"
                      v-model="description"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter Job description"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="4">
                <b-form-group
                  label="Position Percentage"
                  label-for="percentage"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="percentage"
                    rules="required"
                  >
                    <b-form-input
                      id="percentage"
                      v-model="percentage"
                      type="number"
                      :state="errors.length > 0 ? false:null"
                      placeholder="Enter Position Percentage"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </validation-observer>
        </tab-content>
      </form-wizard>

    </div>
  </b-modal></template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormDatepicker,
} from 'bootstrap-vue'
import { required, email, password } from '@validations'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    BFormDatepicker,
  },
  model: {
    prop: 'addEmployeeActive',
    event: 'update:add-employee-active',
  },
  props: {
    addEmployeeActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      emailcorr: '',
      passwordValue: '',
      emailValue: '',
      endDate: '',
      address: '',
      postAddress: '',
      percentage: '',
      postCode: '',
      userName: '',
      dateOfBirth: '',
      dateOfEmployment: '',
      required,
      gender: '',
      employeeNumber: '',
      citizenCountry: '',
      description: '',
      lastLoggedIn: '',
      phonenumber: '',
      email,
      password,
      options: [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' },
      ],
    }
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormAddress() {
      return new Promise((resolve, reject) => {
        this.$refs.addressRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormSocial() {
      return new Promise((resolve, reject) => {
        this.$refs.socialRules.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  #add-new-employee .modal-dialog {
    max-width: 805px;
  }
</style>
