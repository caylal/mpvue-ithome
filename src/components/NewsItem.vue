<template>
  <div class="news-item"  @click="detail" v-if="!news.lapinid">
      <img :src="news.image" alt="" class="news-image">
      <div class="news-content">
        <span class="news-title">{{news.title}}</span>
        <div class="news-info">
            <span class="date">{{news.postdate}}</span>
            <span class="comment" v-if="news.commentcount">{{news.commentcount}}评</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        news: Object,
        default() {
            return {}
        }
    },
    methods:{
        detail(){
            const {url} = this.news
            this.$router.push(url)
        }
    }
}
</script>

<style>
.news-item{
    display: flex;    
    height: 1.7rem;
    align-items: center;
    border-bottom: 1px solid #eee;
}
.news-image{
    width:2rem;
    height: 1.5rem;
}
.news-content{
    flex: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-around; 
    margin: 0 5px;   
}
.news-title{
    font-size: .28rem;
}
.news-info{
    color: #aaa;
    font-size: .25rem;
    display: flex;
    justify-content: space-between;
    margin-right: 5px;
}
</style>
