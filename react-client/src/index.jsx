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
      chosen: [],
      Count: 0,
    };
    this.optionSelector = this.optionSelector.bind(this);
    this.getAll = this.getAll.bind(this);
    this.recommendToggle = this.recommendToggle.bind(this);
    this.optionFalse = this.optionFalse.bind(this);
    this.optionTrue = this.optionTrue.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    axios.get('/items')
      .then((response) => {
        this.setState({
          items: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  optionSelector(ailment) {
    const { Count, options } = this.state;
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
    let prevOption = options;
    let prevCount = Count;
    prevOption[ailment] = !options[ailment];
    this.setState({
      Count: prevCount + 1,
      options: prevOption,
    });
  }

  optionTrue(ailment) {
    const { Count, options } = this.state;
    let beforeOptions = options;
    let lastCount = Count;
    beforeOptions[ailment] = !beforeOptions[ailment];
    this.setState({
      Count: lastCount - 1,
      options: beforeOptions,
    });
  }

  recommendToggle() {
    const { decideShow, recommendShow } = this.state;
    this.setState({
      decideShow: !decideShow,
      recommendShow: !recommendShow,
    });
  }

  render() {
    const { items, decideShow, recommendShow, options, chosen } = this.state;
    const decide = decideShow ? (
      <Decide decide={this.optionSelector} options={options} recToggle={this.recommendToggle} />
    )
      : <div />;
    const results = recommendShow ? (
      <Results chosen={options} available={items} toFilter={chosen}/>
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
