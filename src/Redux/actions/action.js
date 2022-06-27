import { GET_USER_DATA } from "../../constant"

export const getUserData = (data) => {
    return {
        type:GET_USER_DATA,
        payload:data
    }
}