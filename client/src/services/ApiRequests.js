import { wrapper } from "./wrapperService";
import { BASE_URL } from "./ApiEndPoints"

// method url body header
//registerUser
export const registerUser = async (data, header) => {
    return await wrapper("POST", `${BASE_URL}/user/register`, data, header)
    //await because wrapper returns promise
}

//fetchAllUsers
export const fetchAllUsers = async (search, gender, status, sort, page, header) => {
    /////////////////////method  url                                                                                                        body header(config)
    return await wrapper("GET", `${BASE_URL}/user/getAllUsers?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "", header)
}

// fetchSingleUser
export const fetchSingleUser = async (id) => {

    return await wrapper("GET", `${BASE_URL}/user/${id}`, "", "")
}

export const editUser = async (id, data, header) => {
    //PATCH Modifies/Updates a resource partially 
    return await wrapper("PUT", `${BASE_URL}/edit/user/${id}`, data, header)
}

/////////////////////////////////////// delete user /////////////////////////////////////////////////
export const userDelete = async (id) => {
    return await wrapper("DELETE", `${BASE_URL}/delete/user/${id}`, {})
}
//////////////////////////////////////////// update status /////////////////////////////////////////////////
export const changeStatus = async (id, data) => {
    return await wrapper("PUT", `${BASE_URL}/change/status/${id}`, { data })
}

export const getMeta = async () => {

    return await wrapper("GET", `${BASE_URL}/getMetaData`, "", "")
    // wrapper will return something and also changeStatus will also need to return
}


export const exportToCsv = async () => {

    return await wrapper("GET", `${BASE_URL}/exportCsv`, "", "")
    // wrapper will return something and also changeStatus will also need to return
}