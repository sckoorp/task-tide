<script lang="ts" setup>
const theme = useColorMode();
const mode = computed({
  get() {
    return theme.value === "dark";
  },
  set() {
    theme.preference = theme.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <UButton
    :icon="mode ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
    color="white"
    variant="ghost"
    size="2xs"
    aria-label="Theme"
    @click="mode = !mode"
  />
</template>
