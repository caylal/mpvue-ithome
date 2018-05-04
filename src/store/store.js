import Vue from 'vue'
import Vuex from 'vuex'
import xmljson from 'xmlstring2json'
import { formatNews, formatSlide} from '@/utils'
import request from '../utils/api'
import * as types from './types'

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
            console.log(state.slides)
        },
        [types.NEWS_LIST](state, data){
            state.news = data
            console.log("state.news:" + state.news)
        }
    },
    actions:{
        async getSlides({commit}){
            const data = await request('/xml/slide/slide.xml',{},'api');          
            console.log("slide_data:" + JSON.stringify(data))
            if(!data) return
            const parseSlides = xmljson(data).rss.channel.item
            const filterSlides = parseSlides.filter( item => item.opentype['#text'] === '1')
            const formatedSlide = filterSlides.map(formatSlide)
            console.log("formaterSlide:" + JSON.stringify(formatedSlide))
            commit(types.SLIDES_LIST, formatedSlide)           
        },
        async getNews({commit},init){
            let data = await request('/json/newslist/news',{},'api');           
            if(!data) return
            const formatedNews = data.newslist.map(formatNews)
            console.log("formaterNews:" + JSON.stringify(formatedNews))
            if(init){
                commit(types.NEWS_LIST, formatedNews) 
            }else{
                commit(types.NEWS_LIST, state.news.concat(formatedNews))  
            }                     
        }
    }

})
export default store