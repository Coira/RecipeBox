import React from 'react';
import autosize from 'autosize';
import { FormControl } from 'react-bootstrap';

class Row extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        };
        
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.selector = null; 
    }

    componentDidMount() {
        autosize(document.getElementById(this.props.uniqueId));
    }

    
    componentWillReceiveProps(props) {
        this.setState({ value: props.value }, () => {
            autosize.update(document.getElementById(this.props.uniqueId));
        });
    }
    
    onChange(event) {
        // if this Row has gone from being empty to having a value, let parent know
        if (this.state.value === '' && event.target.value) {
            this.props.updateExtraRows(this.props.index, event.target.value);
        }
        
        this.setState({ value: event.target.value });
    } 

    // when Row loses focus, pass its value on to parent for storage
    onBlur() {
        this.props.addItem(this.props.index, this.state.value);
    }

    render() {
        return (
            <div className="flexRow">
                <FormControl
                    className="section-row"
                    id={this.props.uniqueId}
                    componentClass="textarea"
                    placeholder={`Enter ${this.props.type}`}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    rows="1"
                   
                />
            </div>
        );
    }
    
}

export default Row;
