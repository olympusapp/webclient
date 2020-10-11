import * as React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Route, Switch, Link, useParams, useRouteMatch } from 'react-router-dom'
import Button from './button'
import { saveAs } from 'file-saver';
import * as FileServer from 'file-saver';
import FolderIcon from '../../assets/folder.closed.svg'
import FileIcon from '../../assets/file.svg'
import { Download } from '../utils/api'
import { Buffer } from 'buffer'
import * as download from 'downloadjs'

console.log(download)

const StyledCard = styled.div`
	border-radius: 7px;
	margin: 3px 7px;
	background: ${props => props.theme.card.background};
	cursor: pointer;
	display: inline-block;
	height: 150px;
	width: 150px;
	max-height: 150px;
	max-width: 150px;
	transition: 0.1s;
	:hover{
		transition: 0.1s;
		background: ${props => props.theme.card.hover.background};
		box-shadow: 0px 2px 3px rgba(0,0,0,0.25);
	}
	& > a {
		padding: 0px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-conter: center;
	}
	& * {
		text-decoration: none;
		color: black;
		
	} 
	& > a img {
		height:  50px;
		margin: 8px 5px;
	}
	& > a p{
		height: 30px;
		margin: 10px 4px;
		padding: 10px;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: center;
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
					<img src={FolderIcon}></img>
					<p>{fileName}</p>
				</Link>
			) : (
				<a  onClick={() => Download(filePath).then(({ data, headers }) => downloadFile(fileName, data, headers['content-type']))}>
					<img src={FileIcon}></img>
					<p>{fileName}</p>
				</a>
			)}
			
		</StyledCard>
	)
}

async function downloadFile(filename, text, mime) {
	const data = Buffer.from(text).toString()
	console.log(data,filename,mime)
	download(data,filename, 'application/vnd.oasis.opendocument.spreadsheet')
}