import axios from "axios"
export const wrapper = async (method, url, body, header) => {

    let config = { method,url,data: body,headers: header ? header : { "Content-Type": "application/json" } }

    return axios(config) //returns promises... need to use await when calling wrapper
    .then(data => {
        return data
    }).catch(error => {
        return error
    })
}