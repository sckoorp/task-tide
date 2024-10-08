<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import type { IUrl } from "~/types";

const pocketbase = usePocketbase();
const toast = useToast();

const isProcessing = ref(false);
const isDone = ref(false);
const shortened = ref("undefined");

const schema = z.object({
  url: z.string().url(),
});

const state = reactive({
  url: undefined,
});

const handleShortener = async (
  event: FormSubmitEvent<z.output<typeof schema>>
) => {
  const { url } = event.data;
  isProcessing.value = true;
  await pocketbase
    .collection("urls")
    .create({
      url,
    })
    .then((data) => {
      const { id } = data as IUrl;
      isProcessing.value = false;
      isDone.value = true;
      shortened.value = id;
      toast.add({
        title: "Creation Successful",
        description: "Your url has been created successfully!",
        color: "green",
      });
    })
    .catch(() => {
      isProcessing.value = false;
      toast.add({
        title: "Creation Unsuccessful",
        description: "Your url couldn't be created!",
        color: "red",
      });
    });
};

const handleCopy = async (value: string) => {
  await navigator.clipboard.writeText(value);
  toast.add({
    title: "Copied to Clipboard",
    description: "Your url has been copied successfully!",
    color: "green",
  });
};
</script>

<template>
  <UContainer class="flex flex-col justify-center items-center gap-8 h-[28rem]">
    <UContainer class="text-center space-y-2">
      <UHeader class="text-primary text-3xl font-bold">URL Shortener</UHeader>
      <UParagraph class="text-lg font-medium">
        Paste the URL to be shortened
      </UParagraph>
    </UContainer>
    <UContainer class="space-y-2 w-full md:w-96 px-6 md:px-0" v-if="isDone">
      <UBadge
        :label="'https://url.sckoorp.com/' + shortened"
        variant="subtle"
        size="lg"
        class="block text-center"
      />
      <UButton
        label="Copy"
        size="md"
        block
        :loading="isProcessing"
        @click="() => handleCopy(`https://url.sckoorp.com/${shortened}`)"
      />
      <UButton
        label="Go Back"
        color="white"
        size="md"
        block
        :loading="isProcessing"
        @click="
          () => {
            isDone = false;
            shortened = 'undefined';
            state.url = undefined;
          }
        "
      />
    </UContainer>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-2 w-full md:w-96 px-6 md:px-0"
      @submit="handleShortener"
      v-else
    >
      <UFormGroup name="url" required>
        <UInput
          type="url"
          icon="i-heroicons-link-solid"
          placeholder="https://github.com/sckoorp"
          size="xl"
          v-model="state.url"
        />
      </UFormGroup>
      <UButton
        type="submit"
        icon="i-heroicons-bolt"
        :label="isProcessing ? 'Processing' : 'Shorten'"
        size="md"
        block
        :loading="isProcessing"
      />
    </UForm>
    <UParagraph
      class="text-base font-normal text-center w-full md:w-96 px-6 md:px-0"
    >
      A simple URL shortening service that allows users to convert long URLs
      into shorter, more manageable links.
    </UParagraph>
  </UContainer>
</template>
