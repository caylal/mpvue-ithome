import Vue from 'vue'
import Vuex from 'vuex'
import xmljson from 'xmlstring2json'
import { formatNews, formatSlide} from '@/utils'
import request from '../utils/api/api'
import * as types from 'types'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        slides: [],
        news: [],
        topics: []
    },
    mutations:{
        [types.SLIDES_LIST](state, data){
            state.slides = data
        },
        [types.NEWS_LIST](state, data){
            state.news = data
        }
    },
    actions:{
        [types.SLIDES_LIST]({commit}){
            request('/xml/slide/slide.xml',{},'api').then((data) => {
                console.log("slide_data:" + JSON.stringify(data))
                const slides = data;
                if(!slides) return 
                 const parseSlides = xmljson(slides).rss.channel.item
                 const filterSlides = parseSlides.filter( item => item.opentype['#text'] === '1')
                 const formatedSlide = filterSlides.map(formatNews)
                 console.log("formaterSlide:" + formatedSlide)
                 commit(types.SLIDES_LIST, formatedSlide)
            })
        },
        [types.NEWS_LIST]({commit}){
            request('/json/newslist/news',{},'api').then((data) => {
                const news = data
                console.log("news_data:" + JSON.stringify(news))
                if(!news) return 
                const formatedNews = news.newlist.map(formatNews)
                commit([types.NEWS_LIST], formatedNews)

            })
        }
    }

})