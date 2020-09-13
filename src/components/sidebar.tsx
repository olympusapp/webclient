import * as React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
import { logOff } from '../utils/actions'
import styled from 'styled-components'

import Status from './status'

const StyledSidebar = styled.div`
	padding: 0px 5px;
	display: flex;
	flex-direction: column;
	background: ${props => props.theme.sidebar.background};
	min-height: 100%;
	min-width: 175px;
	max-width: 175px;
	& > a {
		color: black;
		text-decoration: none;
		padding: 10px;
		background: ${props => props.theme.sidebar.buttons.background};
		border-radius: 7px;
		margin: 2px 0px;
	}
`

export default () => {
	const dispatch = useDispatch()
	
	return (
		<StyledSidebar>
			<Status/>
			<Link to="/">
				Login
			</Link>
			<Link to="/signup">
				Signup
			</Link>
			<Link to="/explorer">
				Explorer
			</Link>
			<button onClick={() => dispatch(logOff())}>log off</button>
		</StyledSidebar>
	)
}