import React from 'react';
import classnames from 'classnames';
import autosize from 'autosize';

import { Button, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';

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
        this.setState({ value: event.target.value });
        this.props.changeActive(this.props.index, this.props.value);
        autosize(document.querySelector(`#section-row-${type}-${index}`));
    } 
    
    render() {
        return (
            <FormGroup className="form-inline">
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

            <button className="btn btn-default">-</button>
            </FormGroup>
        );
    }
    
}

export default Row;
