import React, { Component } from 'react'
import './style.scss'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html';
import { EditorState,convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';

const toolbarOptions = { 
   options: ['inline',  'blockType', 'image','link', 'history'],
   blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
   history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    undo: { className: undefined },
    redo: { className: undefined },
  },
   image: {   
    className: undefined,
    component: undefined,
    popupClassName: 'image-popup',
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: true,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
   inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline', ],
    },

	  link: {
	    inDropdown: false,
	    popupClassName: 'linkPopup',

	  },
  }

class TextEditor extends Component {

	constructor(props){
    super(props)
    const html = this.props.value || ''
   console.log(html)
    // const contentBlock = htmlToDraft(html);
    // let editorState = ''
    // if (contentBlock) {
    //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    //   editorState = EditorState.createWithContent(contentState);       
     
    // }
     this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(html)))
    };
   
	}

	onEditorStateChange(editorState){
	   let newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  	this.setState({
      editorState
    }, () => {
      let obj = {
        target: {
          name: this.props.name,
          value: newContent
        }
      }
      this.props.onChange(obj)
    })
  	
	};

	render(){
		return(
			<div className="textEditor">
				<input type="hidden" value={this.props.value}  name={this.props.name}/>
        {this.state.editorState &&
				  <Editor
        		toolbar={toolbarOptions}
        		toolbarStyle={{display:'flex', flexDirection:'row' }}
		        editorState={this.state.editorState}
		        wrapperClassName="wrapper-class"
  					editorClassName="editor-class"
  					toolbarClassName="toolbar-class"
		        onEditorStateChange={this.onEditorStateChange.bind(this)}
		     />
        }
			</div>
		)
	}
}


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  push: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditor)