import React from 'react';
import autosize from 'autosize';

import { FormControl } from 'react-bootstrap';

class Row extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        };
        
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const type = this.props.type;
        const index = this.props.index;
        autosize(document.querySelector(`#section-row-${type}-${index}`));
    }
    
    onChange(event) {
        const type = this.props.type;
        const index = this.props.index;
        this.props.changeActive(index, this.state.value);
        this.setState({ value: event.target.value });
        autosize(document.querySelector(`#section-row-${type}-${index}`));
    } 
    
    render() {
        return (
            <div className="flexRow">
                <FormControl
                    className="section-row"
                    id={`section-row-${this.props.type}-${this.props.index}`}
                    disabled={this.props.lastIndex - 1 === this.props.index}
                    key={this.props.index}
                    componentClass="textarea"
                    placeholder={`Enter ${this.props.type}`}
                    value={this.state.value}
                    onChange={this.onChange}
                    rows="1"
                />

                <button
                    type="button"
                    className="btn btn-default delete-element"
                    aria-label="Delete Element"
                    tabIndex="-1"
                >
                    <span
                        className="glyphicon glyphicon-minus"
                        aria-hidden="true"
                    />
                </button>
            </div>
        );
    }
    
}

export default Row;
