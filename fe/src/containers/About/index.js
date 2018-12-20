import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Signup from 'components/Signup'
import Button from 'components/Button'
import HeadlineSection from 'components/HeadlineSection'
import TransparentSection from 'components/TransparentSection'
import ImageSection from 'components/ImageSection'

class About extends Component {

	render(){
		return(
			<div className="aboutContainer">
				
				<HeadlineSection 
					video={require('assets/video/salt.mov')}
					>
					<h3 className="centerText">Hello world</h3>
					<Button text="Shop now" onClick={this.props.push.bind(this, '/')}/>
				</HeadlineSection>	
				<TransparentSection 
					image={require('assets/images/spices.jpeg')}>
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-12">
								
							</div>			
							<div className="col-lg-6 col-md-12">
								<div className="col-md-spacing">
								<h5 className="centerText">We love <span>spice </span>and we know you do too</h5>
								<p className="centerText">  Not all dishes have to set your mouth on fire, but a kick, a tang or a twist should ignite your senses, inspire your imagination and bring the farthest reaches of the planet right to your kitchen.</p>
								</div>
							</div>
							<div className="col-lg-3 col-md-12">
								
							</div>
						</div>
					</div>
				</TransparentSection>
				<HeadlineSection 
					image={require('assets/images/spices.jpeg')}>
					<div className="container">
						<div className="row">
							<div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
								<h3 className="centerText">Hello world</h3>
							
							</div>
						</div>
					</div>
				</HeadlineSection>
				<TransparentSection 
					image={require('assets/images/spices.jpeg')}>
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-12">
								
							</div>			
							<div className="col-lg-6 col-md-12">
								<div className="col-md-spacing">
								<h5 className="centerText">We love to <span>cook</span> and we know you do too.</h5>
								<p className="centerText">Cooking isn't hard but finding the right flavours can be tough.  That's where we come in.  We make life easy for you to find tintilating spices to cook the recipes you love and the ones you don't know you lveo yet. </p>
								</div>
							</div>
							<div className="col-lg-3 col-md-12">
								
							</div>
						</div>
					</div>
				</TransparentSection>
				<HeadlineSection 
					image={require('assets/images/spices.jpeg')}>
					<div className="container">
						<div className="row">
							<div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
								<h3 className="centerText">Hello world</h3>
							
							</div>
						</div>
					</div>
				</HeadlineSection>
				<TransparentSection 
					image={require('assets/images/spices.jpeg')}>
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-12" />									
							<div className="col-lg-6 col-md-12">
								<div className="col-md-spacing">
								<h5 className="centerText">We love to <span>experiment</span> and we know you do too</h5>
								<p className="centerText">There is only one certainty with cooking.  If you don't try you'll never know.  To make the best food you have to explore and experiment. Allow yourself to find new concoctions and flavours by trying new things. </p>
								</div>
							</div>
							<div className="col-lg-3 col-md-12" />
						</div>
					</div>
				</TransparentSection>
				<HeadlineSection 
					image={require('assets/images/spices.jpeg')}>
					<div className="container">
						<div className="row">
							<div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
								<h3 className="centerText">Hello world</h3>
								<Button text="Shop now" onClick={this.props.push.bind(this, '/')}/>						
							</div>
						</div>
					</div>
				</HeadlineSection>
			</div>
		)
	}
}



const mapStateToProps = state => ({
	loader: state.setup.loader,
	products: state.product.products
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)