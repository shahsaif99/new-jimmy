<template>
    <li
        v-if="canViewVerticalNavMenuLink(item)"
        class="nav-item"
        :class="{
            active: isActive,
            disabled: item.disabled,
        }"
        :key="notifications.count"
    >
        <b-link
            v-bind="linkProps"
            class="d-flex align-items-center position-relative"
        >
            <feather-icon :icon="item.icon || 'CircleIcon'" />
            <span class="menu-title text-truncate">{{ t(item.title) }}</span>
            <b-badge
                v-if="item.tag"
                pill
                :variant="item.tagVariant || 'primary'"
                class="mr-1 ml-auto"
            >
                {{ item.tag }}
            </b-badge>
            <span
                style="
                    left: 90px;
                    top: 5px;
                    border: 1px solid #ff4545;
                    background: #ff4545;
                    color: #fff;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    font-size: 12px;
                "
                class="d-flex justify-content-center align-items-center position-absolute"
                v-if="item.route === 'tasks' && notifications.count > 0"
            >
                {{ notifications.count }}
            </span>
        </b-link>
    </li>
</template>

<script>
import { useUtils as useAclUtils } from "@core/libs/acl";
import { BLink, BBadge } from "bootstrap-vue";
import { useUtils as useI18nUtils } from "@core/libs/i18n";
import useVerticalNavMenuLink from "./useVerticalNavMenuLink";
import mixinVerticalNavMenuLink from "./mixinVerticalNavMenuLink";
import useUsers from "@/composables/users";

export default {
    components: {
        BLink,
        BBadge,
    },
    mixins: [mixinVerticalNavMenuLink],
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(
            props.item
        );
        const { t } = useI18nUtils();
        const { canViewVerticalNavMenuLink } = useAclUtils();
        const { notifications } = useUsers();
        return {
            isActive,
            linkProps,
            updateIsActive,

            // ACL
            canViewVerticalNavMenuLink,

            // i18n
            t,
            notifications,
        };
    },
};
</script>
