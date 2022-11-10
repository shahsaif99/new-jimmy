<template>
  <b-navbar-nav class="nav">
    <b-nav-item>
      <feather-icon
        icon="CheckSquareIcon"
        size="21"
      />
      <b-tooltip
        triggers="hover"
        target="`bookmark-todo`"
        title="Todo"
        :delay="{ show: 1000, hide: 50 }"
      />
    </b-nav-item>
    <b-nav-item>
      <feather-icon
        icon="CalendarIcon"
        size="21"
      />
      <b-tooltip
        triggers="hover"
        target="`calendar-todo`"
        title="Todo"
        :delay="{ show: 1000, hide: 50 }"
      />
    </b-nav-item>
    <b-nav-item>
      <feather-icon
        icon="MessageSquareIcon"
        size="21"
      />
      <b-tooltip
        triggers="hover"
        target="`calendar-todo`"
        title="Todo"
        :delay="{ show: 1000, hide: 50 }"
      />
    </b-nav-item>
    <b-nav-item>
      <feather-icon
        icon="MailIcon"
        size="21"
      />
      <b-tooltip
        triggers="hover"
        target="`calendar-todo`"
        title="Todo"
        :delay="{ show: 1000, hide: 50 }"
      />
    </b-nav-item>
    <!-- <b-nav-item
      v-for="(bookmark, index) in bookmarks"
      :id="`bookmark-${index}`"
      :key="index"
      :to="bookmark.route"
    >
      <feather-icon
        :icon="bookmark.icon"
        size="21"
      />
      <b-tooltip
        triggers="hover"
        :target="`bookmark-${index}`"
        :title="bookmark.title"
        :delay="{ show: 1000, hide: 50 }"
      />
    </b-nav-item>
    <b-nav-item-dropdown
      link-classes="bookmark-star"
      lazy
      @hidden="resetsearchQuery"
    >
      <feather-icon
        slot="button-content"
        icon="StarIcon"
        size="21"
        class="text-warning"
      />

      <li style="min-width:300px">
        <div class="p-1">
          <b-form-input
            id="boomark-search-input"
            v-model="searchQuery"
            placeholder="Explore Vuexy..."
            autofocus
          />
        </div>
        <vue-perfect-scrollbar
          :settings="perfectScrollbarSettings"
          class="search-list search-list-bookmark scroll-area"
          :class="{'show': filteredData.pages && filteredData.pages.length }"
          tagname="ul"
        >

          <b-dropdown-item
            v-for="(suggestion, index) in filteredData.pages || bookmarks"
            :key="index"
            class="suggestion-group-suggestion cursor-pointer"
            link-class="d-flex align-items-center"
            :to="suggestion.route"
            @mouseenter="currentSelected = index"
          >
            <feather-icon
              :icon="suggestion.icon"
              class="mr-75"
              size="18"
            />
            <span class="align-middle">{{ suggestion.title }}</span>
            <feather-icon
              icon="StarIcon"
              class="ml-auto"
              size="16"
              :class="{'text-warning': suggestion.isBookmarked}"
              @click.stop.prevent="toggleBookmarked(suggestion)"
            />

          </b-dropdown-item>
          <b-dropdown-item
            v-show="!(filteredData.pages && filteredData.pages.length) && searchQuery"
            disabled
          >
            No Results Found.
          </b-dropdown-item></vue-perfect-scrollbar>
      </li>
    </b-nav-item-dropdown> -->

  </b-navbar-nav>
</template>

<script>
import {
  BNavbarNav, BNavItem, BTooltip,
} from 'bootstrap-vue'

export default {
  components: {
    BNavbarNav, BNavItem, BTooltip,
  },
  setup() {

  },
}
</script>
<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
ul
{
  list-style: none;
  padding: 0;
  margin: 0;
}
p {
  margin: 0;
}

.nav-bookmar-content-overlay {
    position: fixed;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
    z-index: -1;

    &:not(.show) {
      pointer-events: none;
    }
    &.show {
      cursor: pointer;
      z-index: 10;
      opacity: 1;
    }
}
</style>
