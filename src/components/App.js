import React from 'react';
import Titlebar from './TitleBar';
import RecipeModal from './RecipeModal';
import Footer from './Footer';


class App extends React.Component {
    constructor(props) {
	super(props);

	this.onAdd = this.onAdd.bind(this);
	this.addRecipe = this.addRecipe.bind(this);
	this.close = this.close.bind(this);
	
	this.actions = this.props.actions;
	this.urls = [];
    }

    componentDidMount() {
	//TODO replace this with local storage
	$.getJSON("/data/recipes.json", (data) => {
	    data.recipes.map((recipe) => {
		recipe.url = this.urlise(recipe.name);
		this.actions.addRecipe(recipe);
	    })
	});
	
	window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount() {
	window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    handleScroll() {
	this.actions.fixHeader(window.pageYOffset > 59);
    }

    // creates a unique url from a recipe name
    urlise(name) {
	const urlFromName = name.replace(/[^a-zA-Z0-9 ]/g, "")
				.split(" ").join("_");

	let offset = 2;
	let url = urlFromName;

	// if the url already exists, add a number to the end of it
	// to make it unique
	while (this.urls.includes(url)) {
	    url = urlFromName + "_" + offset;
	    offset++;
	}
	
	this.urls.push(url);
	return url;
    }

    
    // display recipe modal
    addRecipe() {
	this.actions.setShowRecipeModal(false);
    }

    // user clicks on 'add recipe' in recipe modal
    onAdd() {
	console.log("onAdd");
	this.actions.setShowRecipeModal(true);
    }


    // close modal -- cancel and delete recipe input?
    close() {
	this.actions.setShowRecipeModal(false);
    }
    
	    
    render() {

	return  (
	    <div>
		<Titlebar fixHeader={this.props.fixHeader}
			  onAdd={this.onAdd}/>
		<RecipeModal showRecipeModal={this.props.showRecipeModal}
			     addRecipe={this.addRecipe}
			     close={this.close}/>
		{this.props.children}
		<Footer />
	    </div>
	);
	
    }
}

export default App;


