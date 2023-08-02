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
                @click="createPost"
                class="btn btn-primary w-100"
            >
                Create post
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
            }
        }
    },

    methods: {
        createPost() {
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: '',
                id: Date.now()
            }
        }
    }
}
</script>
