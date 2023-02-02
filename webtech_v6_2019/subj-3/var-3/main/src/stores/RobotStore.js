import {EventEmitter} from 'fbemitter'

class RobotStore{
	constructor(){
		this.robots = [{
			id : 1,
			type : 'worker',
			name : 'tim',
			mass : 1000
		},{
			id : 2,
			type : 'worker',
			name : 'tom',
			mass : 1500
		}]
		this.selected = null
		this.emitter = new EventEmitter()
	}
	getRobots(){
		return this.robots
	}
	getSelected(){
		return this.selected
	}
	selectRobot(id){
		let index = this.robots.findIndex((e) => e.id === id)
		if (index !== -1){
			this.selected = this.robots[index]
		}
		this.emitter.emit('UPDATE')
	}
}

export default RobotStore