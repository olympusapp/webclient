export const logIn = ({ username, token, serverName, serverURL }) => ({
	type: 'LOGIN',
	payload: {
		username,
		token,
		serverName,
		serverURL
	}
})

export const logOff = () => ({
	type: 'LOGOFF',
	payload: {}
})

export const setServerURL = (URL) => ({
	type: 'SET_SERVER_URL',
	payload: {
		URL
	}
})
