<template>
  <div class="container">  
      <swiper class="swiper-box" indicator-dots autoplay  circular indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="rgba(210, 34, 34, .7)" >
        <swiper-item v-for="(slide, index) in slides " :key="index">
          <div class="slide-item" @click="$router.push(slide.url)">
            <span class="slide-title">{{slide.title}}</span>
            <img class="slide-img" :src="slide.image" alt="图片">
          </div>
        </swiper-item>
      </swiper>

      <div class="news">
        <news-item v-for="(item, index) in news" :key="index" :news="item"></news-item>
      </div>
      <div class="nomore">只给看这么多</div>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import NewsItem from '../../components/NewsItem'
export default {
  components: {
    NewsItem
  },
  computed: {
    ...mapState([
      'slides',
      'news'
    ])
  },
  mounted(){
    this.getlist()
  },
  onPullDownRefresh(){
    this.getlist()
  },
  methods: {
    ...mapActions([
      'getSlides',
      'getNews'
    ]),
    async getlist(){
      await Promise.all([
        this.getSlides(),
        this.getNews(true)
      ])
      wx.stopPullDownRefresh()
    }
  }
}
</script>

<style scoped>
.swiper-box{
  width: 100%;
  height: 200rpx;
}
.slide-item{ 
  width: 100%;
  height: 100%;
}
.slide-title{
  max-width: 90vw;
  position: absolute;
  top: 10px;  
  background-color: rgba(0, 0, 0, .3);
  color: #fff;
  padding: 2px 6px;
  font-size: 16px;
}
.slide-img {
  width: 100%;
  height: 100%;
}
.nomore {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #ddd;
}
</style>
