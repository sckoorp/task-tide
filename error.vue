<script lang="ts" setup>
const error = useError();
</script>

<template>
  <Head>
    <Title
      >{{
        error?.statusCode === 404
          ? "Not Found"
          : error?.statusCode === 500
          ? "Server Error"
          : "Error"
      }}
      - Sckoorp</Title
    >
  </Head>
  <UContainer class="flex flex-col justify-center items-center h-screen gap-2">
    <UParagraph class="text-primary text-5xl font-extrabold">{{
      error?.statusCode === 404
        ? "Not Found"
        : error?.statusCode === 500
        ? "Server Error"
        : "Error"
    }}</UParagraph>
    <UParagraph class="text-base font-normal">{{
      error?.statusCode === 404
        ? "Page Not Found"
        : error?.statusCode === 500
        ? "Internal Server Error"
        : "An Error Occurred"
    }}</UParagraph>
    <UButton
      label="Go Back"
      variant="soft"
      @click="() => clearError({ redirect: '/' })"
    />
  </UContainer>
</template>
