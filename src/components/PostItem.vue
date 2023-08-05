<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title text-capitalize">{{ post.id}} {{ post.title }}</h5>

            <p class="card-text mt-3">
                <span v-if="!postUpdate">{{ post.body }}</span>

                <textarea v-else v-model="postUpdatedBody" class="form-control form-control-lg updated_post_input" style="height: 72px;"/>
            </p>
        </div>
        
        <div class="card-footer d-flex justify-content-between">
            <div>
                <button
                    v-if="!postUpdate"
                    class="btn btn-sm btn-light border"
                    title="Edit post"
                    @click="editPost"
                >
                    <i class="fa-regular fa-pen-to-square"></i>
                    <span class="ms-2">Edit post</span>
                </button>

                <div v-else class="d-flex gap-2">
                    <button class="btn btn-sm btn-secondary" @click="postUpdate = false">Cancel</button>

                    <button class="btn btn-sm btn-success" @click="savePost">Save</button>
                </div>
            </div>

            <button
                class="btn btn-sm btn-danger"
                title="Delete post"
                @click="$emit('remove', post)"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostItem',

    data() {
        return {
            postUpdatedBody: this.post.body,
            postUpdate: false
        }
    },

    props: {
        post: {
            type: Object,
            required: true,
        }
    },

    methods: {
        editPost() {
            this.postUpdate = true
        },
        savePost() {
            this.$emit('update', this.post.id, this.postUpdatedBody);
            this.postUpdate = false;
        },
    }
}
</script>

<style scoped>
.card-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 48px;
}
.card-body {
    position: relative;
}
.card-body::after {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    top: 72px;
    background: #cecece;
}
.card-text span {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 72px;
}
.updated_post_input {
    font-size: 14px;
}
</style>
