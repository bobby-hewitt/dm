import React, { Component } from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from 'components/Button'
import "./style.scss";
// import $ from "jquery";
export { default as ImageUpload } from './ImageUpload'
export { default as TextInput } from './TextInput'
export { default as TextEditor } from './TextEditor'
export { default as FindAddress } from './FindAddress'
export { default as ProductSelect } from './ProductSelect'


export default class Form extends Component {

  getValues(id) {
    let obj = {};
    var form = document.getElementById(id);
    let checkboxes = {};
    for (var i = 0; i < form.elements.length; i++) {
      var e = form.elements[i];
      if (e.type === "checkbox") {
        if (e.checked) {
          if (checkboxes[e.name]) {
            checkboxes[e.name].push(e.value);
          } else {
            checkboxes[e.name] = [e.value];
          }
        }
      } else if (e.type === 'file'){

      } else {
        obj[e.name] = e.value;
      }
    }
    let checkboxKeys = Object.keys(checkboxes);
    if (checkboxKeys.length > 0) {
      for (var j = 0; j < checkboxKeys.length; j++) {
        obj[checkboxKeys[j]] = checkboxes[checkboxKeys[j]];
      }
    }
    this.props.onSubmit(Object.assign({}, obj));
  }

  render() {
    return (
      <div>
        <form className="formContainer" id={this.props.formId} style={this.props.style}>
          {this.props.children}
          <div id="formButtonsContainer">
            <Button
              text={this.props.submitText}
              className={`formButton ${this.props.submitting && "disabled"}`}
              id="submitButton"
              onClick={this.getValues.bind(this, this.props.formId)}
            />
            {this.props.secondaryAction && 
              <Button
                text={this.props.secondaryText}
                className={`formButton ${this.props.submitting && "disabled"}`}
                id="secondaryButton"
                onClick={this.props.secondaryAction.bind(this)}
              />
            }
          </div>
        </form>
      </div>
    );
  }
}
