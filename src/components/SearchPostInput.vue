<template>
    <div class="mx-2">
        <input type="search"
               class="form-control form-control-lg mt-3"
               placeholder="Enter word"
               :value="modelValue"
               @input="updateInput"
        >
    </div>
</template>

<script>
export default {
    name: 'SearchPostInput',

    props: {
        modelValue: {
            type: String
        }
    },

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>