import React from 'react';
import { List } from 'immutable';
import { Button, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';
import Draggable from 'react-draggable';
import Section from './ModalComponents/Section';

class RecipeModal extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            ingredientSections: new List([{ name: 'main', ingredients: [] }]),
            methodSections: new List([{ name: 'main', instructions: [] }]),
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
            <Draggable handle=".modal-header">
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

                                    {
                                        this.state.ingredientSections.map((section, index) => (
                                            <Section
                                                className="section"
                                                key={`is_${index}`}
                                                type="Ingredients"
                                                name={section.name}
                                            />
                                        ))
                                    }
                                       
                                    <FormGroup className="form-inline">
                                   
                                        <FormControl
                                            className=""
                                            type="text"
                                            placeholder="Add New Ingredients Section Name
                                                         (e.g. Ingredients Needed For The Filling)"
                                        />
                                            
                                        <button
                                            type="button"
                                            className="btn btn-default new-form-btn"
                                            aria-label="New Section"
                                        >
                                            <span
                                                className="glyphicon glyphicon-plus"
                                                aria-hidden="true"
                                            />
                                        </button>
                                       
                                    </FormGroup>
                                       
                                    {
                                        this.state.methodSections.map((section, index) => (
                                            <Section
                                                className="section"
                                                key={`ms_${index}`}
                                                type="Method"
                                                name={section.name}
                                            />
                                        ))
                                    }
                
                                    <FormGroup className="form-inline">
                                   
                                        <FormControl
                                            className=""
                                            type="text"
                                            placeholder="Add New Method Section Name
                                                         (e.g. How To Make The Filling)"
                                        />
                                            
                                        <button
                                            type="button"
                                            className="btn btn-default new-form-btn"
                                            aria-label="New Section"
                                        >
                                            <span
                                                className="glyphicon glyphicon-plus"
                                                aria-hidden="true"
                                            />
                                        </button>
                                       
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
