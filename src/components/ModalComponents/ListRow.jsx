import React from 'react';
import classnames from 'classnames';

import { Button, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';

class ListRow extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({ value: event.target.value });
        this.props.changeActive(this.props.index, this.props.value);
        console.log(this.props.lastIndex, this.props.index);
    } 
        
    render() {
        return (
            <tr><td>
                <FormControl
                    disabled={this.props.lastIndex - 1 === this.props.index}
                    key={this.props.index}
                    type="text"
                    placeholder={`Enter stuff ${this.props.index}`}
                    value={this.state.value}
                    onChange={this.onChange}
                />
            </td></tr>
        );
    }
    
}

export default ListRow;
