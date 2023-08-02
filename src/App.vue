<template>
    <div class="container mt-5">
        <div class="row m-0">
            <div class="col-lg-9 px-0">
                <div v-if="!isPostLoading">
                    <template v-if="posts.length > 0">
                        <h1 class="fs-1 text-center mb-0">Posts list</h1>

                        <SearchPostInput v-model="searchWord"/>

                        <PostList
                            :posts="searchedPost"
                            @remove="removePost"
                            @update="updatePost"
                        />
                    </template>

                    <h2 v-else class="fs-1 px-2 text-danger mb-0">Posts list is empty</h2>
                </div>

                <div v-else class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

            <div class="col-lg-3">
                <PostForm @create="createPost"/>
            </div>
        </div>
    </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import SearchPostInput from "@/components/SearchPostInput.vue";


export default {
    name: 'App',

    components: {
        SearchPostInput,
        PostForm,
        PostList
    },

    data() {
        return {
            posts: [],
            isPostLoading: false,
            searchWord: '',
        }
    },

    methods: {
        createPost(post) {
            this.posts.push(post)
        },
        removePost(post) {
            this.posts = this.posts.filter(e => e.id !== post.id)
        },
        updatePost(post) {
            this.posts.body = post.postUpdatedBody
            this.postUpdate = false
        },
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                setTimeout(async ()=> {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
                    this.posts = await response.json();
                    this.posts.reverse()
                    this.isPostLoading = false;
                }, 1000)

            } catch (e) {
                alert('Posts not found')
            }
        }
    },

    mounted() {
        this.fetchPosts();
    },

    computed: {
        searchedPost() {
            return [...this.posts].reverse().filter(post => post.title.toLowerCase().includes(this.searchWord.toLowerCase()))
        }
    }
}
</script>

<style>

</style>
