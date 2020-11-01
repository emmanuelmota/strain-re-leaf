import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import List from './components/List.jsx';

const axios = require('axios').default;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // console.log('Hi!');
    axios.get('/items')
      .then((response) => {
        console.log(response.data);
        this.setState({
          items: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        <h1>Item List</h1>
        <List items={items} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
