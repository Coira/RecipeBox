import React from 'react';
import { List } from 'immutable';
import { Button, FormGroup, Col,
         FormControl, ControlLabel } from 'react-bootstrap';
import Row from './Row';

class Section extends React.Component {  
    constructor(props) {
        super(props);

        this.state = {
            count: 2,
        };
        
        this.editValue = '';
        this.items = new List();
        this.active = 0;
        this.addItem = this.addItem.bind(this);
        this.switchRow = this.switchRow.bind(this);
        //this.updateRecipe = this.updateRecipe.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onBlur() {
        this.props.updateRecipe(this.props.index, this.items);
    }

    /*
    updateParent() {
        console.log(`${this.props.type} update parent`);
        this.props.updateRecipe(this.props.name, this.items);
    }
    */
    
    createTable() {
        const rows = [];
        for (let i = 0; i < this.state.count; i++) {
            rows.push(
                <Row
                    key={i}
                    index={i}
                    lastIndex={this.state.count}
                    type={this.props.type}
                    addItem={this.addItem}
                    switchRow={this.switchRow}
                    value="test value"
                />
            );
        }
        
        return (<div className="section-table flexCol">{rows}</div>);
    }

    // add a Row's value to our array
    addItem(index, value) {
        this.items = this.items.set(index, value);
    }

    // if user has used a new Row, open up another Row for them
    switchRow(index) {
        if (this.state.count === 2 ||
            (index >= this.state.count - 2 &&
             this.items.get(this.state.count - 3))) {
            this.setState({ count: this.state.count + 1 });
        }
    }
    
    render() {
        return (
            <FormGroup onBlur={this.onBlur}>
                <ControlLabel>Main {this.props.type}</ControlLabel>
                {this.createTable()}
            </FormGroup>
        );
    }
}

export default Section;

