import React, { Component } from 'react'
import { Parallax, Background } from 'react-parallax';
import './style.scss'

export default class HeadlineSection extends Component {
	render(){
		return(

			<Parallax
	            blur={{ min: -10, max: 10 }}
	            bgImage={this.props.image ? this.props.image : null}
	            strength={200}
        	>	
	        	{this.props.video && 
	        		<Background className="headlineSectionContainer">
		                <video width="100%" height="auto" autoPlay loop>
						  <source src={this.props.video} type="video/mp4"/>
						  Your browser does not support the video tag.
						</video>
		            </Background>
	        	}
	            <div  className="headlineSectionContainer">
	            	<div className="overlay" >
	           		{this.props.children}
	           		</div>
	            </div>
	        </Parallax>
		)
	}
}
