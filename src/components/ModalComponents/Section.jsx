import React from 'react';
import { List } from 'immutable';
import { Button, FormGroup, Col,
         FormControl, ControlLabel } from 'react-bootstrap';
import Row from './Row';

class Section extends React.Component {  
    constructor(props) {
        super(props);

        /*
        this.state = {
            items: new List(),   // elements in this section (e.g. "flour", "butter")
            count: 2,    // how many elements does this section contain
            active: '',  // which row is the user typing into
            editValue: '', // the value of the row the user is currently editing
        };
         */
        this.state = {
            count: 2,
        };
        
        this.editValue = '';
        this.items = new List();
        this.active = -1;
        this.changeActive = this.changeActive.bind(this);
    }

    createTable() {
        const rows = [];
        for (let i = 0; i < this.state.count; i++) {
            rows.push(
                <Row
                    key={i}
                    index={i}
                    lastIndex={this.state.count}
                    changeActive={this.changeActive}
                    type={this.props.type}
                />
            );
        }
        
        return (<div className="section-table flexCol">{rows}</div>);
    }

    changeActive(index, value) {
        if (this.active !== index) {
            // add the previous user input into this section's elements array
            this.items = this.items.set(this.active, this.editValue);
            this.active = index;

            // change the active row, and if it's a new element, increment count
            if (this.active >= this.state.count - 2) {
                this.setState({ count: this.state.count + 1 });
            }
        }

        // keep the current user input value up-to-date
        this.editValue = value;
    }
    

    render() {
        return (
            <FormGroup>
                <ControlLabel>Main {this.props.type}</ControlLabel>
                {this.createTable()}
            </FormGroup>
        );
    }
}

export default Section;

