import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, { TextInput } from 'components/Form'
import Button from 'components/Button'
import Item from 'components/Item'
import { setRecipe, setRecipes } from 'actions/recipe'
import './style.scss'

class Recipes extends Component {

	addNew(){
		this.props.push('/admin/recipe/add')
	}

	onEdit(id){
		this.props.push('/admin/recipe/edit?' + id)
	}

	componentWillMount(){
		this.props.loader.get('/recipes')
		.then((data) => {
			console.log('recipes,', data)
			this.props.setRecipes(data)
		})
		.catch((err)=> {
			console.log('here', err)
			console.log(err)
		})
	}

	render(){
		return(
			<div className="recipe">	
				<Button isRow text="Add new" onClick={this.addNew.bind(this)}/>
				{this.props.recipes.map((recipe, i) => {
					return (
						<Item 
							type="recipe"
							key={i} 
							{...recipe} 
							onEdit={this.onEdit.bind(this)}
							onDelete={this.props.setRecipes.bind(this)}/>
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
	recipes: state.recipe.recipes
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setRecipe,
  setRecipes
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes)