import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

const login = user => {    
    return axios.post(baseUrl + '/login', user)
}

const register = user => {
    return axios.post(baseUrl + '/register', user)
}

const update = user => {
    return axios.put(baseUrl + '/changePassword/${user.id}', user)
}

const getProfileData = userToken => {
    return axios.post(baseUrl + '/profile', userToken)
}

export default {
    login: login,
    register: register,
    update: update,
    getProfileData: getProfileData
}