import axios from 'axios'
const instance = axios.create({
    baseURL:'https://reactapi.iynn.cn',
    timeout:20000
})
instance.interceptors.request.use(config=>{
    let jwt = localStorage.getItem('jwt')
    if(jwt){
        config.headers['Authorization'] =jwt
    }
    return config
})


instance.interceptors.response.use(config=>{
    if(config.data.context?.jwt){
        localStorage.setItem('jwt',config.data.context.jwt)
    }
    if(config.data.context?.acl){
        localStorage.setItem('acl',JSON.stringify(config.data.context.acl))
    }
    return config
})

export default instance