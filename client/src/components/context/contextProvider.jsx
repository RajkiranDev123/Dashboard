import React, { useState, createContext } from "react"


export const addData = createContext()
export const updateData = createContext()

//wrapper
const ContextProvider = ({ children }) => {
    const [userAdd, setUserAdd] = useState("")
    const [update, setUpdate] = useState("")

    return (

        <addData.Provider value={{ userAdd, setUserAdd }}>
            <updateData.Provider value={{ update, setUpdate }}>

                {children}
            </updateData.Provider>
        </addData.Provider>

    )
}
export default ContextProvider
//only 1 default export