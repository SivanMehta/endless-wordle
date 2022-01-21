import React from 'react';
import Keyboard from "react-simple-keyboard";
import { generateButtonTheme } from './utils';

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
    const { onSubmit, guess, word } = this.props;
    if(key === 'submit' && guess.length === word.length) {
      onSubmit();
      this.keyboard.clearInput();
    }
  }

  render() {
    const { word, guesses } = this.props;
    const buttonTheme = generateButtonTheme(word, guesses);
    return (
      <Keyboard
        keyboardRef={r => (this.keyboard = r)}
        maxLength={ word.length }
        layout={ layout }
        layoutName='default'
        buttonTheme={ buttonTheme }
        onChange={ this.onChange }
        onKeyPress={ this.onKeyPress }
        />
    );
  }
}
