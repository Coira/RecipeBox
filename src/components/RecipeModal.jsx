import React from 'react';
import { List, fromJS } from 'immutable';
import { Button, FormGroup, Panel, Modal, 
         FormControl, ControlLabel } from 'react-bootstrap';
import Draggable from 'react-draggable';
import Section from './ModalComponents/Section';

class RecipeModal extends React.Component {
    
    constructor(props) {
        super(props);
        // there may be multiple parts (i.e. sections) to a recipe's
        // ingredients/method, so each section keeps track of its own elements
        this.state = {
            name: '',
            servings: '',
            cookTime: '',
            prepTime: '',
            ingSectionName: '',
            methodSectionName: '', 
            ingredientSections: fromJS({ 'Main Ingredients': [] }),
            methodSections: fromJS({ 'Main Method': [] }),
        };

        this.editName = this.editName.bind(this);
        this.editServings = this.editServings.bind(this);
        this.editCookTime = this.editCookTime.bind(this);
        this.editPrepTime = this.editPrepTime.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.updateIngredients = this.updateIngredients.bind(this);
        this.updateMethod = this.updateMethod.bind(this);
        this.addIngredientSection = this.addSection.bind(this, 'ingredients');
        this.addMethodSection = this.addSection.bind(this, 'method');
        this.editMethodSectionName = this.editMethodSectionName.bind(this);
        this.editIngredientSectionName =
            this.editIngredientSectionName.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.editing && nextProps.wipRecipe !== this.props.wipRecipe) {
            // user started editing an existing recipe, fill form with the
            // work-in-progress recipe
            const wipRecipe = nextProps.wipRecipe;
            const {
                name = '', serves = '', cook_time = '', prep_time = '',
            } = wipRecipe;

            const ingredients = wipRecipe.ingredientSections || {};
            const method = wipRecipe.methodSections || {};
            
            this.setState({ name,
                            servings: serves,
                            cookTime: cook_time,
                            prepTime: prep_time,
                            ingSectionName: '',
                            methodSectionName: '',
                            ingredientSections: fromJS(ingredients),
                            methodSections: fromJS(method),
            });
        }
        else if (!nextProps.editing && this.props.editing) {
            // start creating a new recipe, clear the modal
            this.clearForm();
        }
    }

    
    clearForm() {
        this.setState({ name: '',
                        servings: '',
                        cookTime: '',
                        prepTime: '',
                        ingSectionName: '',
                        methodSectionName: '',
                        ingredientSections: fromJS({ 'Main Ingredients': [] }),
                        methodSections: fromJS({ 'Main Method': [] }),
        });
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

    editIngredientSectionName(event) {
        this.setState({ ingSectionName: event.target.value });
    }

    editMethodSectionName(event) {
        this.setState({ methodSectionName: event.target.value });
    }
    

    addSection(type) {
        let sectionContainer = null;
        let name = '';
        
        if (type === 'ingredients') {
            sectionContainer = this.state.ingredientSections;
            name = this.state.ingSectionName;
        }
        else {
            sectionContainer = this.state.methodSections;
            name = this.state.methodSectionName;
        }

        // don't allow unnamed sections
        if (!name) return;
        
        const sections = sectionContainer.set(name, new List());

        if (type === 'ingredients') {
            this.setState({
                ingredientSections: sections,
                ingSectionName: '',
            });
        }
        else {
            this.setState({
                methodSections: sections,
                methodSectionName: '',
            });
        }
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
            name: this.state.name,
            serves: this.state.servings,
            prep_time: this.state.prepTime,
            cook_time: this.state.cookTime,
            oven_temp: '',
            ingredientSections: ingredients,
            methodSections: method,
        };

        this.props.addRecipe(recipe);
    }

    updateIngredients(name, items) {
        const sections = this.state.ingredientSections.set(name, items);
        this.setState({ ingredientSections: sections });
    }

    updateMethod(name, items) {
        const sections = this.state.methodSections.set(name, items);
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
                                        value={this.state.cookTime}
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
                                        .ingredientSections.entrySeq().map(
                                            ([name, value], index) => (
                                                <Section
                                                    className="section"
                                                    key={`is_${index}`}
                                                    uniqueId={`is_${index}`}
                                                    index={index}
                                                    type="Ingredients"
                                                    name={name}
                                                    updateRecipe={this.updateIngredients}
                                                    editing={this.props.editing}
                                                    rows={value}
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
                        value={this.state.ingSectionName}
                        onChange={this.editIngredientSectionName}
                    />
                    
                    <button
                        type="button"
                        className="btn btn-default 
                                   new-form-btn"
                        aria-label="New Section"
                        onClick={this.addIngredientSection}
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
                                    this.state.methodSections.entrySeq().map(
                                        ([name, value], index) => (
                                            <Section
                                                className="section"
                                                key={`ms_${index}`}
                                                uniqueId={`ms_${index}`}
                                                index={index}
                                                type="Method"
                                                name={name}
                                                updateRecipe={this.updateMethod}
                                                editing={this.props.editing}
                                                rows={value}
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
                                        value={this.state.methodSectionName}
                                        onChange={this.editMethodSectionName}
                                    />
                                    
                                    <button
                                        type="button"
                                        className="btn btn-default 
                                                   new-form-btn"
                                        aria-label="New Section"
                                        onClick={this.addMethodSection}
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
