
const baseUrlApi = 'https://api.ithome.com'
const baseUrlDyn = 'https://dyn.ithome.com'
const badeUrlQuan = 'https://apiquan.ithome.com'

const request = (url, data = {}, type = 'api', methods = 'POST') => new Promise((resolve, reject) => {
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

export default request
