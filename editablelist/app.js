class ItemForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.input.value.length === 0)
      return;
    this.props.addItem(this.input.value);
    this.input.value = "";
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={input => this.input = input}/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.count = 1;
    this.state = {
      items: [
        {id: this.count++, text: 'Item 1'},
        {id: this.count++, text: 'Item 2'},
        {id: this.count++, text: 'Item 3'}
      ]
    }
  }
  addItem = (text) => {
    this.setState({items: this.state.items.concat({id: this.count++, text: text})});
  }
  deleteItem = id => {
    this.setState({items: this.state.items.filter(item => item.id !== id)})
  }
  updateItem = (id, text) => {
    this.setState({
      items: this.state.items.map(function(item) {
        return (item.id !== id) ? item : {id: item.id, text: text};
      })
    })
  }
  render() {
    const {items} = this.state;
    return (
      <div>
        <h2>Editable List</h2>
        <ItemList
          items={items}
          deleteItem={this.deleteItem}
          updateItem={this.updateItem}
          />
        <ItemForm addItem={this.addItem}/>
      </div>
    );
  }
}

function ItemList(props) {
  const {items, deleteItem, updateItem} = props;
  return(
    <ul>
      {items.map(item =>
          <EditableItem
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        )}
    </ul>
  );
}

class EditableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    }
    this.enableEdit = this.enableEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  enableEdit() {
    this.setState({edit: true});
  }
  handleChange(event) {
    this.props.updateItem(this.props.item.id, event.target.value);
  }
  closeEdit() {
    this.setState({edit: false});
  }
  render() {
    const {item, deleteItem} = this.props;
    if (this.state.edit){
      return(
        <li key={item.id}>
          <input
            type="text"
            value={item.text}
            onChange={this.handleChange}
          />
          <SaveButton onClick={this.closeEdit}/>
        </li>
      );
    }
    else {
      return(
        <li key={item.id}>
          <label>{item.text}</label>
          <EditButton onClick={this.enableEdit}/>
          <button onClick={() => deleteItem(item.id)}>x</button>
        </li>
      );
    }
  }
}


function EditButton(props) {
  return(
    <button onClick={props.onClick}>
      Edit
    </button>
  );
}

function SaveButton(props) {
  return(
    <button onClick={props.onClick}>
      Save
    </button>
  );
}


ReactDOM.render(
  <App/>, document.getElementById("application"));
