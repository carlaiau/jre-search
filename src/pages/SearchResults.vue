<template>
<div>
    <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
          <router-link :to="{name: 'Home'}">
              <p><strong>JRE</strong> Search</p>
          </router-link>
      </div>
      <div class="navbar-end">
        <form @submit.prevent="runSearch">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Pull that up Jamie" v-model="newQuery">
            </div>
            <div class="control">
              <a class="button is-success" @click="runSearch">
                Search
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
    </nav>
    <div class="container mainResults" v-if="results.length != 0">
      <result v-for="result in results" :key="result.id" :result="result"/>
    </div>
</div>
</template>

<script>
import doSearch from '../utils/doSearch'
import result from '../components/Result'
export default {
    components: {
        result
    },
    props: {
        query: {
            required: true,
            type: String
        }
    },
    data(){
        return{
            newQuery: '',
            results: []
        }
    },
    mounted(){
        this.newQuery = this.query
        doSearch(this.query).then((res) => {
            this.results = res
        })
        
    },
    methods: {
        runSearch(){
            if(this.newQuery == ''){
                alert("Please Input a search term")
                return
            }  
            this.$router.push({ name: 'SearchResult', params: { query: this.newQuery } })
        }
    },
    watch: {
        '$route' (to, from) {
            if(to !== from){
                doSearch(this.query).then((res) => {
                    this.results = []
                    this.results = res
                })
            }
        }
    }
}

</script>

<style lang="less">
body{
  background: #fafafa;
}
.container.mainResults{
  margin-top: 62px;
  padding: 50px 0;
}
nav.navbar{
  a{
    color: #000;
  }
  display: block;
  box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
  p{
    margin: 0
  }
  & > .container{
    min-height: 0;
    padding: 10px 0 0;
  }
  .navbar-brand{
    padding-right: 20px;
    p{
      font-size: 1.5em;
      line-height: 1.5em;
    }
  }
}
</style>
