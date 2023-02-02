import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'
import RobotDetails from './RobotDetails'

// TODO : adăugați posibilitatea de a vizualiza detaliile unui robot
// RobotList are 2 stări una de detalii și una de listă
// se poate trece în starea de detalii printr-un buton pe fiecare robot
// se poate trece înapoi la listă printr-un buton de anulare

// TODO : add the posibility to view a robot's details
// RobotList has 2 states, one for details for a robot and one for the full list of robots
// passing to the details state is done with a button on each robot
// returning tothe list is done with a cancel button

class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : [],
		}
		
	}
	componentDidMount(){
		this.store = new RobotStore()
		this.setState({
			robots : this.store.getRobots()
		})
		this.store.emitter.addListener('UPDATE', () => {
			this.setState({
				robots : this.store.getRobots(),
			})			
		})
	}
	render() {
		return (
		<div>		 
			{
				this.state.robots.map((e, i) => 
					<Robot item={e} key={i} />
				)
			}
		</div>
	)  		
	}
}

export default RobotList
