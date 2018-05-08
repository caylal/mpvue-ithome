<template>
    <div class="contain">
        <div class="topic-contain">
            <topic-item v-for="(item, index) in topics" :key="index" :item="item"></topic-item>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import TopicItem from  '../../components/TopicItem'
export default {
    components: {
        TopicItem
    },
    computed: {
    ...mapState(['topics'])
    },
    mounted(){
        this.refresh()
    },
    onPullDownRefresh(){
        this.refresh()
    },
    onReachBottom(){
        console.log("下拉刷新！")
        wx.showLoading({
            title: '玩命加载中'
        })
        this.loadmore()
    },
    methods: {
        ...mapActions(['getTopics']),
        async refresh(){
            await this.getTopics(true)
             wx.stopPullDownRefresh()
        },
        loadmore(){
             this.getTopics()
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
            wx.hideLoading()
        }      
    }

}
</script>

<style>

</style>
