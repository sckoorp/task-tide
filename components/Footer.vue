<script lang="ts" setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <UContainer class="flex justify-center items-center gap-2 p-8">
    <UParagraph class="text-sm font-normal">
      ©{{ currentYear }}, Url Shortener
    </UParagraph>
    <Theme />
  </UContainer>
</template>
