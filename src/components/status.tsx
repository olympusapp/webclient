import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Dropdown from './dropdown'
import { useHistory } from 'react-router-dom'
import { logOff } from '../utils/actions'
import DropArrow from '../../assets/drop_arrow.svg'

const StyledStatus = styled.div`
	padding: 5px 0px;
	margin: 17px 10px;
	text-align: center;
	cursor: pointer;
	user-select: none;
	& img {
		margin-left: 10px;
		height: 7px;
	}
`

export default () => {
	const username = useSelector(state => state.username)
	const serverName = useSelector(state => state.serverName)
	
	const dispatch = useDispatch()
	const history = useHistory()

	const options = [
		{
			label: 'Login',
			action(){
				history.push("/login")
			}
		},
		{
			label: 'Logoff',
			action(){
				dispatch(logOff())
			}
		}
	]
	
	const [isDisplayed, display] = React.useState(false)
	
	return (
		<StyledStatus>
			<span onClick={() => display(!isDisplayed)}>{username}@{serverName ? serverName : 'empty'}</span>
			<img src={DropArrow}/>
			<Dropdown displayDropdown={display} className={isDisplayed ? 'displayed' : 'hidden'} options={options}/>
		</StyledStatus>
	)
}

