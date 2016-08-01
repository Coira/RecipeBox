import React from 'react';
import Titlebar from './TitleBar';
import Footer from './Footer';


class App extends React.Component {
    constructor(props) {
	super(props);

	this.actions = this.props.actions;	
    }

    componentDidMount() {

	//TODO replace this with local storage
	$.getJSON("/data/recipes.json", (data) => {
	    data.recipes.map((recipe) => {
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


