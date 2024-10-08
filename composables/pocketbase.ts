import Pocketbase from "pocketbase";

export const usePocketbase = () => {
    const config = useRuntimeConfig();
    const pb = new Pocketbase(config.public.POCKETBASE_URL as string);
    return pb
}