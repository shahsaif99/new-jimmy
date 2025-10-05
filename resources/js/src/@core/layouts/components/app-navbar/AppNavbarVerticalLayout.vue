<template>
    <div class="navbar-container d-flex content align-items-center">
        <!-- Nav Menu Toggler -->
        <ul class="nav navbar-nav d-xl-none">
            <li class="nav-item">
                <b-link class="nav-link" @click="toggleVerticalMenuActive">
                    <feather-icon icon="MenuIcon" size="21" />
                </b-link>
            </li>
        </ul>

        <!-- Left Col -->
        <div
            class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
        >
            <dark-Toggler class="d-none d-lg-block" />
            <!-- <bookmarks /> -->
        </div>

        <b-navbar-nav class="nav align-items-center ml-auto">
            <Locale />
            <!-- <search-bar /> -->
            <!-- <notification-dropdown /> -->
            <user-dropdown />
        </b-navbar-nav>
        <!-- <Translator /> -->
    </div>
</template>

<script>
import { BLink, BNavbarNav } from "bootstrap-vue";
// import Bookmarks from './components/Bookmarks.vue'

// import SearchBar from './components/SearchBar.vue'
// import { Translator } from 'vue-google-translate'
import DarkToggler from "./components/DarkToggler.vue";
// import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from "./components/UserDropdown.vue";
import Locale from "./components/Locale.vue";
import useJwt from "@/auth/jwt/useJwt";
import useUsers from "@/composables/users";
import useTasks from "@/composables/tasks";
import toaster from "@/composables/toaster";

export default {
    components: {
        BLink,
        Locale,
        // Navbar Components
        BNavbarNav,
        // SearchBar,
        DarkToggler,
        // Bookmarks,
        // NotificationDropdown,
        UserDropdown,
    },
    props: {
        toggleVerticalMenuActive: {
            type: Function,
            default: () => {},
        },
    },
    mounted() {
        const userData = JSON.parse(useJwt.getUserData());
        const { notifications } = useUsers();
        const { getUnreadNotifications } = useTasks();
        getUnreadNotifications()

        window.Echo.channel(`users.${userData.id}`).notification(
            (notification) => {
                notifications.addCount();
                toaster().success("New task assign to you");
            }
        );
    },
};
</script>
