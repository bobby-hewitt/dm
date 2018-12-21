import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html';
import { EditorState,convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Form, {TextEditor, TextInput, ImageUpload, ProductSelect} from 'components/Form'
import { onFieldChange, setRecipe } from 'actions/recipe'

class EditRecipe extends Component {

	constructor(props){
		super(props)
		this.state = {
			pageIsLoaded:false
		}
	}

	onSubmit(form){
		console.log(form)
		let isPut = window.location.search
		let action = isPut ? 'put' : 'post'
		let path = isPut ? '/admin/recipe/' + this.props.recipe._id : '/admin/recipe' 
		
		this.props.loader[action](path, form)
		.then((recipes) => {
			this.props.push('/admin/recipe')
		})
		.catch((err) => {
			console.log(err)
		})
	}

	componentWillMount(){
		if (this.props.isEdit){
			console.log('identified edit')
			this.props.loader.get('/recipe/' + window.location.search.replace('?', ''))
			.then((data) => {
				console.log('setting recipe')
				this.props.setRecipe(data[0], () => {
					this.setState({pageIsLoaded: true})
				})
			})
			.catch((err) => {
				console.log(err)
			})
		} else {
			this.setState({pageIsLoaded: true})
		}
	}

	onChange(e){
		
		this.props.onFieldChange({
			field: e.target.name,
			value: e.target.value
		})
	}

	componentWillUnmount(){
		this.props.setRecipe({})
	}

	render(){
		
		return(
			<div className="Admin">

				{this.state.pageIsLoaded &&
					<Form 
						formId="Post"
						onSubmit={this.onSubmit.bind(this)}
						submitText="Submit"
						secondaryAction={this.props.push.bind(this, '/admin/recipe')}
						secondaryText="Cancel"
					>	

						<ImageUpload name="imageUpload" value={this.props.recipe.image} name="image"/>
						{this.props.isEdit &&
							<TextInput name="_id" value={this.props.recipe._id} type="hidden"/>	
						}
						<ProductSelect products={this.props.recipe.products} productIds={this.props.recipe.productIds} onChange={this.onChange.bind(this)}/>
						<TextInput name="title" value={this.props.recipe.title} type="email"  onChange={this.onChange.bind(this)} placeholder="Title"/>
						<TextEditor name="body" value={this.props.recipe.body} onChange={this.onChange.bind(this)}/>	
						
					</Form>
				}
			</div>
		)
	}
}


const mapStateToProps = state => ({
	router: state.router,
	loader: state.setup.loader,
	recipe: state.recipe.recipe
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  onFieldChange,
  setRecipe
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipe)