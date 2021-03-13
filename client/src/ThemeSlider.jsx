import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

let ThemeSlider = (props) => {
  const [isToggled, setToggle] = useState(props.currentTheme === 'dark');

  let toggle = () => {
    props.handleClick();
    setToggle(!isToggled);
  };

  useEffect(() => {
    if (props.currentTheme === 'dark' && !isToggled) {
      setToggle(true);
    }
  });

  return (
    <SlideWrapper>
      <Icons>🌞</Icons>
      <Switch htmlFor="toggleTheme">
        <Slide title="Switch between light and dark theme" id="toggleTheme" type="checkbox"
          checked={isToggled}
          onChange={toggle}></Slide>
        <Slider slideClicked={isToggled}></Slider>
      </Switch>
      <Icons>🌙</Icons>
    </SlideWrapper>
  );
};

const SlideWrapper = styled.span`
  margin-top: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
  align-self: flex-end;
`;

// box surrounding the actual slider
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 5px;
  margin-right: 5px;

`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.slideClicked ? '#2196F3' : '#CCC'};
  box-shadow: ${props => props.slideClicked ? '0 0 1px #2196F3' : ''};
  border-radius: 34px;
  -webkit-transition: .4s;
  transition: .4s;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    -webkit-transition: .4s;
    transition: .4s;
  }
`;

const Icons = styled.span`
  font-size: 2rem;
`;

// Needs the attribute type=checkbox in the JSX or it won't work
const Slide = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider}:before {
    transform: translateX(26px);
  }
`;



ThemeSlider.propTypes = {
  handleClick: PropTypes.func,
  currentTheme: PropTypes.string
};

export default ThemeSlider;