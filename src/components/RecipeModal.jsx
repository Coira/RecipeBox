import React from 'react';
import { List, fromJS } from 'immutable';
import { Button, FormGroup, Panel, Modal, 
         FormControl, ControlLabel } from 'react-bootstrap';
import Draggable from 'react-draggable';
import Section from './ModalComponents/Section';

const imgPath = '/imgs/';
const imgList = [['bread.jpeg', 'bread'],
                 ['breakfast.jpg', 'croissants'],
                 ['burger-chips.jpeg', 'burger and chips'],
                 ['cake.jpeg', 'cake'],
                 ['chicken.jpeg', 'chicken legs'],
                 ['coffee.jpeg', 'coffee and coffee beans'],
                 ['crayfish.jpeg', 'crayfish'],
                 ['cream-slice.jpeg', 'cream slice'],
                 ['default.jpg', 'hot pan on the stove'],
                 ['eggs.jpg', 'eggs'],
                 ['fruit.jpeg', 'fruit'],
                 ['hot-drink.jpeg', 'hot drink'],
                 ['meat-dish.jpg', 'meat dish'],
                 ['noodles.jpg', 'noodles'],
                 ['pasta.jpg', 'pasta'],
                 ['pizza.jpg', 'pizza'],
                 ['red-meat.jpeg', 'red meat'],
                 ['soup.jpg', '3 soup dishes'],
                 ['spaghetti.jpeg', 'uncooked spaghetti'],
                 ['tomatoes-oil.jpeg', 'tomatoes and oil'],
                 ['wine.jpeg', 'glass of red and white wine']];

class RecipeModal extends React.Component {
    
    constructor(props) {
        super(props);
        // there may be multiple parts (i.e. sections) to a recipe's
        // ingredients/method, so each section keeps track of its own elements
        this.state = {
            name: '',
            img: `${imgPath}default.jpg`,           
            servings: '',
            cookTime: '',
            prepTime: '',
            ingSectionName: '',
            methodSectionName: '', 
            ingredientSections: fromJS({ 'Main Ingredients': [''] }),
            methodSections: fromJS({ 'Main Method': [''] }),
        };

        this.editName = this.editName.bind(this);
        this.editServings = this.editServings.bind(this);
        this.editCookTime = this.editCookTime.bind(this);
        this.editPrepTime = this.editPrepTime.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.undoChanges = this.undoChanges.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.updateIngredients = this.updateIngredients.bind(this);
        this.updateMethod = this.updateMethod.bind(this);
        this.addIngredientSection = this.addSection.bind(this, 'ingredients');
        this.addMethodSection = this.addSection.bind(this, 'method');
        this.editMethodSectionName = this.editMethodSectionName.bind(this);
        this.editIngredientSectionName =
            this.editIngredientSectionName.bind(this);
        this.editImgUrl = this.editImgUrl.bind(this);
        this.chooseImage = this.chooseImage.bind(this);
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
                            img: wipRecipe.img,
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
                        img: `${imgPath}default.jpg`,
                        ingSectionName: '',
                        methodSectionName: '',
                        ingredientSections: fromJS({ 'Main Ingredients': ['']}),
                        methodSections: fromJS({ 'Main Method': ['']}),
        });
    }

    // reverts changes made when editing a recipe
    undoChanges() {
        const wipRecipe = this.props.wipRecipe;
        const {
            name = '', serves = '', cook_time = '', prep_time = '',
        } = wipRecipe;

        const ingredients = wipRecipe.ingredientSections || { 'Main Ingredients': [''] };
        const method = wipRecipe.methodSections || { 'Main Method': [''] };
        
        this.setState({ name,
                        servings: serves,
                        cookTime: cook_time,
                        prepTime: prep_time,
                        img: wipRecipe.img,
                        ingSectionName: '',
                        methodSectionName: '',
                        ingredientSections: fromJS(ingredients),
                        methodSections: fromJS(method),
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

    editImgUrl(event) {
        this.setState({ img: event.target.value });
    }

    // add an ingredient or method section
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
        
        const sections = sectionContainer.set(name, new List(['']));

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

    // add recipe to storage
    addRecipe() {
        // ingredients sections
        const ingredients = {};
        this.state.ingredientSections.forEach((list, name) => {
            ingredients[name] = [];
            list.forEach((item) => {
                if (item) ingredients[name].push(item);
            });
        });

        // method sections
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
            img: this.state.img,
            oven_temp: '',
            ingredientSections: ingredients,
            methodSections: method,
        };

        this.props.addRecipe(recipe);
        this.clearForm();
    }

    // save changes made to an edited recipe
    updateRecipe() {
        const oldRecipeKey = this.props.wipRecipe.url;
        this.props.deleteFtn(oldRecipeKey);
        this.addRecipe();
    }
    
    updateIngredients(name, items) {
        const sections = this.state.ingredientSections.set(name, items);
        this.setState({ ingredientSections: sections });
    }

    updateMethod(name, items) {
        const sections = this.state.methodSections.set(name, items);
        this.setState({ methodSections: sections });
    }

    // attached to the images section -- user choose an image to
    // represent the recipe
    chooseImage(index) {
        this.setState({ img: imgPath + imgList[index][0] });
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
                                    className="verticallyCentered"
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

                            <Panel className="pastel-red flexCol">
                                <FormGroup>
                                    <ControlLabel>Image</ControlLabel>
                                    <div>
                                        <img
                                            src={this.state.img}
                                            alt="food_pic"
                                            width="150"
                                            height="100"
                                        />
                                    </div>

                                    <div className="spaced">
                                        <div> If you have an image of your
                                            recipe, paste its url here.
                                        </div>
                                        <FormControl
                                            className="long-input"
                                            value={this.state.img}
                                            type="text"
                                            onChange={this.editImgUrl}
                                            placeholder="Link to image"
                                        />
                                    </div>
                                    
                                    <div className="spaced"> 
                                        <div> If you don't have an image, but
                                            would like to use one of my
                                            defaults, you can choose one here.
                                        </div>
                                        <button onClick={this.viewImages}>
                                            Choose an image
                                        </button>
                                        <div>
                                            {
                                                imgList.map(([imgName, altText], index) => (
                                                    <img
                                                        className="imgList"
                                                        src={imgPath + imgName}
                                                        alt={altText}
                                                        width="80"
                                                        height="80"
                                                        key={`img-${imgName}`}
                                                        onClick={() => this.chooseImage(index)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
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
                        {
                            this.props.editing ?
                            
                                <div>
                                    <Button onClick={this.props.close}>
                                        Close
                                    </Button>
                                    <Button onClick={this.updateRecipe}>
                                        Update Recipe
                                    </Button>
                                    <Button onClick={this.undoChanges}>
                                        Undo Changes
                                    </Button>
                                </div>
                            
                            :
                            
                                <div>
                                    <Button onClick={this.props.close}>
                                        Close
                                    </Button>
                                    <Button onClick={this.addRecipe}>
                                        Add Recipe
                                    </Button>
                                    <Button onClick={this.clearForm}>
                                        Clear Form
                                    </Button>
                                </div>
                        }
                        
                    </Modal.Footer>
                    
                </Modal.Dialog>
            </Draggable>
        );
    }
}

RecipeModal.propTypes = {
    editing: React.PropTypes.bool,
    wipRecipe: React.PropTypes.object,
    addRecipe: React.PropTypes.func,
    deleteFtn: React.PropTypes.func,
}; 
export default RecipeModal;
