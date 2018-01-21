class ListState {
    lists = [];
    newListName = '';

    addList(list) {
        this.lists = [...this.lists, list];
    }

    updateState() {
        return {
            lists: this.lists,
            newListName: this.newListName
        }
    }
}

export default ListState;