import React from 'react';
import {Button, Modal, FormGroup,
	FormControl, ControlLabel} from 'react-bootstrap';

class RecipeModal extends React.Component {

    constructor(props) {
	super(props);

	this.state = {
	    name: "",
	    ingredients: [],
	    method: []
	}

	this.updateName = this.updateName.bind(this);
	this.updateIngredients = this.updateIngredients.bind(this);
	this.updateMethod = this.updateMethod.bind(this);
    }

    updateName(event) {
	this.setState({name: event.target.value});
    }

    updateIngredients(event) {
	this.setState({ingredients: event.target.value});
    }

    updateMethod(event) {
	this.setState({method: event.target.value});
    }
    
	
    render() {
	return (
	    <Modal className="addRecipeModal"
		   show={this.props.showRecipeModal}
		   onHide={this.props.addRecipe}>
		
		<Modal.Header closeButton>
		    <Modal.Title> Add Recipe </Modal.Title>
		</Modal.Header>
		
		<Modal.Body>
		    <form>
			<FormGroup controlId="m_recipeName">
			    <ControlLabel>Recipe Name</ControlLabel>
			    <FormControl
				type="text"
				placeholder="Enter recipe name"
				value={this.state.name}
				onChange={this.updateName}/>
			</FormGroup>
			<FormGroup controlId="m_recipeIngredients">
			    <ControlLabel>Ingredients</ControlLabel>
			    <FormControl componentClass="textarea"
					 value={this.state.ingredients}
					 onChange={this.updateIngredients}
					 placeholder="Enter ingredients, separated by commas *or* on separate lines." />
			</FormGroup>
			<FormGroup controlId="m_recipeMethod">
			    <ControlLabel>Method</ControlLabel>
			    <FormControl componentClass="textarea"
					 value={this.state.method}
					 onChange={this.updateMethod}
					 placeholder="Enter the method. Put each step on a separate line." />
			</FormGroup>
			
		    </form>
		</Modal.Body>
		
		<Modal.Footer>
		    <Button onClick={this.props.close}>Close</Button>
		</Modal.Footer>
		
	    </Modal>
	)
    }
}

export default RecipeModal;
