<template>
  <b-card no-body>
    <b-card-body class="d-flex justify-content-between align-items-center">
      <b-media
        no-body
      >
        <b-media-aside

          class="mr-2"
        >
          <b-avatar
            size="48"
            :variant="`light-${color}`"
          >
            <feather-icon
              size="24"
              :icon="icon"
            />
          </b-avatar>
        </b-media-aside>
        <b-media-body class="my-auto">
          <h4 class="font-weight-bolder mb-0">
            {{ statistic }}
          </h4>
          <b-card-text class="font-small-3 mb-0">
            {{ statisticTitle }}
          </b-card-text>
        </b-media-body>
      </b-media>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BAvatar, BMedia, BMediaBody, BCardText, BMediaAside,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardBody,
    BAvatar,
    BMedia,
    BMediaBody,
    BCardText,
    BMediaAside,
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
    statistic: {
      type: [Number, String],
      required: true,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
