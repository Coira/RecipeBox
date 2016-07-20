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
	//console.log(window.pageYOffset);
	this.setState({fixHeader: window.pageYOffset > 59});
    }
    
	    
    render() {
	return (
	    <div id="titleBar" className="container">
		<div className="row">
		    <div className="title">Recipe Box</div>
		</div>
		<div className={classnames({"fixedHeader": this.state.fixHeader},
					   {"container": this.state.fixHeader},
					   {"row": !this.state.fixHeader},
					   "test")}>
		    <div className={classnames({"row": this.state.fixHeader})}>
			<div className="col-md-1 link">Home</div>
			<div className="col-md-1 link">Add Recipe</div>
		    </div>
		</div>

	    </div>
	)
    }
}

    
    export default TitleBar;


