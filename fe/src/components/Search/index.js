import React, { Component } from 'react'
import './style.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setRecipes } from 'actions/recipe'
import { setBlogs } from 'actions/blog'
import { setProducts } from 'actions/product'

class Search extends Component {

	constructor(props){
		super(props)
		console.log(this.props.type)
		this.url = '/' + this.props.type
		this.action = 
			this.props.type === 'products' ? this.props.setProducts :
			this.props.type === 'blogs' ? this.props.setBlogs :
			this.props.type === 'recipes' ? this.props.setRecipes :
			null
		this.state = {
			value: ''
		}
	}

	onChange(e){
		this.setState({value: e.target.value})
		this.props.loader.get(this.url + '?search=' + e.target.value)
		.then((data) => {
			if(this.action) this.action(data)
		})
	}

	onFocus(){
		if(this.props.onFocus)this.props.onFocus()
	}	

	onBlur(){
		if (this.props.onBlur) this.props.onBlur()
	}


	onEnter(){
		console.log('enter')
	}

	render(){
		
		return(
			<input
			type="text"
			name={this.props.name || ''}
			onFocus={this.onFocus.bind(this)}
			onChange={this.onChange.bind(this)}
			onBlur={this.onBlur.bind(this)}
			className="textInput search"
			value={this.state.value}
			placeholder="Search"
			onKeyDown={(event) => {
				if (event.keyCode == 13 && this.onEnter) {
					this.onEnter()
					return false;
				}
			}}
		/>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader
})

const mapDispatchToProps = dispatch => bindActionCreators({
	setRecipes,
	setBlogs,
	setProducts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
