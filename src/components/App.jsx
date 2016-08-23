import React from 'react';
import Titlebar from './TitleBar';
import RecipeModal from './RecipeModal';
import Footer from './Footer';
import Draggable from 'react-draggable';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.close = this.close.bind(this);

        this.actions = this.props.actions;
        this.urls = [];
        
        this.testVar = '';
        this.testUnvar = 3;
        this.tins = {};
    } 

    
    componentDidMount() {
        // no recipes saved, load from json file
        if (typeof (localStorage) === 'undefined' || localStorage.length === 0) {
            $.getJSON('data/recipes.json', (data) => {
                const urlisedRecipes = [];
                
                data.recipes.forEach((recipe) => {
                    const nextRecipe = recipe;
                    nextRecipe.url = this.urlise(recipe.name);
                    urlisedRecipes.push(nextRecipe);
                    this.actions.addRecipe(nextRecipe);
                });
                localStorage.setItem('recipes', JSON.stringify(urlisedRecipes));
            });
        }
        else {
            // get recipes from local storage, add them to state
            const addedRecipes = JSON.parse(localStorage.getItem('recipes'));
            
            addedRecipes.forEach((recipe) => {
                this.actions.addRecipe(recipe);
            });
        } 
        
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    // user clicks on 'add recipe' in recipe modal
    onAdd() {
        console.log('onAdd');
        this.actions.setShowRecipeModal(true);
    }
    
    // display recipe modal
    addRecipe() {
        this.actions.setShowRecipeModal(false);
    }
    // creates a unique url from a recipe name
    urlise(name) {
        const urlFromName = name.replace(/[^a-zA-Z0-9 ]/g, '')
                                .split(' ').join('_');

        let offset = 2;
        let url = urlFromName;

        // if the url already exists, add a number to the end of it
        // to make it unique
        while (this.urls.includes(url)) {
            url = `${urlFromName}_${offset}`;
            offset++;
        }
        
        this.urls.push(url);
        return url;
    }
    
    handleScroll() {
        this.actions.fixHeader(window.pageYOffset > 59);
    }

    // close modal -- cancel and delete recipe input?
    close() {
        this.actions.setShowRecipeModal(false);  
    }
    
    
    render() {
        return (
            <div>
                <Titlebar
                    fixHeader={this.props.fixHeader}
                    onAdd={this.onAdd}
                />
                
                {
                    this.props.showRecipeModal === true ?
                        <RecipeModal
                            addRecipe={this.addRecipe}
                            close={this.close}
                        /> :
                    null
                }
                
                {this.props.children}
                
                <Footer />
            </div>
        );
    }
}

export default App;
