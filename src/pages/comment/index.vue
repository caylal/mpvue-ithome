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
          <comment-item v-for="(item, index) in item.reply" :key="index" :item="item"></comment-item>
      </div>
  </div>
</template>

<script>
import {api} from '../../utils/api'
import { formatComments } from '@/utils'
import CommentItem from '../../components/CommentItem'
export default {
    components:{
        CommentItem
    },
    data() {
        return {
            item: {},            
        }        
    },
    mounted(){
        this.getTopic()
    },
    onReachBottom () {
        console.log("下拉刷新")       
        wx.showLoading({
            title: '玩命加载中'
        })
        this.getComment()
    },
    methods: {
        async getTopic (){
            const query = this.$route.query
            const topic = await api.getTopic(query.id)
            console.log("topic-comment:" + JSON.stringify(topic))
            if(!topic) return 
            topic.content = topic.content.replace('!--IMG_1--', `img src="${topic.imgs[0]}" width="100%" /`)
            topic.reply = topic.reply.map(formatComments)
            this.item = Object.assign({
                title: query.title,
                vc: query.vc
            }, topic)
        },
        async getComment(){           
            const { query } = this.$route
            console.log("getCquery" + JSON.stringify(query) )
            const comment = this.item.reply
             console.log("getComment" + comment)
            const lastComment = comment[comment.length - 1]           
            const newComment = await api.getTopicComment({
                postid: query.id,
                replyidlessthan: lastComment.id,
            })
            console.log("comment-list:" + JSON.stringify(newComment))
            if(newComment.length < 0) return

            const formatedComments = newComment.map(formatComments)
            this.item.reply = this.item.reply.concat(formatedComments)         
            wx.stopPullDownRefresh()      
            wx.hideLoading()          
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
