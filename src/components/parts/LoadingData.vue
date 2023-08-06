<template>
    <div>
        <h1 class="fs-1 text-center mb-0">Posts list</h1>

        <SearchPostInput/>

        <div class="row row-cols-md-2 row-cols-1 m-0 g-3">
            <div v-for="post in 4"
                 :key="post"
                 class="col px-2">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-12"></span>
                        </h5>

                        <p class="card-text placeholder-glow mt-3">
                            <span class="placeholder col-12 h-100"></span>
                        </p>
                    </div>

                    <div class="card-footer d-flex justify-content-between placeholder-glow">
                        <div class="placeholder col-5" style="height: 30px"></div>

                        <div class="placeholder col-5" style="height: 30px"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import SearchPostInput from "@/components/parts/SearchPostInput.vue";

export default {
    components: {
        SearchPostInput
    }
}
</script>

<style scoped>
.card-title {
    height: 48px;
}

.card-text {
    height: 72px;
}
</style>