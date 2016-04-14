import React from 'react';
import Titlebar from './TitleBar';
import Sidebar from './Sidebar';
import RecipesContainer from './RecipesContainer';


class App extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    tags: [],
	    recipes: []
	}
    }

    componentDidMount() {
	
	//TODO replace this with local storage
	$.getJSON("/data/recipes.json", (data) => {
	    this.setState({tags: data.tags});
	    this.setState({recipes: data.recipes});

	});
    }
    
    render() {

	return (
	    <div>
		<Titlebar/>
		<div className="row">
		    <Sidebar tags={this.state.tags}/>
		    <RecipesContainer recipes={this.state.recipes}/>
		</div>
	    </div>
	);
    }
}

export default App;

	
