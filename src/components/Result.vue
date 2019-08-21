<template>
    <div class="columns is-vcentered">
        <div class="column" v-if="id != 0">
          <Player :ytid="id" ref="yt" @ready="onPlayerReady" :playerVars="playerVars"></Player>
        </div>
        <div class="column">
            <h1 class="title is-size-2">
                {{result._source.guest}}
            </h1>
          <ul v-if="result.highlight.transcript.length > 0">
            <li v-for="(hi, index) in result.highlight.transcript" :key="index">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <p class="is-size-6">
                                <a @click="changeTime(convert(hi).time)">
                                <span v-html="convert(hi).clean">
                                    {{convert(hi).clean}}
                                </span>
                                </a>
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
<style lang="less"> 
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
.media-content{
    .content{
        a{
            color: inherit;
        }
        span{
            display: inline;
            background: #fff;
            padding: 0;
            line-height:2em;
            transition: 0.5s;
            border-bottom: 2px solid transparent;
            &:hover{
                border-bottom: 2px solid hsl(48, 100%, 67%);
                em{
                    background: hsl(48, 100%, 67%);
                }
            }
            em{
                background: #209cee;
                color: #fff;
                font-weight: normal;
                padding: 0 2px;
                transition: 0.5s;
            }
        }
    }
}

</style>
