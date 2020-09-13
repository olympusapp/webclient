export const logIn = ({ username, token, serverName }) => ({
	type: 'LOGIN',
	payload: {
		username,
		token,
		serverName
	}
})

export const logOff = () => ({
	type: 'LOGOFF',
	payload: {}
})