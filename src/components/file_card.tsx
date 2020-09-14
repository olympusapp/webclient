import * as React from 'react'
import styled from 'styled-components'
import {
	BrowserRouter,
	Route,
	Switch,
	Link,
	useParams,
  useRouteMatch
} from 'react-router-dom'

const StyledCard = styled.div`
	border-radius: 7px;
	margin: 4px 10px;
	background: ${props => props.theme.card.background};
	cursor: pointer;
	display: inline-block;
	height: 200px;
	width: 150px;
	padding: 5px;
	max-height: 200px;
	max-width: 150px;
	transition: 0.1s;
	:hover{
		transition: 0.1s;
		background: ${props => props.theme.card.hover.background};
		box-shadow: 0px 2px 3px rgba(0,0,0,0.25);
	}
	& > a {
		padding: 5px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	& * {
		text-decoration: none;
		color: black;
		text-overflow: ellipsis;
		overflow: hidden;
		padding: 0 3px;
	} 
	& > a *:nth-child(1){
		height: 100%;
	}
	& > a *:nth-child(2){
		color: rgb(100,100,100);
		min-height: 35px;
	}
`

interface CardProps {
	isDirectory: boolean,
	fileName: string,
	key: string,
	to: string
}

export default ({ fileName, isDirectory, to }: CardProps) => {
	return (
		<StyledCard>
			<Link to={to}>
				<span>{fileName}</span>
				<span>{isDirectory ? 'Click to open->' :''} </span>
			</Link>
		</StyledCard>
	)
}