import React from 'react';
import styled from 'styled-components';
import List from './List.jsx';

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

class Decide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Pain: false,
      Nausea: false,
      Sleep: false,
      Stress: false,
      Count: 0,
    };
    this.optionSelector = this.optionSelector.bind(this);
  }

  optionSelector(e) {
    console.log('Clicked', e.target.innerText);
    const name = e.target.innerText;
    // If its already selected
    this.setState({
      [name]: !this.state[name],
    });
    // If it has not been selected
  }

  render() {
    const { strains } = this.props;
    const ailments = ['Pain', 'Nausea', 'Sleep', 'Stress'];
    const listItems = ailments.map((ailment) => <Ailment className={ailment} key={ailment} onClick={this.optionSelector}><AilmentText>{ailment}</AilmentText></Ailment>);

    return (
      <DecideDiv>
        <DecideTitle>
          <TitleH1>Help me decide</TitleH1>
          <AilmentList>
            {listItems}
          </AilmentList>
        </DecideTitle>
      </DecideDiv>
    );
  }
}

export default Decide;
