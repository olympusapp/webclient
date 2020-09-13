import { createStore } from 'redux'
import * as persistState from 'redux-localstorage'
import { compose } from 'redux'
import { Info } from './api'

const enhancer = compose(
  persistState()
)

const Reducer = (state, { type, payload }: any) => {
	switch(type){
		case 'INFO':
			return {
				...state,
				serverName: payload.serverName
			}
		case 'LOGIN':
			return {
				serverName: payload.serverName,
				username: payload.username,
				token: payload.token,
				logged: true
			}
		case 'LOGOFF':
			return {
				username: 'Nobody',
				token: null,
				logged: false,
				serverName: null
			}
		default:
			return state
	}
}

const AppStore = createStore(Reducer,{
	username: 'Nobody',
	logged: false,
	serverName: null
}, enhancer)

window.addEventListener('load', () => {
	const { logged } = AppStore.getState()
	if(logged){
		Info().then(({ serverName }) => {
			AppStore.dispatch({
				type: 'INFO',
				payload:{
					serverName
				}
			})
		})
	}
})

export default AppStore