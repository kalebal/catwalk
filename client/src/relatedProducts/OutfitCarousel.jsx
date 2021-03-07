import React from 'react';
import PropTypes from 'prop-types';
import StyledSlide from './Slide.jsx';
import styled from 'styled-components';


class OutfitCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.removeProductClickHandler = this.removeProductClickHandler.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.addProductClickHandler = this.addProductClickHandler.bind(this);

    this.state = {
      yourOutfit: {}
    };
  }

  componentDidMount() {
    var localStorage = JSON.parse(window.localStorage.getItem('relatedProducts'));
    if (localStorage && localStorage.yourOutfit) {
      this.setState({
        yourOutfit: localStorage.yourOutfit
      });
    }
  }
  componentDidUpdate() {
    window.localStorage.setItem('relatedProducts', JSON.stringify(this.state));
  }

  removeFromOutfit(product) {
    let currentOutfit = this.state.yourOutfit;
    delete currentOutfit[product.id];
    this.setState({
      yourOutfit: currentOutfit
    });
  }

  addToOutfit(newProduct) {
    let currentOutfit = this.state.yourOutfit;
    currentOutfit[newProduct['id']] = newProduct;
    this.setState({
      yourOutfit: currentOutfit
    });
  }

  addProductClickHandler(event) {
    event.preventDefault();
    event.target.setAttribute('disabled', true);
    this.addToOutfit(this.props.currentProduct);
  }

  removeProductClickHandler(event, data) {
    this.removeFromOutfit(data);
  }

  render() {
    return (
      <>
        <FirstSlide onClick={this.addProductClickHandler}>
          <p>Add Product to Outfit</p>
        </FirstSlide>
        {Object.values(this.state.yourOutfit).map((product) => {
          return <StyledSlide data={product}
            cardButtonClick={this.removeProductClickHandler}
            key={product.id}
            render={onClick => (
              <Button onClick={onClick}>x</Button>
            )}>
          </StyledSlide>;
        })}
      </>
    );
  }
}

OutfitCarousel.propTypes = {
  data: PropTypes.object.isRequired,
  currentProduct: PropTypes.object
};

const FirstSlide = styled.div`
  width: 200px;
  height: 300px;
  background-color: ${props => props.theme.topLayer};
  margin: 0.5em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 2 0 auto;
  p {
    ${props => props.theme.primaryText};
    font-size: 1em;
  }

   &:hover {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
   }
`;

const Button = styled.button`
  font-size: 1em;
  color: white;
  border: none;
  position: absolute;
  top: 2%;
  left: 80%;
  cursor: pointer;
  background: rgba(0,0,0,0.19);

`;



export default OutfitCarousel;
