import React from 'react';
import Navigation from './src/config/navigation';
import { Provider } from 'react-redux';
import { store } from './src/message-redux-toolkit/store';
const App = () => {
  return (
    <Provider store={store} >
      <Navigation />
    </Provider>
  )
};


export default App;
