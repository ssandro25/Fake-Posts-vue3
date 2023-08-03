<template>
    <div class="container mt-5">
        <div class="row m-0">
            <div class="col-lg-9 px-0 position-relative">
                <div v-if="!isPostLoading">
                    <template v-if="posts.length > 0">
                        <h1 class="d-flex align-items-center justify-content-center gap-2 mb-0">
                            <span class="fs-1">Posts list</span>

                            <span v-if="isCreatePostLoading" class="ms-2 pb-2">
                                <span class="spinner-border fs-6" role="status"></span>
                            </span>
                        </h1>

                        <SearchPostInput v-model="searchWord"/>

                        <PostList
                            :posts="searchedPost"
                            @remove="removePost"/>
                    </template>

                    <h2 v-else class="fs-1 px-2 text-danger mb-0">Posts list is empty</h2>
                </div>

                <div v-else>
                    <LoadingData/>
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
import LoadingData from "@/components/LoadingData.vue";


export default {
    name: 'App',

    components: {
        LoadingData,
        SearchPostInput,
        PostForm,
        PostList
    },

    data() {
        return {
            posts: [],
            isPostLoading: false,
            searchWord: '',
            isCreatePostLoading: false
        }
    },

    methods: {
        createPost(post) {
            this.isCreatePostLoading = true;
            setTimeout(()=> {
                this.posts.push(post)
                this.isCreatePostLoading = false;
            }, 500)

        },
        removePost(post) {
            this.posts = this.posts.filter(e => e.id !== post.id)
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
.spinner-border {
    width: 20px;
    height: 20px;
}
</style>
