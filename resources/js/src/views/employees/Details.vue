<template>

  <!-- about -->
  <b-row v-if="user">
    <b-col sm="3">
      <b-card>
        <b-card-title>
          Details
        </b-card-title>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('ID') }}
          </h5>
          <b-card-text>
            {{ user.id }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('First Name') }}
          </h5>
          <b-card-text>
            {{ user.first_name }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Last Name') }}
          </h5>
          <b-card-text>
            {{ user.last_name }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Email') }}
          </h5>
          <b-card-text>
            {{ user.email }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Address') }}
          </h5>
          <b-card-text>
            {{ user.address }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Post Address') }}
          </h5>
          <b-card-text>
            {{ user.post_address }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Post Code') }}
          </h5>
          <b-card-text>
            {{ user.postal_code }}
          </b-card-text>
        </div>

        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Date of Birth') }}
          </h5>
          <b-card-text>
            {{ user.dob }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Gender') }}
          </h5>
          <b-card-text>
            {{ user.gender }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Phone') }}
          </h5>
          <b-card-text>
            {{ user.phone }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Citizen Country') }}
          </h5>
          <b-card-text>
            {{ user.citizen_country }}
          </b-card-text>
        </div>
      </b-card>
    </b-col>
    <b-col sm="3">
      <b-card>
        <b-card-title>
          {{ t('Employment Details') }}
        </b-card-title>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Employement Date') }}
          </h5>
          <b-card-text>
            {{ user.employement_date }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('End Date') }}
          </h5>
          <b-card-text>
            {{ user.end_date }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Position Percentage') }}
          </h5>
          <b-card-text>
            {{ user.position_percentage }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            {{ t('Job Description') }}
          </h5>
          <b-card-text>
            {{ user.description }}
          </b-card-text>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BCard, BCardText, BCardTitle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { onMounted } from '@vue/composition-api'
import useUsers from '@/composables/users'
import { useUtils as useI18nUtils } from '@core/libs/i18n'

export default {
  components: {
    BCardText,
    BCard,
    BCol,
    BRow,
    BCardTitle,
  },
  directives: {
    Ripple,
  },
  setup(_, { root }) {
    const { getUser, user } = useUsers()

    const { t } = useI18nUtils()


    onMounted(() => {
      getUser(root.$route.params.id)
    })

    return {
      t,
      user,
    }
  },
}
</script>
