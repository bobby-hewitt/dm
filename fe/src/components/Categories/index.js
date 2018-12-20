import React, { Component } from 'react'
import './style.scss'
import Button from 'components/Button'
export default class Categories extends Component {
	render(){
		return(
			<div className="container">
				<div className="categoriesContainer">
					{/*<div className="row">
						<div onClick={this.props.push.bind(this, '/shop')}className="category small" style={{backgroundImage: 'url(' + require('assets/images/background.png') + ')'}}>
							<div className="overlay">
								<h5>All categories</h5>
							</div>
						</div>
					</div>*/}
					<div className="row">
					<div className='offset-md-1'/>
					{this.props.categories && this.props.categories.map((category, i) => {

						return(
							<div key={i} className="col-md-2  col-xs-12" >
								<div className="category" style={{backgroundImage: 'url(' + category.image + ')'}}>
									<div className="overlay">
										<Button onClick={this.props.push.bind(this, category.path)} text={category.title}/>
									</div>
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