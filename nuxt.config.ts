// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxt/ui", "@nuxt/fonts", "@nuxt/image"],
    devtools: { enabled: true },
    colorMode: { preference: "dark" },
    runtimeConfig: {
        public: { POCKETBASE_URL: process.env.POCKETBASE_URL }
    }
});