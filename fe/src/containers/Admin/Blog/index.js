import React, { Component } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form, { TextInput } from 'components/Form'
import Button from 'components/Button'
import Item from 'components/Item'
import { setBlog, setBlogs } from 'actions/blog'
import './style.scss'

class Blog extends Component {

	addNew(){
		this.props.push('/admin/blog/add')
	}

	onEdit(id){
		this.props.push('/admin/blog/edit?' + id)
	}

	componentWillMount(){
		this.props.loader.get('/blog')
		.then((data) => {
			this.props.setBlogs(data)
		})
		.catch((err)=> {
			console.log(err)
		})
	}

	render(){
		return(
			<div className="Blog">	
				<Button text="Add new" onClick={this.addNew.bind(this)}/>
				{this.props.blogs.map((blog, i) => {
					return (
						<Item 
							type="blog"
							key={i} 
							{...blog} 
							onEdit={this.onEdit.bind(this)}
							onDelete={this.props.setBlogs.bind(this)}/>
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	loader: state.setup.loader,
	blogs: state.blog.blogs
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path),
  setBlog,
  setBlogs
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)