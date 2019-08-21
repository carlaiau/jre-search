<template>
    <section class="hero is-light is-fullheight">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">JRE Search</h1>
                <form @submit.prevent="runSearch">
                    <div class="field has-addons">
                        <div class="control">
                            <input class="input is-medium" type="text" placeholder="Pull that up Jamie" v-model="query">
                        </div>
                        <div class="control">
                            <a class="button is-medium is-success" @click="runSearch">
                            Search
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    export default{
        data(){
            return {
                query: ''
            }
        },
        methods: {
            runSearch(){
                if(this.newQuery == ''){
                    alert("Please Input a search term")
                    return
                }  
                this.$router.push({ name: 'SearchResult', params: { query: this.query } })
            }
        }

    }
</script>

<style module>
</style>