import React from 'react';
import styled from 'styled-components';
import List from './List.jsx';

const axios = require('axios').default;

const TitleH1 = styled.h1`
color: white;
font-family: verdana;
`;

const StrainH1 = styled.h1`
color: palevioletred;
`;
const DecideDiv = styled.div`
border-radius:17px;
height: 600px;
width:600px;
background-color: #13A8E3;

padding: 25px 10px 25px 10px;
display:flex;
justify-content: center;
`;
const DecideTitle = styled.div`
flex
`;
const AilmentList = styled.ul`
padding:0px;
margin:0px;
`;

const Ailment = styled.li`

padding:0px;
margin:0px;
list-style-type:none;
`;
const AilmentText = styled.h1`
color:white;
font-size: 25px;
font-family: verdana;
font-weight:bold;
text-align:center;
 :hover {
  color: #5c5c5c;
 }
`;
// chosenAilments() {
//   this.state.filter( (prop) => {
//     return prop === true
//   }
//     );
//

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: [],
    };
    this.filterIt = this.filterIt.bind(this);
  }

  componentDidMount() {
    this.filterIt();
  }

  filterIt() {
    const { chosen, available } = this.props;
    const { select } = this.state;
    // let chosenFiltered = [];
    // Object.keys(chosen).forEach(key => {
    //   if (chosen[key] === true) {
    //     console.log(key, chosen[key]);
    //     chosenFiltered.push({[key]:chosen[key]});
    //   }
    // });
    // this.setState ({
    //   select: chosenFiltered,
    // });

    // filter chosen to only have true
    let filteredObj = Object.keys(chosen).reduce((p, c) => {
      if (chosen[c]) p[c] = chosen[c];
      return p;
    }, {});
    console.log('result of filter',filteredObj );

    axios.get('/items/results', {
      params: filteredObj
    })
      .then(function (response) {
        console.log(' back from DB', response.data);
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  render() {
    return (
      <DecideDiv>
        <DecideTitle>
          <TitleH1>Results</TitleH1>
          <AilmentList>
          </AilmentList>
        </DecideTitle>
      </DecideDiv>
    );
  }
}

export default Results;