import * as React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'


import { logIn, setServerURL } from '../utils/actions'
import { Login } from '../utils/api'

export default () => {
	
	const dispatch = useDispatch()
	const UsernameInput = React.useRef(null)
	const PasswordInput = React.useRef(null)
	const ServerInput = React.useRef(null)
	const [useStatus, setStatus] = React.useState('')
	
	function goLogin(){
		
		const username = UsernameInput.current.value
		const password = PasswordInput.current.value
		const server = ServerInput.current.value
		
		dispatch(setServerURL(server))
		
		Login({
			username,
			password
		}).then(({ errorCode, username, token, serverName }) => {
			if(errorCode === 2){
				setStatus(`User doesn't exist`)
			} else if(errorCode === 3){
				setStatus(`Wrong password.`)
			} else{
				dispatch(logIn({
					username: username,
					token: token,
					serverName,
					serverURL: server
				}))
				setStatus(`Welcome!`)
			}
		})
	}
	
	return (
		<div>
			<h2>login</h2>
			<input ref={UsernameInput} name="username" placeholder="Username"></input>
			<input ref={PasswordInput} type="password" name="password"></input>
			<input ref={ServerInput}name="serverurl" placeholder="Server URL"></input>
			<button onClick={goLogin}>LOGIN</button>
			<p>{useStatus}</p>
		</div>
	)
}
