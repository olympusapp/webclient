import * as React from 'react'
import styled from 'styled-components'
import { Upload } from '../utils/api'

const StyledFolder = styled.div`
	background: ${props => props.theme.body.background};
	border-radius: 5px;
	width: calc(100% - 20px);
	height: calc(100% - 20px);
	flex: 1;
	padding: 10px;
`

const StyledText = styled.p`
	text-align: center;
	color: rgb(80, 80, 80);
	padding-top: 20px;
`

export default ({ path, children}) => {
	
	function onDrop(e){
		e.preventDefault()
		
		const files = e.dataTransfer.files
		const formData = new FormData()
		formData.append('folderPath', path)
		for (let i = 0; i < files.length; i++) {
			let file = files[i]
			formData.append('file_upload', file)
		}
		
		Upload(formData,{
			folderpath: path
		}).then(()=>{
			//Uploaded
		})
	}
	
	function onDragHover(e){
		e.preventDefault()
	}
	
	return (
		
			<StyledFolder onDrop={onDrop} onDragOver={onDragHover}>
				{...children}
				<StyledText>Drag and drop files to upload</StyledText>
			</StyledFolder>

			
	)
}
