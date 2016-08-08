import React from 'react';
import Titlebar from './TitleBar';
import Footer from './Footer';

// TODO check url is unique
// creates a url from a recipe name
function urlise(name) {
    return name.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").join("_");
}


class App extends React.Component {
    constructor(props) {
	super(props);

	this.actions = this.props.actions;	
    }

    componentDidMount() {

	//TODO replace this with local storage
	$.getJSON("/data/recipes.json", (data) => {
	    data.recipes.map((recipe) => {
		recipe.url = urlise(recipe.name);
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
    
    render() {

	return  (
	    <div>
		<Titlebar fixHeader={this.props.fixHeader}
			  setShowRecipeModal={this.actions.setShowRecipeModal}
			  showRecipeModal={this.props.showRecipeModal}/>
		{this.props.children}
		<Footer />
	    </div>
	);
	
    }
}

export default App;


