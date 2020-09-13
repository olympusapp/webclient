import * as React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	overflow: auto;
	padding: 6px 12px;
	border-radius: 6px;
	border:0;
	background: white;
	
	& * {
		color: rgb(41, 98, 255);
		text-decoration:none;
	}
`

export default (props) => {
	return (
		<StyledButton {...props} />
	)
}