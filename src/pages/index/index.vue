<template>
  <div class="container">
      <swiper indicator-dots autoplay  circular indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="rgba(210, 34, 34, .7)" >
        <swiper-item v-for="(slide, index) in slides " :key="index">
          <div class="slide-item" @click="$router.push(slide.url)">
            <span class="slide-title">{{slide.title}}</span>
            <img :src="slide.img" alt="图片">
          </div>
        </swiper-item>
      </swiper>

      <div class="news">
        
      </div>
    
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>

</style>
