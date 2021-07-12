import axios from "axios"
//创建axios实例
var service = axios.create({
    timeout: 30000,
    baseURL: 'http://localhost/ghost',
}) 
service.defaults.withCredentials=true
export default {
    //get请求，其他类型请求复制粘贴，修改method
    user : null,
    globalPath : 'http://localhost/pics',
    get(url) {
        return new Promise((cback, reject) => {
            service({
                method: 'GET',
                url
            }).then(res => { 
                cback(res);   //cback在promise执行器内部
            }).catch(err => {
                reject(err); 
            })

        })
    },
    get(url,params) {
        return new Promise((cback, reject) => {
            service({
                method: 'GET',
                url,
                params:params
            }).then(res => { 
                cback(res);   //cback在promise执行器内部
            }).catch(err => {
                reject(err); 
            })

        })
    },
    post(url,data) {
        return new Promise((cback, reject) => {
            service({
                method: 'POST',
                url,
                data:data
            }).then(res => { 
                cback(res);   //cback在promise执行器内部
            }).catch(err => {
                reject(err); 
            })

        })
    },
    me(){
        return new Promise((cback, reject) => {
            if (this.user !== null ) cback(this.user);
            this.get("/me")
            .then(res => {
                this.user = res.data;
                cback(this.user);
            })
        });
    }

} 