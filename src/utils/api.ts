import { ServerURL } from 'Constants'
import axios from 'axios'
import AppStore from './store'

export const Login = ({ username, password }) => {
	return new Promise((res) => {
		axios.post(`${ServerURL}/api/login`,{
			username,
			password
		}).then(({ data }) => {
			res(data)
		})
	})
}

export const Signup = ({ username, password }) => {
	return new Promise((res) => {
		axios.post(`${ServerURL}/api/signup`,{
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
	return axios.post(`${ServerURL}/api/explore`,{
		startFolder: folder
	},{
		headers:{
			authorization:`bearer ${token}`
		}
	})
}

export const Upload = (formData, headers = {}) => {
	const { token } = AppStore.getState()
	
	return axios.post(`${ServerURL}/api/upload`, formData,{
		headers:{
			authorization:`bearer ${token}`,
			...headers
		}
	})
}

export const Info = () => {
	const { token } = AppStore.getState()
	
	return new Promise((res) => {
		axios.get(`${ServerURL}/api/info`,{
			headers:{
				authorization:`bearer ${token}`
			}
		}).then(({ data }) => {
			res(data)
		})
	})
}