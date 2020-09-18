import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
import { logOff } from '../utils/actions'
import styled from 'styled-components'

import Status from './status'
import Button from '../components/button'

const StyledSidebar = styled.div`
	padding: 0px 10px;
	display: flex;
	flex-direction: column;
	background: ${props => props.theme.sidebar.background};
	min-height: 100%;
	min-width: 175px;
	max-width: 175px;
	& > *:not(div) {
		margin: 2px 0px;
	}
	& > a {
		color: black;
		text-decoration: none;
		padding: 10px;
		background: ${props => props.theme.sidebar.button.background};
		border-radius: 7px;
		:hover{
			background: ${props => props.theme.sidebar.button.hover.background};
		}
		&.active{
			color: #015be8;
		}
	}
`

export default () => {
	const dispatch = useDispatch()
	
	return (
		<StyledSidebar>
			<Status/>
			<NavLink to="/" exact activeClassName="active">
				Login
			</NavLink>
			<NavLink to="/signup" exact activeClassName="active">
				Signup
			</NavLink>
			<NavLink to="/explorer" activeClassName="active">
				Explorer
			</NavLink>
			<Button onClick={() => dispatch(logOff())}>log off</Button>
		</StyledSidebar>
	)
}