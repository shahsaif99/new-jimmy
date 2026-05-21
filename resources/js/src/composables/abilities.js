import { computed } from "@vue/composition-api";

function readAbilities() {
    try {
        const raw = localStorage.getItem("abilities");
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

export default function useAbilities() {
    const abilities = computed(() => readAbilities());

    const can = (permission) => {
        if (!permission) return true;
        return abilities.value.includes(permission);
    };

    return { abilities, can };
}
