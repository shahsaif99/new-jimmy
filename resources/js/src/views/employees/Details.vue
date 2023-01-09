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
            First Name
          </h5>
          <b-card-text>
            {{ user.first_name }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Last Name
          </h5>
          <b-card-text>
            {{ user.last_name }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Email
          </h5>
          <b-card-text>
            {{ user.email }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Employee Number
          </h5>
          <b-card-text>
            {{ user.employee_number }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Address
          </h5>
          <b-card-text>
            {{ user.address }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Post Address
          </h5>
          <b-card-text>
            {{ user.post_address }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Post Code
          </h5>
          <b-card-text>
            {{ user.postal_code }}
          </b-card-text>
        </div>

        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Date of Birth
          </h5>
          <b-card-text>
            {{ user.dob }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Gender
          </h5>
          <b-card-text>
            {{ user.gender }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Phone
          </h5>
          <b-card-text>
            {{ user.phone }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Citizen Country
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
          Employment Details
        </b-card-title>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Employement Date
          </h5>
          <b-card-text>
            {{ user.employement_date }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            End Date
          </h5>
          <b-card-text>
            {{ user.end_date }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Position Percentage
          </h5>
          <b-card-text>
            {{ user.position_percentage }}
          </b-card-text>
        </div>
        <div class="mt-1">
          <h5 class="text-capitalize m-0">
            Job Description
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
// import useAccount from '@/composables/admin/account'
import useUsers from '@/composables/users'

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

    onMounted(() => {
      getUser(root.$route.params.id)
    })

    return {
      user,
    }
  },
}
</script>
