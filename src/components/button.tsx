import * as React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	margin: 5px 2px;
	overflow: auto;
	padding: 8px 12px;
	border-radius: 6px;
	border:0;
	background:${props => props.theme.button.background};
	transition: 0.1s;
	cursor: pointer;
	color: rgb(41, 98, 255);
	text-decoration:none;
	:hover{
		background: ${props => props.theme.button.hover.background};
		box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
		transition: 0.1s;
	}
`

export default (props) => {
	return (
		<StyledButton {...props} />
	)
}