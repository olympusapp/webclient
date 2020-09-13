import * as React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { ServerURL } from 'Constants'
import { logIn } from '../utils/actions'
import { Signup } from '../utils/api'

export default () => {
	
	const dispatch = useDispatch()
	const UsernameInput = React.useRef(null)
	const PasswordInput = React.useRef(null)
	const [useStatus, setStatus] = React.useState('')
	
	function goSignup(){
		
		const username = UsernameInput.current.value
		const password = PasswordInput.current.value
		
		Signup({
			username,
			password
		}).then(({ errorCode, username, token, serverName }) => {
			if(errorCode === 1){
				setStatus('User already exists.')
			}else{
				dispatch(logIn({
					username: username,
					token: token,
					serverName
				}))
				setStatus(`Welcome!`)
			}
		})
	}
	
	return (
		<div>
			<h2>signup</h2>
			<input ref={UsernameInput} name="username"></input>
			<input ref={PasswordInput} type="password" name="password"></input>
			<button onClick={goSignup}>SIGNUP</button>
			<p>{useStatus}</p>
		</div>
	)
}
