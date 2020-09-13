import * as React from 'react'
import { Explorer } from '../utils/api'
import Card from '../components/file_card'
import Button from '../components/button'
import { dirname, basename }  from 'path'
import AppStore from '../utils/store'
import { useHistory , BrowserRouter, Route, Switch, Link, useParams, useRouteMatch } from 'react-router-dom'
import * as EventEmitter from 'eventemitter3'
import FolderBody from '../components/folder_body'

const Events = new EventEmitter()

const Panel = () => {

	const [useList, setList] = React.useState([])
	const [useStatus, setStatus] = React.useState(true)
	const currentPath = getCurrentPath()
	const pastPath = dirname(`/explorer${currentPath}`)
	const pastFolder = basename(pastPath)
	
	function FSUpdated() {
		Explorer(currentPath).then((res: any) => {
			setList(res.data.folderPaths)
		}).catch(() => {
			setStatus(false)
		})
	}
	
	React.useEffect(() => {
		FSUpdated()
		
		Events.on('FILESYSTEM_UPDATED', FSUpdated)
		
		return () => Events.off('FILESYSTEM_UPDATED', FSUpdated)
		
	},[])

	
	return (
		<div>
			{useStatus? '': 'Forbidden'}
			<Switch>
					<Route exact path={`/explorer${currentPath}`}>
						{currentPath !== '' ? (
							<Button>
								<Link to={pastPath}>{`<-`} {pastFolder}</Link>
							</Button>
						): ''}
						<FolderBody path={currentPath}>
							<CardsList path={currentPath} list={useList}/>
						</FolderBody>
				</Route>
				<Route path={`/explorer${currentPath}/:path`}>
					<Panel/>
				</Route>
			</Switch>
		</div>
	)
}

const getCurrentPath = () => location.pathname.replace('/explorer','').replace(/(%20)/gm,' ')

const CardsList = ({ path, list }) => {
	return list.map((data) => {
		return (
			<Card key={data.fileName} to={`/explorer${path}/${data.fileName}`} {...data}/>
		)
	})
}


class Communication {
	private server: any;
	constructor(){
		this.server = new WebSocket('ws://localhost:3000/api/communication')
		
		this.server.onopen = () => {
			const { token } = AppStore.getState()
			const msg = {
				type: 'AUTHENTIFICATION',
				token
			}
			this.server.send(JSON.stringify(msg))
		}
		this.server.onmessage = ({ data }) => {
			const parsedMessage = JSON.parse(data)
			const { type } = parsedMessage
			
			switch(type){
				case 'FILESYSTEM_UPDATED':
					Events.emit('FILESYSTEM_UPDATED', parsedMessage.path)
					break;
			}
		}
	}
}

window.addEventListener('load', () => {
	new Communication()
})

export default Panel