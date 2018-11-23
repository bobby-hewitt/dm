import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './style.css'

const ConfirmTerms = props => (
	<label className={`confirmcheckbox ${props.mustConfirm ? "confirmTerms highlight" : "confirmTerms"} ${props.disableButton ? 'disabled' : ''}`}>
    	<p onClick={props.seeTerms.bind(this)} className="confirmTermsContainer">{props.label}</p>
      	<input type="checkbox" name={props.name} value={props.value} checked={props.confirmChecked} />
      	<span></span>
    </label>
)


export default ConfirmTerms