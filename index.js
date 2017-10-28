function TodoList({todos}) {
  console.log(todos);
  return(
      <ul>
        {todos.map(todo => <li>{todo.text}</li>)}
      </ul>
  );
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const newTodo  = this.input.value.trim();
    if (newTodo.length === 0) return;
    this.props.addTodo(newTodo);
    this.input.value = "";
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={input => this.input = input} />
      </form>
    );
  }
}


class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this._number = 0;
        this.state = {
            todos: [
                {id: this._number++, text: "Read React"},
                {id: this._number++, text: "Read Redux"},
                {id: this._number++, text: "Read ES6"}
            ]
        }
        this.addTodo = this.addTodo.bind(this);
    }
    addTodo(text) {
      this.setState({
        todos: this.state.todos.concat({id: this._number++, text: text})
      })
    }
    render() {
        const {todos} = this.state;
        return (
            <div>
                <h1>hello world</h1>
                <TodoList todos={todos}/>
                <TodoForm addTodo={this.addTodo}/>
            </div>
        );
    }
}

ReactDOM.render( <AppComponent />, document.getElementById("application"));
