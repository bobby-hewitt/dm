import React, { Component } from 'react'
import Checkbox from '../Checkbox'
import './style.css'
import '../style.css'



class SectorSelect extends Component{
	constructor(props) {
		super(props)

		this.state = { selected: [] }
	}
	selectToggle = (e) => {
		let selected = this.state.selected;
		if(selected.includes(e.target.value)) {
			var index = selected.indexOf(e.target.value);
			if (index > -1) {
			  selected.splice(index, 1);
			}
		} else {
			selected.push(e.target.value)
		}
		this.setState({selected: selected}, () => {
			this.props.validate ? this.props.validate(selected.length) : null
		})
	}
	render(){
		return(
			<div className="sectorSelectContainer">
				<p className="label">{this.props.label ? this.props.label : ''} <i>Select at least 1</i></p>
				{this.props.fieldError ? <span className="error">Maximum of 7 only</span> : null}
				<div className="rowContainer">
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Consumer / B2C" name={this.props.name} selected={this.props.selected} value="Consumer - B2C"/>
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Education" name={this.props.name} selected={this.props.selected} value="Education"/>
				</div>
				<div className="rowContainer">
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Energy" name={this.props.name} selected={this.props.selected} value="Energy"/>
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Enterprise / B2B" name={this.props.name} selected={this.props.selected} value="Enterprise - B2B"/>
				</div>
				 <div className="rowContainer">
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="FinTech" name={this.props.name} selected={this.props.selected} value="FinTech"/>
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Healthcare" name={this.props.name} selected={this.props.selected} value="Healthcare"/>
				</div>
				 <div className="rowContainer">
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Impact" name={this.props.name} selected={this.props.selected} value="Impact"/>
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Lifestyle" name={this.props.name} selected={this.props.selected} value="Lifestyle"/>
				</div>
				 <div className="rowContainer">
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Marketplaces" name={this.props.name} selected={this.props.selected} value="Marketplaces"/>
					<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Media & Entertainment" name={this.props.name} selected={this.props.selected} value="Media & Entertainment"/>
				</div>
				<div className="rowContainer">
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Technology" name={this.props.name} selected={this.props.selected} value="Technology"/>
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Cyber Security" name={this.props.name} selected={this.props.selected} value="Cyber Security"/>
				</div>
				<div className="rowContainer">
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Gaming" name={this.props.name} selected={this.props.selected} value="Gaming"/>
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Crypto / Blockchain" name={this.props.name} selected={this.props.selected} value="Crypto / Blockchain"/>
				</div>
				<div className="rowContainer">
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Hardware" name={this.props.name} selected={this.props.selected} value="Hardware"/>
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Data (or Big Data)" name={this.props.name} selected={this.props.selected} value="Data (or Big Data)"/>
				</div>
				<div className="rowContainer">
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Software" name={this.props.name} selected={this.props.selected} value="Software"/>
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Funds" name={this.props.name} selected={this.props.selected} value="Funds"/>
				</div>
				<div className="rowContainer">
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Real Estate" name={this.props.name} selected={this.props.selected} value="Real Estate"/>
				 	<Checkbox error={this.props.fieldError} onClick={this.selectToggle} label="Insurance" name={this.props.name} selected={this.props.selected} value="Insurance"/>
				</div>
			</div>
		)
	}
}


export default SectorSelect