<template>
    <div class="columns">
        <div class="column" v-if="id != 0">
          <Player :ytid="id" ref="yt" @ready="onPlayerReady" :playerVars="playerVars"></Player>
        </div>
        <div class="column">
            <h1 class="size-1 title">
                {{result._source.guest}}
            </h1>
            <h2 class="subtitle">
              {{result._source.episode}}
            </h2>
          <ul v-if="result.highlight.transcript.length > 0">
            <li v-for="(hi, index) in result.highlight.transcript" :key="index">
                <article class="media">
                    <figure class="media-left">
                        <a @click="changeTime(convert(hi).time)">
                            +
                        </a>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p v-html="convert(hi).clean">
                                {{convert(hi).clean}}
                            </p>
                        </div>
                    </div>
                </article>

            </li>
          </ul>
        </div>
    </div>
</template>
<script>
//https://github.com/darkylmnx/vue-youtube-iframe-api
import tranConv from '../utils/transcriptConversion'
import { Player } from 'vue-youtube-iframe-api'
export default {
    props: {
        result: {
            required: true,
            type: Object
        }
    },
    data(){
        return {
            offset: this.convert(this.result.highlight.transcript[0]).time,
            id: this.result._source.id,
            playerVars: {
                start: this.convert(this.result.highlight.transcript[0]).time
            }
        }
    },
    components: {
        Player
    },
    methods: {
        convert(tran){
            return tranConv(tran)
        },
        changeTime(time){
            this.$refs.yt.player.seekTo(time)
        },
        onPlayerReady () {
            // you have access to the ref here
            

            // you can see the full list of methods available here
            // https://developers.google.com/youtube/iframe_api_reference?hl=fr#Playback_controls
        }
    },
    destroyed(){
        console.log("are we destroying")
        this.$refs = null
    }

}
</script>
<style>
.box{
    margin-bottom: 20px;
}
img{
    width: 100%;
    border-radius: 3px;
}
em{
    font-style: normal;
    font-weight: bold;
    color: 000;
}
.column iframe{
    height: 360px;
}
.media{
    margin-bottom: 10px;
}

</style>
