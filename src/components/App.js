import React from 'react';
import Titlebar from './TitleBar';
//import RecipeLinkContainer from './RecipeLinkContainer';
import Footer from './Footer';


class App extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    recipes: [],
	    fixHeader: false
	}
    }

    componentDidMount() {

	//TODO replace this with local storage
	$.getJSON("/data/recipes.json", (data) => {
	    this.setState({recipes: data.recipes});
	});
	
	window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount() {
	window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    handleScroll() {
	this.setState({fixHeader: window.pageYOffset > 59});
    }
    
    render() {
	
	var children = React.Children.map(this.props.children, function(child) {
	    return React.cloneElement(child, {
		recipes: this.state.recipes
	    })
	}.bind(this))
	    

	return  (
	    <div>
		<Titlebar fixHeader={this.state.fixHeader}/>
		{children}
	    </div>
	);
    }
}

export default App;

	
