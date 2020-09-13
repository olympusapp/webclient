import axios from 'axios'
import AppStore from './store'

const getServerUri = () => AppStore.getState().serverURL

export const Login = ({ username, password }) => {
	console.log(getServerUri())
	
	return new Promise((res) => {
		axios.post(`${getServerUri()}/api/login`,{
			username,
			password
		}).then(({ data }) => {
			res(data)
		})
	})
}

export const Signup = ({ username, password }) => {
	return new Promise((res) => {
		axios.post(`${getServerUri()}/api/signup`,{
			username,
			password
		}).then(({ data }) => {
			res(data)
		})
	})
}

export const Explorer = (folder: string) => {
	const { token, logged } = AppStore.getState()
	if(!logged) return new Promise((res, rej)=> rej())
	return axios.post(`${getServerUri()}/api/explore`,{
		startFolder: folder
	},{
		headers:{
			authorization:`bearer ${token}`
		}
	})
}

export const Upload = (formData, headers = {}) => {
	const { token } = AppStore.getState()
	
	return axios.post(`${getServerUri()}/api/upload`, formData,{
		headers:{
			authorization:`bearer ${token}`,
			...headers
		}
	})
}

export const Info = () => {
	const { token } = AppStore.getState()
	
	return new Promise((res) => {
		axios.get(`${getServerUri()}/api/info`,{
			headers:{
				authorization:`bearer ${token}`
			}
		}).then(({ data }) => {
			res(data)
		})
	})
}