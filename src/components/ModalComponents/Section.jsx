import React from 'react';
import { List } from 'immutable';
import { Button, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';
import Row from './Row';

class Section extends React.Component {  
    constructor(props) {
        super(props);

        // TODO use immutable
        this.state = {
            items: new List(),   // elements in this section (e.g. "flour", "butter")
            count: 2,    // how many elements does this section contain
            active: '',  // which row is the user typing into
        };

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
        if (this.state.active !== index) {
            const items = this.state.items.set(this.state.active, value);
            this.setState({ items });
            this.setState({ active: index });
            this.setState({ count: this.state.count + 1 });
        }
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

