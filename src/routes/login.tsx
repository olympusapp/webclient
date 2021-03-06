import * as React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../components/button'
import Input from '../components/input'

import { logIn, setServerURL } from '../utils/actions'
import { Login } from '../utils/api'

export default () => {
	
	const dispatch = useDispatch()
	const isLogged = useSelector(state => state.logged)
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
			<h2>Login</h2>
			{isLogged ? (
				<div>
					<p>You are logged.</p>
				</div>
			):(
				<div>
					<Input ref={UsernameInput} name="username" placeholder="Username"></Input>
					<Input ref={PasswordInput} type="password" name="password" placeholder="Password"></Input>
					<Input ref={ServerInput}name="serverurl" placeholder="Server URL"></Input>
					<Button onClick={goLogin}>LOGIN</Button>
					<p>{useStatus}</p>
				</div>
			)}

		</div>
	)
}
