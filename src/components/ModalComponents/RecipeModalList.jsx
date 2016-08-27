import React from 'react';
import { Button, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';
import ListRow from './ListRow';
import { List } from 'immutable';

class RecipeModalList extends React.Component {  
    constructor(props) {
        super(props);

        // TODO use immutable
        this.state = {
            items: new List(),
            count: 2,
            active: '',
        };

        this.changeActive = this.changeActive.bind(this);
    }

    createTable() {
        const rows = [];
        for (let i = 0; i < this.state.count; i++) {
            rows.push(
                <ListRow
                    key={i}
                    index={i}
                    lastIndex={this.state.count}
                    changeActive={this.changeActive}
                />
            );
        }
        return (<table><tbody>{rows}</tbody></table>);
    }

    changeActive(index, value) {
        if (this.state.active !== index) {
            const items = this.state.items.set(this.state.active, value);
            this.setState({ items });
            this.setState({ active: index });
            this.setState({ count: this.state.count + 1 });
        }
        
    }
    
    //updateEdit(index) {
    //    console.log(index);
    // }

    
    

    render() {
        return (
            <FormGroup>
                <ControlLabel>Main {this.props.section}</ControlLabel>
                {this.createTable()}
            </FormGroup>
        );
    }
}

export default RecipeModalList;

