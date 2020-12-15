import * as React from 'react'
import { Explorer } from '../utils/api'
import Card from '../components/file_card'
import Button from '../components/button'
import { dirname, basename, join }  from 'path'
import AppStore from '../utils/store'
import { useLocation, useHistory , BrowserRouter, Route, Switch, Link, useParams, useRouteMatch } from 'react-router-dom'
import EventEmitter from 'eventemitter3'
import FolderBody from '../components/folder_body'
import PathSteps from '../components/path_steps'
import { createEncryptor } from 'simple-encryptor'

const Events = new EventEmitter()

const Panel = () => {
	const [useList, setList] = React.useState([])
	const [useStatus, setStatus] = React.useState(true)
	const currentPath = useLocation().pathname.replace('/explorer','')
	const pastPath = dirname(`/explorer${currentPath}`)
	const pastFolder = basename(pastPath)
	
	function renderCards(){
		Explorer(currentPath).then((res: any) => {
			if(res.data.errorCode === 404){
				setStatus('Not found')
			}else{
				setList(res.data.folderPaths)
			}
		}).catch(() => {
			setStatus('Forbidden')
		})
	}
	
	React.useEffect(() => {
		renderCards()
		
		Events.on('FILESYSTEM_UPDATED', renderCards)

		return () => Events.off('FILESYSTEM_UPDATED', renderCards)
	},[currentPath])
	
	function PathComponent(){
		
		let currentDir = ''
		
		return (
			<PathSteps>
				{currentPath.split('/').map(dir =>{
					currentDir = join(currentDir,dir)
					
					const validRoute = join('/','explorer', currentDir)

					return (
						<React.Fragment key={currentDir}>
							<a>/</a>
							{currentDir === pastPath ?
								<a className="step" href={validRoute}>{dir === '' ? 'explorer' : dir} </a> :
								<Link className="step" to={validRoute}>{dir === '' ? 'explorer' : dir}</Link>
							}
						</React.Fragment>
					)
				})}
			</PathSteps>
		)
	}

	const CardsList = ({ path, list }) => {
		return list.map((data) => {
			return (
				<Card to={'/explorer'+path +'/'+ data.fileName} filePath={`${path}/${data.fileName}`} key={data.fileName} {...data}/>
			)
		})
	}

	return (
		<div>
			<PathComponent/>
			<FolderBody path={currentPath}>
				<CardsList path={currentPath} list={useList} />
			</FolderBody>
		</div>
	)
}

window.addEventListener('load', () => {
	
	if(!AppStore.getState().logged) return
	
	const ServerURL = new URL(AppStore.getState().serverURL)
	
	const WSServer = `ws://${ServerURL.host}/ext/memoria/communication`
	
	const WSConn = new WebSocket(WSServer)
		
		WSConn.onopen = () => {
			const { token } = AppStore.getState()
			const msg = {
				type: 'AUTHENTIFICATION',
				token
			}
			WSConn.send(JSON.stringify(msg))
		}
		WSConn.onmessage = ({ data }) => {
			const parsedMessage = JSON.parse(data)
			const { type } = parsedMessage
			
			switch(type){
				case 'FILESYSTEM_UPDATED':
					Events.emit('FILESYSTEM_UPDATED', parsedMessage.path)
					break;
			}
		}
})

export default Panel