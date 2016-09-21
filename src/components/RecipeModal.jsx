import React from 'react';
import { fromJS } from 'immutable';
import { Button, FormGroup, Panel, Modal, 
         FormControl, ControlLabel } from 'react-bootstrap';
import Draggable from 'react-draggable';
import Section from './ModalComponents/Section';

class RecipeModal extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(props.wipRecipe);
        // there may be multiple parts (i.e. sections) to a recipe's
        // ingredients/method each section keeps track of its own elements
        this.state = {
            name: '',
            servings: '',
            cookTime: '',
            prepTime: '',
            
            ingredientSections: fromJS({ main: [] }),
            methodSections: fromJS({ main: [] }),
        };

        this.editName = this.editName.bind(this);
        this.editServings = this.editServings.bind(this);
        this.editCookTime = this.editCookTime.bind(this);
        this.editPrepTime = this.editPrepTime.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.updateIngredients = this.updateIngredients.bind(this);
        this.updateMethod = this.updateMethod.bind(this);
    }

    componentWillReceiveProps({ wipRecipe }) {
        const { name = '', servings = '', cookTime = '', prepTime = '' } =
            wipRecipe;
        console.log(servings);
        this.setState({ name, servings, cookTime, prepTime });
    }
    
    editName(event) {
        this.setState({ name: event.target.value });
        //this.props.wipRecipe.name = event.target.value;
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

    clearForm() {
        this.setState({ name: '', servings: '', prepTime: '', cookTime: '' });
    }
    

    addRecipe() {
        const ingredients = {};
        this.state.ingredientSections.forEach((list, name) => {
            ingredients[name] = [];
            list.forEach((item) => {
                if (item) ingredients[name].push(item);
            });
        });

        const method = {};
        this.state.methodSections.forEach((list, name) => {
            method[name] = [];
            list.forEach((item) => {
                if (item) method[name].push(item);
            });
        });

        const recipe = {
            name: '',
            serves: this.state.servings,
            prep_time: this.state.prepTime,
            cook_time: this.state.cookTime,
            oven_temp: '',
            ingredients,
            method,
        };

        this.props.addRecipe(recipe);
    }

    updateIngredients(index, items) {
        const sections = this.state.ingredientSections.set('main', items);
        this.setState({ ingredientSections: sections });
    }

    updateMethod(index, items) {
        const sections = this.state.methodSections.set('main', items);
        this.setState({ methodSections: sections });
    }

    render() {
        return (
            <Draggable handle=".modal-header">
                <Modal.Dialog
                    className="addRecipeModal"
                >
                    <Modal.Header>
                        <Modal.Title> Add Recipe </Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <form>
                            
                            <Panel className="pastel-red">
                                <FormGroup
                                    className="flexCols 
                                               verticallyCentered"
                                >
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl
                                        className="long-input autofocus"
                                        id="recipe-modal-name"
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
                                        autoFocus
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
                                                     recipe take to 
                                                     prep?"
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
                                    this.state
                                        .ingredientSections.valueSeq().map(
                                        (section, index) => (
                                            <Section
                                                className="section"
                                                key={`is_${index}`}
                                                type="Ingredients"
                                                name={section.name}
                                                updateRecipe={
                                                    this.updateIngredients}
                                            />
                                        ))
                                }
                
                                <FormGroup className="form-inline">
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
                                    this.state.methodSections.valueSeq().map(
                                        (section, index) => (
                                            <Section
                                                className="section"
                                                key={`ms_${index}`}
                                                type="Method"
                                                name={section.name}
                                                updateRecipe={this.updateMethod}
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
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={this.props.close}>
                            Close
                        </Button>
                        <Button onClick={this.addRecipe}>
                            Add Recipe
                        </Button>
                        <Button onClick={this.clearForm}>
                            Clear Form
                        </Button>
                        
                    </Modal.Footer>
                    
                </Modal.Dialog>
            </Draggable>
        );
    }
}

export default RecipeModal;
