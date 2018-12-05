import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.scss'
import TextInput from '../TextInput'
import $ from 'jquery'
import Button from 'components/Button'

class FileUpload extends Component {
	constructor(props){
		super(props)
		this.state = {
			label: '',
			link: this.props.value || null,
			isComplete: this.props.value ? true : false,
			browseLabel: 'Browse',
			isUploading: false
		}
	}

	componentDidMount(){
		if(!this.state.isComplete){
			this.mountClickHandlers()
		}
	}

	mountClickHandlers(){
		let self = this;
		document.getElementById(this.props.name).onchange = (e) => {
			const files = document.getElementById(this.props.name).files;
			if (files.length > 0){
				self.setState({browseLabel: files[0].name})
			}
		}

		$('#falseInput' + self.props.name).click(function(){

			$('#' + self.props.name).click()
			
		})
	}

	


	uploadFile(file, signedRequest, url){
		let self = this;
	      var apiUrl = 'https://api.imgur.com/3/image';
	      var apiKey = '8b9ea7e21c45b2f';
	      var settings = {
	        async: false,
	        crossDomain: true,
	        processData: false,
	        contentType: false,
	        type: 'POST',
	        url: apiUrl,
	        headers: {
	          Authorization: 'Client-ID ' + apiKey,
	          Accept: 'application/json'
	        },
	        mimeType: 'multipart/form-data'
	      };

	      var formData = new FormData();
	      formData.append("image", file);
	      settings.data = formData;

	      $.ajax(settings)
	      .done(function(response) {
	      	let data =JSON.parse(response)
	      	console.log(data.data.link)
	        self.setState({link: data.data.link, isUploading:false, isComplete:true})
	      })
	      .fail(function(err){
	      	self.setState({isUploading:false, error: true})
	      });
	}


	beginUpload(){
			this.setState({isUploading: true}, () => {
				const file = document.getElementById(this.props.name).files[0];
			    if(file === null){
			      return alert('No file selected.');
			    }
		    	this.uploadFile(file);
			})
		    
	}

	onFalseClick(){
		console.log('clicky clicky')
	}

	startAgain(){
		this.setState({link: null, isUploading:false, isComplete:false}, () => {
			this.mountClickHandlers()
		})
	}

	render(){
		return(
			<div>
				
				{!this.state.isComplete && !this.state.isUploading &&
					<div className="fileUploadContainer">
						<Button className="formFalseFileInput" text={this.state.browseLabel} id={"falseInput" + this.props.name} onClick={this.onFalseClick.bind(this)}/>
						<Button className={"uploadButton"} disabled={this.state.browseLabel=== 'Browse' || this.state.isUploading}text="upload"onClick={this.beginUpload.bind(this)} />
					</div>
				}	
			  	
			  	{!this.state.isComplete &&
					<input name={this.props.name} id={this.props.name} type="file" className="fileInput" placeholder={this.props.placeholder} />
				}
				{this.state.isComplete &&
					<div>
						<img src={this.state.link} className="imagePreview" />
						<input name={this.props.name} type="hidden" value={this.state.link} />
						<Button className={"uploadButton"} text="Choose another image "onClick={this.startAgain.bind(this)} />
					</div>
				}
				{this.state.isUploading && 
					<div className="uploading">
						Please wait while the image uploads
					</div>
				}
		  	</div>
		)
	}
} 
	

const mapStateToProps = state => ({
  apiHost:state.setup.apiHost,
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUpload)
