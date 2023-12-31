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

                        <!--  Pagination start! -->
                        <!--                        <nav class="sticky-bottom d-flex justify-content-center bg-white pt-3">-->
                        <!--                            <ul class="pagination">-->
                        <!--                                <li v-for="pageNumber in totalPages"-->
                        <!--                                    :key="pageNumber"-->
                        <!--                                    class="page-item"-->
                        <!--                                    :class="{-->
                        <!--                                        'active' : page === pageNumber-->
                        <!--                                    }"-->
                        <!--                                    aria-current="page"-->
                        <!--                                    style="cursor: pointer;"-->
                        <!--                                    @click="changePage(pageNumber)"-->
                        <!--                                >-->
                        <!--                                    <span class="page-link">{{ pageNumber }}</span>-->
                        <!--                                </li>-->
                        <!--                            </ul>-->
                        <!--                        </nav>-->
                        <!--  Pagination end! -->

                    </template>

                    <h2 v-else class="fs-1 px-2 text-danger mb-0">Posts list is empty</h2>
                </div>

                <div v-else>
                    <LoadingData/>
                </div>

                <div v-intersection="loadMorePosts" class="row row-cols-md-2 row-cols-1 m-0 g-3">
                    <div v-for="post in 2"
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

            <div class="col-lg-3">
                <PostForm @create="createPost"/>
            </div>
        </div>
    </div>
</template>

<script>
import PostList from "@/components/parts/PostList.vue";
import PostForm from "@/components/parts/PostForm.vue";
import SearchPostInput from "@/components/parts/SearchPostInput.vue";
import LoadingData from "@/components/parts/LoadingData.vue";
import axios from 'axios'

export default {
    name: 'MainPage',

    components: {
        LoadingData,
        SearchPostInput,
        PostForm,
        PostList
    },

    data() {
        return {
            posts: [],
            page: 1,
            limit: 10,
            totalPages: 0,
            searchWord: '',
            isCreatePostLoading: false,
            isPostLoading: false,
        }
    },

    methods: {
        createPost(post) {
            this.isCreatePostLoading = true;
            setTimeout(()=> {
                this.posts.unshift(post)
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
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    this.totalPages = Math.ceil(100 / this.limit);
                    this.posts = response.data;
                    this.isPostLoading = false;
                }, 700)

            } catch (e) {
                alert('Posts not found!')
            }
        },

        async loadMorePosts() {
            try {
                this.page += 1;
                setTimeout(async ()=> {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    this.totalPages = Math.ceil(100 / this.limit);
                    this.posts = [...this.posts, ...response.data];
                }, 400)

            } catch (e) {
                alert('Posts not found!')
            }
        },


        // changePage(pageNumber) {
        //     this.page = pageNumber;
        // }
    },

    mounted() {
        this.fetchPosts();
    },

    computed: {
        searchedPost() {
            return [...this.posts].filter(post => post.title.toLowerCase().includes(this.searchWord.toLowerCase()) || post.body.toLowerCase().includes(this.searchWord.toLowerCase()))
        }
    },

    watch: {
        // page() {
        //     this.fetchPosts()
        // }
    }
}
</script>

<style>
.spinner-border {
    width: 20px;
    height: 20px;
}
</style>
