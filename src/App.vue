<template>
  <div>
    <nav class="navbar is-fixed-top">
    <div class="container">
      <div class="navbar-brand">
        <p><strong>JRE</strong> Alpha Search</p>
      </div>
      <div class="navbar-end">
        <form @submit.prevent="runSearch">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Pull that up Jamie" v-model="query">
            </div>
            <div class="control">
              <a class="button is-info" @click="runSearch">
                Search
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
    </nav>
    <div class="container" v-if="results.length != 0">
      <div class="columns" v-for="result in results" :key="result.id">
        <div class="column">
          <img :src="result._source.thumbnails.thumbnails[3].url"/>
        </div>
        <div class="column">
          <h1><strong>{{result._source.episode}}</strong> - {{result._source.guest}}</h1>
          <ul v-if="result.highlight.transcript.length > 0">
            <li v-for="(hi, index) in result.highlight.transcript" :key="result.id + index">
              {{hi}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import doSearch from './utils/doSearch'
export default {
  name: 'app',
  data(){
    return{
      query: '',
      results: []
    }
  },
  methods: {
    runSearch(){
      if(this.query == ''){
        alert("Please Input a search term")
        return
      }
      doSearch(this.query).then((res) => {
        console.log("Is this working?")
        this.results = res
      })
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
nav.navbar{
  display: block;
  box-shadow: 0px 1px 2px rgba(0,0,0,0.1);
}
nav.navbar p{
  margin: 0;
}
.navbar .container{
  padding: 10px 0 0; }

.navbar > .container{
  min-height: 0
}
.navbar-brand{
  padding-right: 20px;
}
.navbar-brand p{
  font-size: 1.5em;
  line-height: 1.5em;
}

</style>
