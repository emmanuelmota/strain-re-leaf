import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import Decide from './components/Decide.jsx';
import styled from 'styled-components';

const axios = require('axios').default;

const Master = styled.div`
  width: 50%;
  margin: auto;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      decideShow: true,
    };
    this.getAll = this.getAll.bind(this);
  }

  componentDidMount() {
    // console.log('Hi!');
    this.getAll();
  }

  getAll() {
    axios.get('/items')
      .then((response) => {
        //console.log(response.data);
        this.setState({
          items: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { items, decideShow } = this.state;
    const decide = decideShow ? (
      <Decide/>
    )
      : <div />;
    return (
      <Master id="Master">
        <div id="Modal">{decide}</div>
      </Master>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
