import React from 'react';
import Titlebar from './TitleBar';
import RecipeLinkContainer from './RecipeLinkContainer';


class App extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    recipes: []
	}
    }

    componentDidMount() {
	
	//TODO replace this with local storage
	$.getJSON("/data/recipes.json", (data) => {
	    this.setState({recipes: data.recipes});

	});
    }
    
    render() {

	return (
	    <div>
		<Titlebar/>
		<RecipeLinkContainer recipes={this.state.recipes}/>
	    </div>
	);
    }
}

export default App;

	
