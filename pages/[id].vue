<script lang="ts" setup>
import type { IUrl } from "~/types";

definePageMeta({ layout: "empty" });

const { id } = useRoute().params;
const pocketbase = usePocketbase();

const { data } = await useAsyncData<IUrl>(async () => {
  const url = await pocketbase.collection("urls").getOne(id as string);
  return url as IUrl;
});

onMounted(() => (window.location.href = data.value?.url!));
</script>

<template>
    <Head>
        <Title>Redirecting</Title>
    </Head>
    <UContainer class="flex flex-col justify-center items-center h-screen">
        <UButton label="Redirecting" color="white" variant="soft" loading />
    </UContainer>
</template>
