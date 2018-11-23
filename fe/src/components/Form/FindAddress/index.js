import React, { Component } from 'react'
import Form, { TextInput } from 'components/Form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setPair } from 'actions/account'
import './style.scss'

class FindAddress extends Component {

	constructor(props){
		super(props)
		this.sessionToken = new window.google.maps.places.AutocompleteSessionToken();
		this.state = {
			inputValue: '',
			results: null
		}
	}

	onClick(place){
		// set place to state
		this.props.setPair({key:'place', value: place})
		this.setState({inputValue: place.description, results: null})

	}

	onChange(e){
		let value = this.refs.addressLookup.value
		this.setState({inputValue: value}, () => {

			var service = new window.google.maps.places.AutocompleteService();
			service.getQueryPredictions({ input: value, sessionToken: this.sessionToken }, (results, status) => {
				this.setState({results})
			});
		})
		
	}

	render(){
		return(
			<div className="findAddressContainer textInput">
				<input className="" name="address"value={this.state.inputValue} ref="addressLookup" type="text" onChange={this.onChange.bind(this)} />	
				{this.state.results && this.state.results.map((r,i) => {
					return(
						<div key={i}className="result" onClick={this.onClick.bind(this, r)}>
							{r.description}
						</div>
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  setPair,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindAddress)