function Container() {
  return(
    <div>
      <h2>Simple Form</h2>
      <Form />
      <h2>Controlled Form</h2>
      <ControlledForm />
    </div>
  );
}

class Form extends React.Component {
  constructor() {
    super();
  }
  handleClick = () => {
    console.log(this.input.value);
  }
  render() {
    return(
      <div>
        <input type="text" ref={input => this.input = input}/>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    );
  }
}

class ControlledForm extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    }
  }
  handleInputChange = (event) => {
    console.log(event.target.value);
    this.setState({text: event.target.value});
  }
  render() {
    return(
      <input
        type="text"
        value={this.state.text}
        onChange={this.handleInputChange}
      />
    );
  }
}



ReactDOM.render(<Container />, document.getElementById("application"));
