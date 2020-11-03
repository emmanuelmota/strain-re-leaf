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
const ResultsDiv = styled.div`
  border-radius:17px;
  width:600px;
  background-color: #13A8E3;
  padding: 25px 10px 25px 10px;
  display:flex;
  flex-direction: column;
  //justify-content: center;
`;
const ResultsTitle = styled.div`
  display:flex;
`;
const StrainList = styled.ul`
  padding:0px;
  margin:0px;
`;

const Strain = styled.li`
  padding:0px;
  margin:0px;
  list-style-type:none;
`;
const StrainName = styled.h1`
  color:white;
  font-size: 25px;
  font-family: verdana;
  font-weight:bold;
   text-align:center;
 :hover {
  color: #5c5c5c;
 }
`;

const StrainImg = styled.img`
  width:50px;
  border-radius: 5px;
`;
const StrainDesc = styled.p`
  color:white;
  font-size: 15px;
  font-family: verdana;
`;
const OrderButton = styled.button`
  background-color: #fff;
  margin-bottom:25px;
 // color:white;
  font-size: 15px;
  font-family: verdana;
  border-radius: 5px;
`;
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
    const filteredObj = Object.keys(chosen).reduce((p, c) => {
      if (chosen[c]) p[c] = chosen[c];
      return p;
    }, {});
    // console.log('result of filter', filteredObj);

    axios.get('/items/results', {
      params: filteredObj,
    })
      .then((response) => {
         console.log(' back from DB', response.data);
        this.setState({
          select: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { select } = this.state;
    const listItems = select.map((strain) => {
      return (
    <Strain key={strain.name}>
      <StrainName>{strain.name}</StrainName>
      <StrainImg src={strain.img}>
      </StrainImg>
      <StrainDesc>{strain.short_desc}</StrainDesc>
      <StrainDesc>Type: {strain.type}</StrainDesc>
      <StrainDesc>THC %: {strain.thc}</StrainDesc>
      <StrainDesc>Rating: {strain.rating} with: {strain.rating_count} ratings</StrainDesc>
      <StrainDesc>Price: ${Math.floor(Math.random() * (50 - 35) + 35)}</StrainDesc>
      <OrderButton onClick={() => {alert(`Added ${strain.name} to cart!`)}}>Add to cart</OrderButton>
    </Strain>
    )
    });
  //  thc
    return (
      <ResultsDiv id="ResultsDiv">
        <ResultsTitle id="ResultsTitle">
          <TitleH1 id="TitleH1">Results</TitleH1>
        </ResultsTitle>
        <StrainList id="StrainList">
          {listItems}
        </StrainList>
        <OrderButton onClick={() => {alert("Order placed, see you curb side in 30 minutes!")}}>Place order</OrderButton>
      </ResultsDiv>
    );
  }
}

export default Results;
