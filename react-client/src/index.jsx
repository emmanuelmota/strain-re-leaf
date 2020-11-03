import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import Decide from './components/Decide.jsx';
import styled from 'styled-components';
import Results from './components/Results.jsx';

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
      recommendShow: false,
      options: {
        Pain: false,
        Nausea: false,
        Sleep: false,
        Stress: false,
      },
      Count: 0,
    };
    this.optionSelector = this.optionSelector.bind(this);
    this.getAll = this.getAll.bind(this);
    this.recommendToggle = this.recommendToggle.bind(this);
    this.optionFalse = this.optionFalse.bind(this);
    this.optionTrue = this.optionTrue.bind(this);
  }

  componentDidMount() {
    // console.log('Hi!');
    this.getAll();
  }

  getAll() {
    axios.get('/items')
      .then((response) => {
        // console.log(response.data);
        this.setState({
          items: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  optionSelector(ailment) {
    const { Count, options } = this.state; // Select no more than 3
    let track = false;
    if (Count < 3) {
      if (options[ailment] === false) {
        track = true;
        this.optionFalse(ailment);
      }
    }
    if (options[ailment] === true && track === false) {
      this.optionTrue(ailment);
    }
  }

  optionFalse(ailment) {
    const { Count, options } = this.state;
    // console.log(`${options[ailment]} boolean in false`);
    let prevOption = options;
    let prevCount = Count;
    prevOption[ailment] = !options[ailment];
    // console.log(prevOption[ailment], ' new boolean');
    this.setState({
      Count: prevCount + 1,
      options: prevOption,
    });
    //  console.log(`${options[ailment]} boolean After if`);
  }

  optionTrue(ailment) {
    const { Count, options } = this.state;
    // console.log(`${ailment} boolean in true`);
    let beforeOptions = options;
    let lastCount = Count;
    beforeOptions[ailment] = !beforeOptions[ailment];
    this.setState({
      Count: lastCount - 1,
      options: beforeOptions,
    });
  }

  recommendToggle() {
    this.setState({
      decideShow: !state.decideShow,
      recommendShow: !state.recommendShow,
    });
  }

  render() {
    const { items, decideShow, recommendShow, options } = this.state;
    const decide = decideShow ? (
      <Decide decide={this.optionSelector} recToggle={this.recommendToggle} />
    )
      : <div />;
    const results = recommendShow ? (
      <Results chosen={options} />
    )
      : <div />;
    return (
      <Master id="Master">
       {decide}
       {results}
      </Master>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
