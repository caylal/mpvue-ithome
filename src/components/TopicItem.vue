<template>
  <div class="topic-item" @click="comment(item)">
      <img src="/static/assets/avatar_default.png" class="topic-headimg">
      <img :src="item.author.headimg" class="topic-headimg">
      <div class="topic-title">{{item.tag}} {{item.title}}</div>
      <div class="topic-info">
          <div class="topic-i-item">{{item.author.nickname}}</div>  
          <div class="topic-i-item">{{item.type}}</div>
          <div class="topic-i-item">
            <img src="/static/assets/quan_hit.png" class="topic-i-icon"> 
            <span class="topic-i-text">{{item.viewcount}}</span>   
          </div>
          <div class="topic-i-item">
            <img src="/static/assets/quan_comment.png" class="topic-i-icon"> 
            <span class="topic-i-text">{{item.relaycount}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        comment(obj){
            this.$router.push({
                path: '/pages/comment/main',
                query: {
                    id: obj.id,
                    title: obj.title,
                    author: obj.author,
                    vc: obj.viewcount
                }
            })
        }
    }
}
</script>

<style>
.topic-item{
    padding: 10px 10px 10px 60px;
    border-bottom: 1px solid #eee;
    position: relative;

}
.topic-headimg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    left: 10px;
    top: 15px;
}
.topic-title{
    font-size: .30rem;
}
.topic-info{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
}
.topic-i-item{
    margin-left: 10px;
    font-size: .25rem;
    color: #aaa;
    display: flex;
    align-items: center;
}
.topic-i-icon{
    width: 15px;
    height: 15px;
    margin-right: 4px;
}

</style>
