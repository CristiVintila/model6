import React from 'react'
import ReactDOM from 'react-dom'
import RobotList from './RobotList'
import RobotDetails from './RobotDetails'
import Robot from './Robot'
import { shallow, mount, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it ('renders a list of robots with select buttons', () => {
	const component = mount(<RobotList />)
	let robot = component.find(Robot).first()
	let button = robot.find('[value="select"]').first()
	expect(button.length).toEqual(1)	
})

it ('valid props on robot', () => {
	const component = mount(<RobotList />)
	let firstRobot = component.find(Robot).first()
	expect(firstRobot.props().item).toEqual({"id": 1, "mass": 1000, "name": "tim", "type": "worker"})
	expect(typeof firstRobot.props().onSelect).toEqual('function')
})

it ('select a robot', () => {
	const component = mount(<RobotList />)
	let firstRobot = component.find(Robot).first()
	let button = firstRobot.find('[value="select"]').first()
	button.simulate('click')
	expect(component.find(RobotDetails).length).toEqual(1)
	expect(component.find(Robot).length).toEqual(0)	
})

it ('cancel selection', () => {
	const component = mount(<RobotList />)
	let firstRobot = component.find(Robot).first()
	let button = firstRobot.find('[value="select"]').first()
	button.simulate('click')
	button = component.find('[value="cancel"]').first()
	button.simulate('click')
	expect(component.find(RobotDetails).length).toEqual(0)	
	expect(component.find(Robot).length).toEqual(2)	
})
