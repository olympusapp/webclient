import * as React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Route, Switch, Link, useParams, useRouteMatch } from 'react-router-dom'
import Button from './button'
import { saveAs } from 'file-saver';

import { Download } from '../utils/api'

const StyledCard = styled.div`
	border-radius: 7px;
	margin: 4px 10px;
	background: ${props => props.theme.card.background};
	cursor: pointer;
	display: inline-block;
	height: 200px;
	width: 150px;
	max-height: 200px;
	max-width: 150px;
	transition: 0.1s;
	:hover{
		transition: 0.1s;
		background: ${props => props.theme.card.hover.background};
		box-shadow: 0px 2px 3px rgba(0,0,0,0.25);
		& button{
			opacity: 1;
		}
	}
	&  button{
		opacity: 0;
		width: 100%;
		margin: 0;
		height: auto;
		margin: 0;
		height: 40px;
		background: ${props => props.theme.card.hover.background};
		:hover{
			background: ${props => props.theme.button.background};
		}
	}
	& > a {
		padding: 0px;
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
		height: calc(100% - 40px);
		margin: 8px 5px;
	}
	& > a span:nth-child(2){
		color: rgb(100,100,100);
		min-height: 35px;
		margin: 5px auto;
	}
`

interface CardProps {
	isDirectory: boolean,
	fileName: string,
	key: string,
	to: string,
	filePath: string
}

export default ({ fileName, isDirectory, to, filePath }: CardProps) => {
	return (
		<StyledCard>
			{isDirectory ? (
				<Link to={to}>
					<span>{fileName}</span>
					<span>{'Click to open->'} </span>
				</Link>
			) : (
				<a>
					<span>{fileName}</span>
					<Button onClick={() => Download(filePath).then(data => downloadFile(fileName, data))}>Download</Button>
				</a>
			)}
			
		</StyledCard>
	)
}

async function downloadFile(filename, text) {
	const blob = new Blob([text]);
	saveAs(blob, filename)
}