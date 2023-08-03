<template>
    <div class="shadow rounded p-3 sticky-lg-top" style="top: 16px;">
        <div>
            <input
                v-model="post.title"
                type="text"
                class="form-control"
                placeholder="Post title"
            >
        </div>

        <div class="mt-3">
            <textarea
                v-model="post.body"
                type="text"
                class="form-control"
                rows="4"
                placeholder="Post description"
            />
        </div>

        <div class="mt-3">
            <button
                v-if="!isCreatePostLoading"
                @click="createPost"
                class="btn btn-primary w-100"
            >
                Create post
            </button>

            <button
                v-else
                class="btn btn-primary w-100"
                type="button" disabled
            >
                <span class="spinner-grow spinner-grow-sm me-1" aria-hidden="true"></span>
                <span role="status">Loading...</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostForm',

    data() {
        return {
            post: {
                title: '',
                body: '',
                id: ''
            },

            isCreatePostLoading: false
        }
    },

    methods: {
        createPost() {
            this.isCreatePostLoading = true
            setTimeout(()=> {
                this.$emit('create', this.post);
                this.post = {
                    title: '',
                    body: '',
                    id: Date.now()
                }
                this.isCreatePostLoading = false
            }, 500)

        }
    }
}
</script>
