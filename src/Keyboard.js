import React from 'react';
import Keyboard from "react-simple-keyboard";

const layout = {
  'default': [
    'Q W E R T Y U I O P',
    'A S D F G H J K L',
    'Z X C V B N M',
    '{bksp} submit'
  ]
};

export default class Thing extends React.Component {
  onChange = (e) => {
    this.props.setGuess(e);
  }

  onKeyPress = (key) => {
    if(key === 'submit') {
      this.props.onSubmit();
      this.keyboard.clearInput();
    }
  }

  render() {
    const { word } = this.props;
    return (
      <Keyboard
        keyboardRef={r => (this.keyboard = r)}
        maxLength={ word.length }
        useTouchEvents={true}
        layout={ layout }
        layoutName='default'
        onChange={ this.onChange }
        onKeyPress={ this.onKeyPress }
        />
    );
  }
}
