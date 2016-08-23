import React from 'react';
import { Button, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';
import Draggable from 'react-draggable';

class RecipeModal extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            ingredients: [],
            method: [],
        };

        this.updateName = this.updateName.bind(this);
        this.updateIngredients = this.updateIngredients.bind(this);
        this.updateMethod = this.updateMethod.bind(this);
    }

    updateName(event) {
        this.setState({ name: event.target.value });
    }

    updateIngredients(event) {
        this.setState({ ingredients: event.target.value });
    }

    updateMethod(event) {
        this.setState({ method: event.target.value });
    }

    render() {
        return (
            <Draggable>
                <div
                    className="addRecipeModal modal"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"> Add Recipe </h4>
                            </div>
                            
                            <div className="modal-body">
                                <form>
                                    <FormGroup controlId="m_recipeName">
                                        <ControlLabel>Recipe Name</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter recipe name"
                                            value={this.state.name}
                                            onChange={this.updateName}
                                        />
                                    </FormGroup>
                                    
                                    <FormGroup controlId="m_recipeIngredients">
                                        <ControlLabel>Ingredients</ControlLabel>
                                        <FormControl
                                            componentClass="textarea"
                                            value={this.state.ingredients}
                                            onChange={this.updateIngredients}
                                            placeholder="Enter ingredients, separated 
                                                         by commas *or* on separate lines."
                                        />
                                    </FormGroup>
                                    
                                    <FormGroup controlId="m_recipeMethod">
                                        <ControlLabel>Method</ControlLabel>
                                        <FormControl
                                            componentClass="textarea"
                                            value={this.state.method}
                                            onChange={this.updateMethod}
                                            placeholder="Enter the method. 
                                                         Put each step on a separate line."
                                        />
                                    </FormGroup>
                                </form>
                            </div>
                            
                            <div className="modal-footer">
                                <Button onClick={this.props.close}>
                                    Close
                                </Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Draggable>
        );
    }
}

export default RecipeModal;
