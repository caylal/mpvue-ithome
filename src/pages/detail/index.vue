<template>
  <div class="contain">
      <div class="header">
          <h1 class="new-title">{{title}}</h1>
          <div class="news-source">{{news.newssource}}({{news.newsauthor}})</div>
      </div>
      <div class="content" >         
          <div v-html="news.detail"></div>
      </div>
      <div v-if="relatedNews.length">
            <h2 class="related-title">相关文章</h2>
            <div class="news-related">
                <news-item v-for="(item, index) in relatedNews" :key="index" :news="item"></news-item>
            </div>
      </div>
     
  </div>
</template>

<script>
import {api} from '../../utils/api'
import xmljson from 'xmlstring2json'
import NewsItem from '../../components/NewsItem'
export default {
    components:{
        NewsItem
    },
    data(){
        return {
            title: '',
            news: {},
            relatedNews: []
        }
    },
    async onLoad(option){ 
        console.log("option:" +JSON.stringify(option))       
        await Promise.all([
            this.getNews(option),
            this.getRelateNews(option.id)
        ])       
    },
    methods: {
        async getNews(option){
            this.title = option.title
            let id = option.id
            id = `${id.slice(0,3)}/${id.slice(3,6)}`
            const news = await api.getNews(id)
            if(!news) return
            const formatNews = xmljson(news).rss.channel.item
            console.log("news-format:" +JSON.stringify(formatNews))
            this.news = {
                newssource: formatNews.newssource['#text'],
                detail: formatNews.detail['#text'].replace(/<img/g, '<img width="100%"'),
                newsauthor: formatNews.newsauthor['#text']
            }

        },
        async getRelateNews(id){           
            const relatedNews = await api.getRelateNews(id)          
            if(!relatedNews) return 
            const parseNews = JSON.parse(relatedNews.replace('var tag_jsonp =', ''))
            console.log("relatedNews: " + JSON.stringify(parseNews))
            this.relatedNews = parseNews.slice(0,4).map(item => {
                return {
                    id: item.newsid,
                    title: item.newstitle,
                    image: item.img,
                    postdate: item.postdate,
                    url: `/pages/detail/main?id=${item.newsid}&title=${item.newstitle}`
                }
            })
        }
    }
}
</script>

<style>
.header{
    display: flex;
    flex-direction: column;
    width: 100%;
    color: white;
    padding: 10px;
    background-color: #d22222;
    box-sizing: border-box;
}
.new-title{
    font-size: .4rem;
}
.news-source{
    font-size: .25rem;
    margin-top: 10px;
    align-self: flex-end;
}
.content{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: .28rem;
    line-height: 1.5;
}
.related-title{
    font-size: .33rem;
    font-weight: 600;
    border-left: .08rem solid #d22222;
    padding: 2px 5px;
}
.news-related{
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
}
</style>
