import * as React from 'react'
import {
	BrowserRouter,
	Route,
	Switch,
	Link
} from 'react-router-dom'
import { Provider } from 'react-redux'
import AppStore from './utils/store'
import styled from 'styled-components'

import { ThemeProvider, createGlobalStyle  } from 'styled-components'

import LoginRoute from './routes/login'
import SignupRoute from './routes/signup'
import ExplorerRoute from './routes/explorer'

import AppTheme from './utils/theme'

import '../assets/inter.ttf'

import Sidebar from './components/sidebar'
import Body from './components/body'

import './styles.scss'

const GlobalStyle = createGlobalStyle`
	html {
	}
	body{
		margin:0;
	}
`

const App = styled.div`
	display: flex;
	height: 100%;
`

export default () =>{

	return (
		<ThemeProvider theme={AppTheme}>
			<GlobalStyle/>
			<App>
				<Provider store={AppStore}>
					<BrowserRouter>
						<Sidebar/>
						<Body>
							<Switch>
								<Route exact path='/'>
									<LoginRoute/>
								</Route>
								<Route exact path='/signup'>
									<SignupRoute/>
								</Route>
								<Route path='/explorer'>
									<ExplorerRoute/>
								</Route>
							</Switch>
						</Body>
					</BrowserRouter>
				</Provider>
			</App>
		</ThemeProvider>
	)
}