import React from 'react';
import classnames from 'classnames';

class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.onHome = this.onHome.bind(this);
    }

    onHome() {
        console.log('Go Home');
        return (<div> Hello! </div>);
    }
    
    
    render() {
        return (
            <div>
                <div id="titleBar" className="flexCol">!
                    <div className="title">Recipe Box</div>
                    
                    <div
                        className={classnames({ fixedHeader: this.props.fixHeader },
                                              'titleLinks')}
                    >
                        <div className="link" onClick={this.onHome}>Home</div>
                        <div
                            className="link"
                            onClick={this.props.onAdd}
                        >
                            Add Recipe
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}


export default TitleBar;
