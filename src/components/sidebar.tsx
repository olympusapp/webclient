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
	min-width: 215px;
	max-width: 215px;
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
			color:  ${props => props.theme.sidebar.button.active.color};
			background: ${props => props.theme.sidebar.button.active.background};
		}
	}
	& .divider{
		height: 1.5px;
		margin: 4px auto;
		width: 65%;
		background: rgba(215, 215, 215);
		border-radius: 5px;
	}
`

export default () => {
	return (
		<StyledSidebar>
			<Status/>
			<NavLink to="/" exact activeClassName="active">
				Home
			</NavLink>
			<div className="divider"/>
			<NavLink to="/explorer" activeClassName="active">
				Explorer
			</NavLink>
		</StyledSidebar>
	)
}