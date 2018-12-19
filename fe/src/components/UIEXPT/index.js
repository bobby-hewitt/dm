import React, { Component } from 'react'
import './style.scss'

export default class UIEXPT extends Component {

	constructor(props){
		super(props)
		this.state = {
			bits: []
		}

		this.delay = 100
		this.numOfBits = 50
		this.timeouts = []
		
	}

	componentDidMount(){
		this.createBits()
	}

	createBits(){
		for (var i = 0 ; i < this.numOfBits; i++){
			this.timeouts[i] = setTimeout(() => {
				this.createBit(i)
			}, i * this.delay)
		}
	}

	componentWillUnmount(){
		for(var i = 0; i < this.timeouts.length; i++){
			clearTimeout(this.timeouts[i])
		}
	}



	createBit(i){
		let bits = Object.assign([], this.state.bits)
		bits.push(i)
		console.log('pushing buts')
		this.setState({bits})
	}

	render(){
		return(
			<div className="UIEXPT">
				{this.state.bits.map((bit, i) => {
					let isEven = i%2 === 0
					return(
						<div className="bitContainer">
							<div className={isEven ? "even bit" : 'bit'}>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
}