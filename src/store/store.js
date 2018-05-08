import Vue from 'vue'
import Vuex from 'vuex'
import xmljson from 'xmlstring2json'
import { formatNews, formatSlide, formatTopics} from '@/utils'
import {request} from '../utils/api'
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
        },
        [types.TOPIC_LIST] (state, data){
            state.topics =  data;
            console.log("state.topics: " + state.topics)
        }
    },
    actions:{
        async getSlides({commit}){
            const data = await request('/xml/slide/slide.xml');          
            console.log("slide_data:" + JSON.stringify(data))
            if(!data) return
            const parseSlides = xmljson(data).rss.channel.item
            const filterSlides = parseSlides.filter( item => item.opentype['#text'] === '1')
            const formatedSlide = filterSlides.map(formatSlide)
            console.log("formaterSlide:" + JSON.stringify(formatedSlide))
            commit(types.SLIDES_LIST, formatedSlide)           
        },
        async getNews({state, commit},init){
            let data = await request('/json/newslist/news');           
            if(!data) return
            const formatedNews = data.newslist.map(formatNews)
            console.log("formaterNews:" + JSON.stringify(formatedNews))
            if(init){
                commit(types.NEWS_LIST, formatedNews) 
            }else{
                commit(types.NEWS_LIST, state.news.concat(formatedNews))  
            }                     
        },
        async getTopics({state, commit}, init){
            let time = Date.now()
            if(!init){               
                const  lastTopic = state.topics[state.topics.length -1]
                time = lastTopic.replytime.replace(/[^0-9]/ig, '')
            }
            const topics = await request('/api/post',{
                categoryid: 0,
                type: 0,
                orderTime: time,
                visistCount: '',
                pageLength: ''
            },'quan')           
            if(!topics) return
            const formatedTopics = topics.map(formatTopics)
            if(init){
                commit(types.TOPIC_LIST, formatedTopics)
            }else{
                commit(types.TOPIC_LIST, state.topics.concat(formatedTopics))
            }
        }
    }

})
export default store