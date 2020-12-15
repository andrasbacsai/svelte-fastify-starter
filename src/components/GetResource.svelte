<script>
    import { fetch } from "../store";
    let error = "";
    let data = "";
    async function getPrivate() {
        try {
            data = (await $fetch("/api/v1/hey")).data;
        } catch (e) {
            error = e.error;
        }
    }
</script>

<div class="h-24">
    <button
        class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-300"
        on:click={getPrivate}>Get private API endpoint</button>
    <div class:text-red-500={error}>
        <div>{error ? error : data}</div>
    </div>
</div>
