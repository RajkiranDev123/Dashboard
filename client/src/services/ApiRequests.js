import { wrapper } from "./wrapperService";
import { BASE_URL } from "./ApiEndPoints"

// method url body header
//registerUser
export const registerUser = async (data, header) => {
    return await wrapper("POST", `${BASE_URL}/api/v1/users/register`, data, header)
    //await because wrapper returns promise
}

//fetchAllUsers
export const fetchAllUsers = async (search, gender, status, sort, page, header) => {
    /////////////////////method  url                                                                                                        body header(config)
    return await wrapper("GET", `${BASE_URL}/api/v1/users/getAllUsers?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`, "", header)
}

// fetchSingleUser
export const fetchSingleUser = async (id) => {

    return await wrapper("GET", `${BASE_URL}/api/v1/users/getSingleUser/${id}`, "", "")
}

export const editUser = async (id, data, header) => {
    //PATCH Modifies/Updates a resource partially 
    return await wrapper("PUT", `${BASE_URL}/api/v1/users/editUser/${id}`, data, header)
}

/////////////////////////////////////// delete user /////////////////////////////////////////////////
export const userDelete = async (id) => {
    return await wrapper("DELETE", `${BASE_URL}/api/v1/users/deleteUser/${id}`, {})
}
//////////////////////////////////////////// update status /////////////////////////////////////////////////
export const changeStatus = async (id, data) => {
    return await wrapper("PUT", `${BASE_URL}/api/v1/users/changeStatus/${id}`, { data })
}

export const getMeta = async () => {

    return await wrapper("GET", `${BASE_URL}/api/v1/meta/getMetaData`, "", "")
    // wrapper will return something and also changeStatus will also need to return
}

export const getMetaAddedUsers = async () => {

    return await wrapper("GET", `${BASE_URL}/api/v1/meta/getMetaDataAddedUsers`, "", "")
    // wrapper will return something and also changeStatus will also need to return
}



export const exportToCsv = async () => {

    return await wrapper("GET", `${BASE_URL}/api/v1/users/exportCsv`, "", "")
    // wrapper will return something and also changeStatus will also need to return
}