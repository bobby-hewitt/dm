import React, { Component } from 'react'
import './style.scss'
import Button from 'components/Button'
export default class Categories extends Component {
	render(){
		return(
			<div className="container">
			<div className="categoriesContainer">
				<div className="row">
					<div onClick={this.props.push.bind(this, '/shop')}className="category small" style={{backgroundImage: 'url(' + require('assets/images/background.png') + ')'}}>
						<div className="overlay">
							<h5>All categories</h5>
						</div>
					</div>
				</div>
				<div className="row">
				{this.props.categories && this.props.categories.map((category, i) => {
					return(
						<div key={i} className="category col-xl-3 col-lg-4 col-sm-6 col-xs-12" style={{backgroundImage: 'url(' + category.image + ')'}}>
							<div className="overlay">
								<Button onClick={this.props.push.bind(this, category.path)} text={category.title}/>
								
							</div>
						</div>
					)
				})}
				</div>
				</div>
			</div>
		)
	}
}