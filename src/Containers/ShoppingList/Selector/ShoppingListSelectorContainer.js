import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as listSelectors from '../../../Store/Lists/listSelectors';
import * as listActions from '../../../Store/Lists/listActions';
import ListModel from '../../../Store/Lists/listModel';
import AddItem from '../../../Components/Ui/AddItem/AddItem';
import NamedListSelector from '../../../Components/Ui/NamedListSelector/NamedListSelector';
import Notification from '../../../Components/Ui/Notification/Notification';

class ShoppingListContainer extends Component {



    state = {
        newName: '',
    };

    componentDidMount() {
        this.props.startFetchLists();
        this.props.fetchLists();
    }

    onClickAddNewList = () => {

        const list = new ListModel({
            name:this.state.newName
        });

        this.props.onAddList(list)
    };

    updateNewListName = (e) => {
        let newName = '';

        if (e.target && e.target.value) {
            newName = e.target.value;

        }

        this.setState({...this.state, newName});
    };

    setSelectedList = (list) => {
        if (list && list.name) {
            this.props.setSelectedList(list.name);
            this.props.history.push(this.props.match.url + '/' + list.name);
        }
    };

    render() {
        return (
            <div>
                <Notification
                    type="is-danger"
                    message={this.props.ui.errorMessage}
                />
                <AddItem
                    isLoading={this.props.ui.isLoading}
                    buttonLabel="anlegen"
                    placeholder="neue Liste"
                    value={this.state.newName}
                    updateValue={this.updateNewListName}
                    triggerOnClick={this.onClickAddNewList}/>
                <NamedListSelector
                    headerLabel="Einkaufsliste"
                    onSelect={this.setSelectedList}
                    items={this.props.lists}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lists: listSelectors.getListsArray(state),
        ui: state.listUi
    };
};

const mapDispatchToProps = dispatch => {
    return {
        startFetchLists: () => dispatch(listActions.startFetchLists()),
        fetchLists: () => dispatch(listActions.fetchLists()),
        onAddList: (list) => dispatch(listActions.startAddList(list)),
        setSelectedList: (listId) => dispatch(listActions.selectList(listId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListContainer);