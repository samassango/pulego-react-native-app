import React from 'react';
import Setup from './js/setup';
import 'expo';

export default class App extends React.Component {
  render() {
  	console.disableYellowBox = true;
    return (
      <Setup />
    );
  }
}