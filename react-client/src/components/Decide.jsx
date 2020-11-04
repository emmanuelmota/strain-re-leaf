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
flex-direction: column;
justify-content: center;

`;
const DecideTitle = styled.div`
display:flex;
justify-content:center;
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
cursor: pointer;
color:white;
font-size: 25px;
font-family: verdana;
font-weight:bold;
text-align:center;
 :hover {
  color: #5c5c5c;
  background-color: #fff;
 }
 :active {
  color: #13A8E3;
}
`;
const Recommend = styled.button`
cursor: pointer;
 background-color: #fff;
`;
class Decide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.optionSelector = this.optionSelector.bind(this);
  }

  optionSelector(e) {
    this.props.decide(e.target.innerText);
  }

  render() {
    const { strains, recToggle } = this.props;
    const ailments = ['Pain', 'Nausea', 'Sleep', 'Stress'];
    const listItems = ailments.map((ailment) => <Ailment className={ailment} key={ailment} onClick={this.optionSelector}><AilmentText>{ailment}</AilmentText></Ailment>);

    return (
      <DecideDiv>
        <DecideTitle>
          <TitleH1>What ails you my friend ?</TitleH1>
        </DecideTitle>
        <AilmentList>
          {listItems}
        </AilmentList>
        <Recommend onClick={recToggle}>Recommend</Recommend>
      </DecideDiv>
    );
  }
}

export default Decide;
