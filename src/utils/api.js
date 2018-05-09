
const baseUrlApi = 'https://api.ithome.com'
const baseUrlDyn = 'https://dyn.ithome.com'
const badeUrlQuan = 'https://apiquan.ithome.com'

export const request = (url, data = {}, type = 'api', methods = 'POST') => new Promise((resolve, reject) => {
    switch(type){
        case 'dyn': url = baseUrlDyn + url
        break
        case 'quan': url = badeUrlQuan + url
        break
        default: url = baseUrlApi + url
        
    }
    console.log("url:" + url)
    wx.request({
        url,
        data,
        methods,
        success: res => resolve(res.data),
        fail: res => reject(res)
    })
})
export const api = {
    getNews: (id) => request(`/xml/newscontent/${id}.xml`),

    getRelateNews: (id) => request(`/json/tags/0${id.slice(0, 3)}/${id}.json`),

    getTopic: (id) => request(`/api/post/${id}`,{},'quan'),

    getTopicComment: (id, lastid, data) => request('/api/reply', data, 'quan')
}


