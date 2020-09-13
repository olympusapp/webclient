import * as React from 'react'
import styled from 'styled-components'
import { Upload } from '../utils/api'

const StyledFolder = styled.div`
	background: rgb(200,200,200,0.5);
	border-radius: 5px;
	width: 100%;
	height: 100%;
	flex: 1;
`

export default (props) => {
	
	function onDrop(e){
		e.preventDefault()
		
		const files = e.dataTransfer.files
		const formData = new FormData()
		formData.append('folderPath', props.path)
		for (let i = 0; i < files.length; i++) {
			let file = files[i]
			formData.append('file_upload', file)
		}
		
		Upload(formData,{
			folderpath: props.path
		}).then(()=>{
			console.log("UPLOADED")
		})
	}
	
	function onDragHover(e){
		e.preventDefault()
	}
	
	return (
		<StyledFolder {...props} onDrop={onDrop} onDragOver={onDragHover}/>
	)
}
