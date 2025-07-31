import http from "../utils/request"

export const getSelects = async () => {
    const data = await http('/carnival/clock_api/getlevelselect', {
        method: 'GET',
    })
    console.log('data--', data)
}
