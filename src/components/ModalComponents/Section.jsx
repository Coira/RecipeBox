import React from 'react';
import { List } from 'immutable';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import Row from './Row';

class Section extends React.Component {  
    constructor(props) {
        super(props);

        const rows = props.rows && props.rows.count() > 0 
                   ? props.rows
                   : new List(['']);
                     
        this.state = { rows };
        this.editValue = '';
        this.active = 0;
        this.addItem = this.addItem.bind(this);
        this.updateExtraRows = this.updateExtraRows.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.editing && nextProps.rows &&
            nextProps.rows !== this.props.rows) {
            // fill modal with recipe that the user is editing
            this.setState({ rows: nextProps.rows.push('') });
        }
        else if (!nextProps.editing && this.props.editing) {
            // user creating a new recipe -- clear form
            this.clearForm();
        }
    }

    clearForm() {
        this.setState({ rows: new List(['']) });
    }
    
    // add a Row's value to our array
    addItem(index, value) {
        if (this.state.rows.get(index) !== value) {
            const rows = this.state.rows.set(index, value);
            this.setState({ rows }, () => {
                // remove any blank Rows, add Section to recipe
                const cleaned = this.state.rows.filter(v => v);
                this.props.updateRecipe(this.props.name, cleaned);
            });
        }
    }

    // if user has used a new Row, open up another Row for them
    updateExtraRows(index, value) {
        if (index === this.state.rows.count() - 1 && value) {
            const rows = this.state.rows.set(index, value);
            this.setState({ rows: rows.push('') });
        }
    }
    
    render() {
        return (
            <FormGroup onBlur={this.onBlur}>
                <ControlLabel>{this.props.name}</ControlLabel>
                
                <div className="section-table flexCol">
                    {
                        this.state.rows.map((v, i) => (
                            <Row
                                key={`${this.props.uniqueId}-row-${i}`}
                                uniqueId={`${this.props.uniqueId}-row-${i}`}
                                index={i}
                                type={this.props.type}
                                addItem={this.addItem}
                                updateExtraRows={this.updateExtraRows}
                                value={v}
                            />
                        ))
                    }
                </div>
   
            </FormGroup>
            
        );
    }
}

export default Section;

