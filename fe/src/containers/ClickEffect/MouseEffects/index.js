import React, { Component } from 'react'
import './style.scss'
import Dot from '../Dot'
import random from 'helpers/random'

export default class MouseEffects extends Component {

	constructor(props){
		super(props)
		this.timeouts = []
		this.state = {
			mouse: {x: this.props.x || '-100px', y: this.props.y || '-100px'}
		}
	}
	//set gloabl ref to this
	componentDidMount(){
		this.props.onMount(this)
	}
	//cleanup
	componentWillUnmount(){
		for (var i in this.timeouts) clearTimeout(this.timeouts[i])
		cancelAnimationFrame(this.animationFrame)
	}
	//mouse handlers
	getXY(evt){
		console.log('here ')
		if (evt.persist) evt.persist()
		let isTouch = evt.nativeEvent && evt.nativeEvent.touches && evt.nativeEvent.touches[0]
		let x = isTouch ? evt.nativeEvent.touches[0].clientX : evt.clientX
		let y = isTouch ? evt.nativeEvent.touches[0].clientY : evt.clientY
		console.log('here ' ,x,y)
		return {x,y}
	}
	onMouseDown(e){
		console.log('here downs')
		if (e.persist) e.persist()
		this.setState({mouseDown: true, mouse: this.getXY(e)}, () => {

			this.onFollowDots()
		})
	}
	onMouseUp(e){
		if (e.persist) e.persist()
		if (this.state.mouseDown){
			cancelAnimationFrame(this.animationFrame)
			this.setState({mouseDown: false, followDots: [], mouse: this.getXY(e)}, () => {
				console.log('mouse up', this.state)
				if (this.props.onMouseUp) this.props.onMouseUp()
				this.onRotatingDots(e)
			})
		}
	}
	onMouseMove(evt, isTouch){
		if (evt.persist) evt.persist()
		if (this.state.mouseDown){
			this.setState({mouse: this.getXY(evt)}, () => {
				if (this.props.onMouseMove) this.props.onMouseMove()
			})
		}	
	}
	//animations
	onRotatingDots(e){
		if (e.persist) e.persist()
		this.setState({rotatingDots: []}, () => {
			for (var i = 0; i < 10; i++){
				this.timeouts[i] = setTimeout(() => {
					let rotatingDots = Object.assign([], this.state.rotatingDots)
					rotatingDots.push(random(5,15) + 'px')
					this.setState({rotatingDots: rotatingDots})
				}, i * 25)
			}
		})
	}
	onFollowDots(e){
		
		let newDots = this.state.followDots || []
		let newDot = {x: this.state.mouse.x, y: this.state.mouse.y}
		newDots.push(newDot)
		this.setState({followDots: newDots}, () => {
			this.animationFrame = requestAnimationFrame(this.onFollowDots.bind(this, {x: this.state.mouse.x, y: this.state.mouse.y}))
		})
	}
	render(){

		return(
			<div className="mouseHandler" >
				{this.state.mouseDown && this.state.followDots && this.state.followDots.map((d,i) => {
					return(
						<Dot key={i} {...d}/>
					)
				})}
				{this.state.rotatingDots && 
					<div className="mouseHandler__rotate--container"style={{top: this.state.mouse.y, left: this.state.mouse.x }} > 
						{this.state.rotatingDots.map((d, i) => {
							return(
								<div className="relative" key={i} style={{transform:`rotate(${(i-12 / 2) * (360 / 12)}deg)`}} >
									<Dot />
								</div>
							)
						})}
					</div>
				}
			</div>
		)
	}
}