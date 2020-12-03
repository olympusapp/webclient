import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const StyledDropdown = styled.div`
	padding: 6px;
	position: absolute;
	margin-top: 10px;
	background: ${props => props.theme.dropdown.background};
	border-radius: 7px;
	min-width: 150px;
	box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
	&.displayed {
		animation: open ease-out 0.1s;
		opacity: 1;
	}
	&.hidden {
		animation: close ease-out 0.1s;
		opacity: 0;
		pointer-events: none;
		user-select: none;
	}
	& > span {
		display: block;
		padding: 7px 5px;
		border-radius: 5px;
		text-align: left;
		cursor: pointer;
		:hover{
			background: ${props => props.theme.dropdown.button.hover.background};
		}
	}
	@keyframes open{
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0px);
		}
	}
	@keyframes close{
		from {
			opacity: 1;
			transform: translateY(0px);
		}
		to {
			opacity: 0;
			transform: translateY(-10px);
		}
	}
`

export default (props) => {
		
	const dropdown = React.useRef(null)
	
	React.useEffect(() => {
		
		function closeDropdown(e){
			if(e.target.parentElement !== dropdown.current.parentElement){
				props.displayDropdown(false)
			}
		}
		
		window.addEventListener('click', closeDropdown)
		
		return () => {
			window.removeEventListener('click', closeDropdown)
		}
	},[])
	
	return (
		<StyledDropdown {...props} ref={dropdown}>
			{props.options.map(({ label, action }) => {
				return <span key={label} onClick={action}>{label}</span>
			})}
		</StyledDropdown>
	)
}

