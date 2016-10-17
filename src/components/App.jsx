import React from 'react';
import Titlebar from './TitleBar';
import RecipeModal from './RecipeModal';
import Footer from './Footer';

const imgPath = '/imgs/';

class App extends React.Component {
    constructor(props) {
        super(props);

        //this.showRecipeModal = this.showRecipeModal.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.close = this.close.bind(this);

        this.actions = this.props.actions;
        this.urls = [];
        this.imgs = [];
        
    } 

    
    componentDidMount() {
        $('.modal').hide();
        
        // no recipes saved, load from json file
        if (typeof (localStorage) === 'undefined' ||
            localStorage.length === 0) {
            $.getJSON('data/recipes.json', (data) => {
                const urlisedRecipes = [];
                
                data.recipes.forEach((recipe, index) => {
                    const nextRecipe = recipe;
                    nextRecipe.url = this.urlise(recipe.name);
                    nextRecipe.id = index;
                    nextRecipe.img = imgPath + recipe.img;
                    
                    urlisedRecipes.push(nextRecipe);
                    this.actions.addRecipe(nextRecipe);
                });
                localStorage.setItem('recipes', JSON.stringify(urlisedRecipes));
            });
        }
        else {
            // get recipes from local storage, add them to state
            const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
            console.log(storedRecipes);
            storedRecipes.forEach((recipe) => {
                this.actions.addRecipe(recipe);
            });
        }
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    // user clicks on 'Add' in recipe modal -- add new recipe to state
    addRecipe(recipe) {
        const newRecipe = recipe;
        newRecipe.url = this.urlise(recipe.name);
        this.actions.addRecipe(newRecipe);
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
        $('.modal').hide();
    }

    render() {
        return (
            <div>
                <Titlebar
                    fixHeader={this.props.fixHeader}
                    onAdd={this.actions.newRecipe}
                />
                    
                <RecipeModal
                    className="modal"
                    addRecipe={this.addRecipe}
                    removeRecipe={this.removeRecipe}
                    close={this.close}
                    enforceFocus={false}
                    editing={this.props.editing}
                    wipRecipe={this.props.wipRecipe}
                    deleteFtn={this.actions.deleteRecipe}
                /> 
                
                {this.props.children}
                
                <Footer />
            </div>
        );
    }
}

export default App;
