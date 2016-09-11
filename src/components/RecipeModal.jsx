import React from 'react';
import { List } from 'immutable';
import { Button, FormGroup, Panel,
         FormControl, ControlLabel, Form } from 'react-bootstrap';
import Draggable from 'react-draggable';
import Section from './ModalComponents/Section';

class RecipeModal extends React.Component {
    
    constructor(props) {
        super(props);

        // there may be multiple parts (i.e. sections) to a recipe's
        // ingredients/method each section keeps track of its own elements
        this.state = {
            name: '',
            servings: '',
            cookTime: '',
            prepTime: '',
            ingredientSections: new List([{ name: 'main', ingredients: [] }]),
            methodSections: new List([{ name: 'main', instructions: [] }]),
        };

        this.editName = this.editName.bind(this);
        this.editServings = this.editServings.bind(this);
        this.editCookTime = this.editCookTime.bind(this);
        this.editPrepTime = this.editPrepTime.bind(this);
    }

    editName(event) {
        this.setState({ name: event.target.value });
    }

    editServings(event) {
        this.setState({ servings: event.target.value });
    }

    editCookTime(event) {
        this.setState({ cookTime: event.target.value });
    }

    editPrepTime(event) {
        this.setState({ prepTime: event.target.value });
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
                                <h3 className="modal-title"> Add Recipe </h3>
                            </div>
                            
                            <div className="modal-body">
                                <form>
                                    
                                    <Panel className="pastel-red">
                                        <FormGroup
                                            className="flexCols 
                                                       verticallyCentered"
                                        >
                                            <ControlLabel>Name</ControlLabel>
                                            <FormControl
                                                className="long-input"
                                                type="text"
                                                value={this.state.name}
                                                onChange={this.editName}
                                                placeholder="Recipe Name"
                                            />
                                        </FormGroup>
                                    </Panel>
                                    
                                    <Panel className="pastel-green">
                                        
                                        <div className="info"><b>
                                            The following information is
                                            optional, but will appear on the
                                            front page if you enter it.
                                        </b></div>
                                        
                                        <FormGroup>
                                            <ControlLabel>
                                                Servings
                                            </ControlLabel>
                                            <FormControl
                                                className="long-input"
                                                type="text"
                                                value={this.state.servings}
                                                onChange={this.editServings}
                                                placeholder="Number of servings"
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel>
                                                Prep Time
                                            </ControlLabel>
                                            <FormControl
                                                className="long-input"
                                                type="text"
                                                value={this.state.prepTime}
                                                onChange={this.editPrepTime}
                                                placeholder="How long does this 
                                                             recipe take to prep?"
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <ControlLabel>
                                                Cook Time
                                            </ControlLabel>
                                            <FormControl
                                                className="long-input"
                                                type="text"
                                                value={this.state.editCookTime}
                                                onChange={this.editCookTime}
                                                placeholder="If this recipe 
                                                             needs time in the 
                                                             oven, enter how 
                                                             long it needs"
                                            />
                                        </FormGroup>
                                    </Panel>

                                    <Panel className="pastel-blue">
                                        {
                                            this.state.ingredientSections.map(
                                                (section, index) => (
                                                    <Section
                                                        className="section"
                                                        key={`is_${index}`}
                                                        type="Ingredients"
                                                        name={section.name}
                                                    />
                                                ))
                                        }
                
                                        <FormGroup
                                            className="form-inline"
                                        >
                                            <FormControl
                                                type="text"
                                                placeholder="Add New 
                                                             Ingredients Section
                                                             Name (e.g. 
                                                             Ingredients Needed
                                                             For The Filling)"
                                            />
                                            
                                            <button
                                                type="button"
                                                className="btn btn-default 
                                                           new-form-btn"
                                                aria-label="New Section"
                                            >
                                                <span
                                                    className="glyphicon 
                                                               glyphicon-plus"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                       
                                        </FormGroup>
                                    </Panel>

                                    <Panel className="pastel-blue">
                                        {
                                            this.state.methodSections.map(
                                                (section, index) => (
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
                                                placeholder="Add New Method 
                                                             Section Name (e.g.
                                                             How To Make The 
                                                             Filling)"
                                            />
                                            
                                            <button
                                                type="button"
                                                className="btn btn-default 
                                                           new-form-btn"
                                                aria-label="New Section"
                                            >
                                                <span
                                                    className="glyphicon 
                                                               glyphicon-plus"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </FormGroup>
                                    </Panel>
                                    
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
