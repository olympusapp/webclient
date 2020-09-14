import * as React from 'react'
import styled from 'styled-components'

const StyledBody = styled.div`
	padding: 0px;
	overflow: auto;
	width: 100%;
	background: ${props => props.theme.body.background};
	& > div {
		padding: 15px 30px;
	}
`

export default (props) => {
	return (
		<StyledBody>
			<div {...props}/>
		</StyledBody>
	)
}