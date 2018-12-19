import React, { Component } from 'react'
import { Parallax, Background } from 'react-parallax';
import './style.scss'

export default class HeadlineSection extends Component {
	render(){
		return(

			<Parallax
	            blur={{ min: -10, max: 10 }}
	            bgImage={this.props.image}
	            bgImageAlt="the dog"
	            strength={200}
        	>	
	            <div  className={"headlineSectionContainer " }>
	            	<div className="overlay" >
	           		{this.props.children}
	           		</div>
	            </div>
	        </Parallax>
		)
	}
}
