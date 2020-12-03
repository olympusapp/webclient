import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const PathStepStyled = styled.div`
	padding: 15px;
	& > a.step {
		padding: 5px;
		background: rgba(250, 250, 250);
		border-radius: 4px;
		color: black;
		margin: 5px 1px;
		font-size: 13px;
	}
`

export default (props) => {

	return (
		<PathStepStyled {...props} />
	)
}

