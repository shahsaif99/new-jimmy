<template>
  <b-modal
    :visible="showing"
    :title="evaluationForm.id ? t('Edit Supplier Evaluation') : t('Add Supplier Evaluation')"
    size="xl"
    scrollable
    hide-footer
    @hidden="$emit('close')"
  >
    <b-overlay :show="loadingCriteria" variant="transparent" rounded="sm">
      <b-form @submit.prevent="onSubmit">
        <b-row class="mb-1">
          <b-col md="4">
            <b-form-group :label="t('Evaluation date')">
              <b-form-input v-model="evaluationForm.evaluation_date" type="date" required />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group :label="t('Performed by')">
              <InfiniteScrollSelect
                v-model="evaluationForm.performed_by"
                :options="formattedUsers"
                :has-next-page="isNextPageAvailable"
                :loading="busy"
                @onSearch="searchUsers"
                @onPaginate="currentPage++"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group :label="t('Result')">
              <b-form-select v-model="resultChoice" :options="resultChoices" />
              <small class="text-muted">
                {{ t('Calculated from the score; change it only to override.') }}
              </small>
            </b-form-group>
          </b-col>
        </b-row>

        <div v-for="(group, groupKey) in criteriaGroups" :key="groupKey" class="cs-panel mb-2">
          <h6 class="font-weight-bold mb-1">{{ group.label }}</h6>
          <b-table-simple responsive small class="mb-0">
            <b-thead>
              <b-tr>
                <b-th style="width: 55%">{{ t('Supplier criteria') }}</b-th>
                <b-th style="width: 15%" class="text-center">{{ t('Weight') }}</b-th>
                <b-th style="width: 15%" class="text-center">{{ t('Score (0-100)') }}</b-th>
                <b-th style="width: 15%" class="text-right">{{ t('Weighted') }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(criterion, key) in group.criteria" :key="key">
                <b-td>
                  <div>{{ criterion.name }}</div>
                  <small class="text-muted">{{ criterion.description }}</small>
                </b-td>
                <b-td class="text-center">{{ criterion.weight }}%</b-td>
                <b-td class="text-center">
                  <b-form-input
                    v-model.number="evaluationForm.scores[key]"
                    type="number"
                    min="0"
                    max="100"
                    size="sm"
                    required
                    class="cs-score-input"
                  />
                </b-td>
                <b-td class="text-right">
                  {{ weighted(key, criterion.weight) }}
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </div>

        <div class="cs-total d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <span class="text-muted mr-50">{{ t('Total score') }}</span>
            <span class="h3 mb-0">{{ totalScore.toFixed(2) }}</span>
            <small class="text-muted ml-50">/ 100</small>
          </div>
          <b-badge :variant="meetsRequirements ? 'light-success' : 'light-danger'" class="cs-result">
            {{ meetsRequirements ? t('Meets Requirements') : t('Does Not Meet Requirements') }}
          </b-badge>
        </div>

        <div class="d-flex justify-content-end mt-2">
          <b-button variant="outline-secondary" class="mr-1" @click="$emit('close')">
            {{ t('Cancel') }}
          </b-button>
          <b-button type="submit" variant="primary" :disabled="apiHelpers.saving">
            {{ evaluationForm.id ? t('Update') : t('Save') }}
          </b-button>
        </div>
      </b-form>
    </b-overlay>
  </b-modal>
</template>

<script>
import {
  BBadge,
  BButton,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BModal,
  BOverlay,
  BRow,
  BTableSimple,
  BTbody,
  BTd,
  BTh,
  BThead,
  BTr,
} from 'bootstrap-vue'
import { computed, onMounted, onUnmounted, ref, watch } from '@vue/composition-api'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
import useCustomerSupplier from '@/composables/customer-suppliers'
import useUsers from '@/composables/users'
import InfiniteScrollSelect from '@/views/components/InfiniteScrollSelect.vue'

export default {
  name: 'SupplierEvaluationForm',
  components: {
    BBadge,
    BButton,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BModal,
    BOverlay,
    BRow,
    BTableSimple,
    BTbody,
    BTd,
    BTh,
    BThead,
    BTr,
    InfiniteScrollSelect,
  },
  props: {
    showing: { type: Boolean, default: false },
    supplierId: { type: [Number, String], default: null },
  },
  setup(props, { emit }) {
    const { t } = useI18nUtils()
    const {
      evaluationForm,
      criteriaGroups,
      passMark,
      apiHelpers,
      fetchCriteria,
      saveEvaluation,
      computeScore,
    } = useCustomerSupplier()

    const { fetchUsers, users, searchQuery, currentPage, isNextPageAvailable, busy } = useUsers()

    const loadingCriteria = ref(true)
    const tempUsers = ref([])
    // "" means follow the calculated result; anything else overrides it.
    const resultChoice = ref('')

    const resultChoices = [
      { value: '', text: t('Automatic (from score)') },
      { value: 'meets_requirements', text: t('Meets Requirements') },
      { value: 'not_meet_requirements', text: t('Does Not Meet Requirements') },
    ]

    const totalScore = computed(() => computeScore(evaluationForm.scores || {}))


    const meetsRequirements = computed(() => {
      if (resultChoice.value) return resultChoice.value === 'meets_requirements'
      return totalScore.value >= passMark.value
    })

    const weighted = (key, weight) => {
      const value = Number(evaluationForm.scores[key]) || 0
      return ((value * weight) / 100).toFixed(2)
    }

    const searchUsers = (query) => {
      currentPage.value = 1
      searchQuery.value = query
      tempUsers.value = []
      fetchUsers()
    }

    const formattedUsers = computed(() => {
      const map = new Map()
      tempUsers.value.forEach((user) => {
        if (!map.has(user.id)) map.set(user.id, { value: user.id, label: user.name })
      })
      return Array.from(map.values())
    })

    watch(users, (newVal) => {
      tempUsers.value = [...tempUsers.value, ...newVal]
    })

    const onSubmit = async () => {
      try {
        if (props.supplierId) evaluationForm.supplier_id = props.supplierId
        evaluationForm.status = resultChoice.value || null
        await saveEvaluation()
        emit('saved')
      } catch (error) {
        // The reason is already on screen; leave the form up to correct.
      }
    }

    onMounted(async () => {
      fetchUsers()
      await fetchCriteria()

      // Every criterion needs a key present up front, otherwise typing into a
      // blank one would not be reactive.
      const scores = { ...(evaluationForm.scores || {}) }
      Object.values(criteriaGroups.value).forEach((group) => {
        Object.keys(group.criteria || {}).forEach((key) => {
          if (scores[key] === undefined) scores[key] = null
        })
      })
      evaluationForm.scores = scores

      // An existing evaluation whose stored result disagrees with its score was
      // overridden by hand, so keep showing it as an override.
      if (evaluationForm.id && evaluationForm.status) {
        const calculated = totalScore.value >= passMark.value
          ? 'meets_requirements'
          : 'not_meet_requirements'
        resultChoice.value = evaluationForm.status === calculated ? '' : evaluationForm.status
      }

      loadingCriteria.value = false
    })

    onUnmounted(() => {
      evaluationForm.reset()
    })

    return {
      t,
      evaluationForm,
      criteriaGroups,
      apiHelpers,
      loadingCriteria,
      totalScore,
      meetsRequirements,
      weighted,
      resultChoice,
      resultChoices,
      formattedUsers,
      isNextPageAvailable,
      busy,
      currentPage,
      searchUsers,
      onSubmit,
    }
  },
}
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
</style>

<style scoped lang="scss">
.cs-panel {
  border: 1px solid rgba(34, 41, 47, 0.08);
  border-radius: 0.428rem;
  padding: 1rem;
}

.cs-score-input {
  max-width: 6rem;
  margin: 0 auto;
}

.cs-total {
  border: 1px solid rgba(34, 41, 47, 0.08);
  border-radius: 0.428rem;
  padding: 1rem 1.25rem;
  background: rgba(115, 103, 240, 0.04);
}

.cs-result {
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
}
</style>
