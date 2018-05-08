<template>
  <div class="contain">
      <div class="title">{{item.title}}</div>
      <div class="num">1楼</div>
      <div class="info">
          <div class="info-item">
              <img src="/static/assets/quan_hit.png" alt="" class="info-icon">
              <span class="info-text">{{item.vc}}</span>
          </div>
          <div class="info-item">
              <img src="/static/assets/quan_comment.png" alt="" class="info-icon">
              <span class="info-text">{{item.rc}}</span>
          </div>
      </div>
      <div class="content">
          <div v-html="item.content"></div>
      </div>
      <div class="comment">

      </div>
  </div>
</template>

<script>
import {api} from '../../utils/api'
export default {
    data() {
        return {
            item: {}
        }        
    },
    mounted(){
        this.getTopic()
    },
    methods: {
        async getTopic (){
            const {query} = this.$route
            const topic = await api.getTopic(query.id)
            console.log("topic-comment:" + JSON.stringify(topic))
            if(!topic) return 
            topic.content = topic.content.replace('!--IMG_1--', `img src="${topic.imgs[0]}" width="100%" /`)
            topic.reply = topic.reply.map(item => {
                 return {
                    id: item.M.Ci,
                    author: item.M.N,
                    phone: item.M.Ta,
                    floor: item.M.SF || `${item.F}楼`,
                    content: item.M.C.replace(/<img/g, '<img width="100%"')
                }
            })
            this.item = Object.assign({
                title: query.title,
                vc: query.vc
            }, topic)
        },
        async getComment(){
            
        }

        
    }
}
</script>

<style>
.title{
    width: 100%;
    padding: .2rem;
    box-sizing: border-box;
    font-size: .35rem;
}
.num{
    font-size: .25rem;
    position: absolute;
    right: .15rem;
    top: .8rem;
}
.info{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 .2rem .2rem;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
}
.info-item{
    margin-right: .2rem;
    font-size: .24rem;
    color: #aaa;
    display: flex;
    align-items: center;
}
.info-icon{
    width: 15px;
    height: 15px;
    margin-right: 4px;
}
.content{
    width: 100%;
    font-size: .3rem;
    padding: .2rem;
    line-height: 1.5;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    min-height: 50px;
}
</style>
