import React from 'react';
import classnames from 'classnames';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router';

class TitleBar extends React.Component {
    constructor(props) {
	super(props);
	
	this.onHome = this.onHome.bind(this);
	this.onAdd = this.onAdd.bind(this);
	this.addRecipe = this.addRecipe.bind(this);
	this.close = this.close.bind(this);

    }

    onHome() {
	console.log("Go Home");
	return (<div> Hello! </div>);
    }

    // user clicks on 'add recipe' in recipe modal
    onAdd() {
	this.props.setShowRecipeModal(true);
    }

    // display recipe modal
    addRecipe() {
	this.props.setShowRecipeModal(false);
    }

    // close modal -- cancel and delete recipe input?
    close() {
	this.props.setShowRecipeModal(false);
    }
    
    
    render() {
	return (
	    <div>
		<div id="titleBar" className="flexCol">
		    <div className="title">Recipe Box</div>
		    
		    <div className=
			 {classnames({"fixedHeader": this.props.fixHeader},
				     "titleLinks")}>
			<div className="link" onClick={this.onHome}>Home</div>
			<div className="link"
			     onClick={this.onAdd}>Add Recipe</div>
		    </div>

		</div>

		<Modal className="addRecipeModal"
		       show={this.props.showRecipeModal}
		       onHide={this.addRecipe}>
		    <Modal.Header closeButton>
			<Modal.Title> Add Recipe </Modal.Title>
		    </Modal.Header>
		    <Modal.Body>
			<div> Add a recipe stuff here </div>
		    </Modal.Body>
		    <Modal.Footer>
			<Button onClick={this.close}>Close</Button>
		    </Modal.Footer>
		</Modal>

	    </div>
	)
    }
}


export default TitleBar;


