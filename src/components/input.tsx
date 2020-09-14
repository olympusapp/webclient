import * as React from 'react'
import styled from 'styled-components'

export default styled.input`
	margin: 2px 5px;
	overflow: auto;
	padding: 10px 12px;
	border-radius: 6px;
	border:0;
	background:${props => props.theme.input.background};
	transition: 0.15s;
	box-sizing: border-box;
	&:hover:not(:focus){
		box-shadow: 0px 2px 3px rgba(0,0,0,0.1);
	}
	:focus{
		box-shadow: 0px 0px 0px rgba(0,0,0,0.1), 0 0 0 3px ${props => props.theme.input.focus.border};
		background: ${props => props.theme.input.focus.background};
		transition: 0.15s;
	}
	& * {
		color: rgb(41, 98, 255);
		text-decoration:none;
	}
`
