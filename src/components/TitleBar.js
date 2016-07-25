import React from 'react';
import classnames from 'classnames';

class TitleBar extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    fixHeader: false
	}
	
    }

    componentDidMount() {
	window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    componentWillUnmount() {
	window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    handleScroll() {
	this.setState({fixHeader: window.pageYOffset > 59});
    }
    
	    
    render() {
	return (
	    <div id="titleBar" className="flexCol">
		<div className="title">Recipe Box</div>
		
		<div className={classnames({"fixedHeader": this.state.fixHeader},
					   "flexRow")}>
		    <div className="link">Home</div>
		    <div className="link">Add Recipe</div>
		</div>

	    </div>
	)
    }
}

    
    export default TitleBar;


