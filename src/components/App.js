import React from 'react';
import Titlebar from './TitleBar';
import Sidebar from './Sidebar';
import RecipesContainer from './RecipesContainer';

class App extends React.Component {
    constructor(props) {
	super(props);
    }

    render() {
	return (
	    <div>
		<Titlebar/>
		<div className="row">
		    <Sidebar/>
		    <RecipesContainer/>
		</div>
	    </div>
	);
    }
}

export default App;

	
