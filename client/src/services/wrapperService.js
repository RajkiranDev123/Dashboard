import axios from "axios"
//when a function is declared with async , it automatically returns a promise; 
export const wrapper = async (method, url, body, header) => {

    let config = { method,url,data: body,headers: header ? header : { "Content-Type": "application/json" } }

 //returns promises... need to use await when calling wrapper
    axios(config).then(data => {
        return data
    }).catch(error => {
        return error
    })
}