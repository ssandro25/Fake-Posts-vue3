<template>

    <TransitionGroup name="list"
                     tag="div"
                     class="row row-cols-md-2 row-cols-1 m-0 g-3">
        <div v-for="post in posts"
             :key="post.id"
             class="col px-2">
            <PostItem
                :post="post"
                @remove="$emit('remove', post)"
                @update="updatePost"
            />
        </div>
    </TransitionGroup>

</template>

<script>
import PostItem from "@/components/parts/PostItem.vue";

export default {
    name: 'PostList',

    components: {
        PostItem
    },

    props: {
        posts: {
            type: Array,
            required: true
        }
    },

    methods: {
        updatePost(postId, updatedBody) {
            const posts = this.posts.find(post => post.id === postId);
            if (posts) {
                posts.body = updatedBody;
            }
        }
    }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
.list-move {
    transition: transform .8s ease;
}
</style>
