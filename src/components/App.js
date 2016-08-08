import React from 'react';
import Titlebar from './TitleBar';
import Footer from './Footer';




class App extends React.Component {
    constructor(props) {
	super(props);

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

	let offset = 1;
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


