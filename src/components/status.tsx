import * as React from 'react'
import { useSelector  } from 'react-redux'
import styled from 'styled-components'

const StyledStatus = styled.div`
	margin: 17px 0px;
	text-align: center;
`

export default () => {
	const username = useSelector(state => state.username)
	const serverName = useSelector(state => state.serverName)
	
	return (
		<StyledStatus>
			<span>{username}@{serverName ? serverName : 'empty'}</span>
		</StyledStatus>
	)
}

