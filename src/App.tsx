import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Login from './page/Login';
import Main from './page/Main';

import { connect } from 'react-redux';
import { StoreState } from './store/modules';

interface AppProps {
  isLogined : boolean;
};


const App = ( {isLogined} : AppProps) => {
  return (
    <React.Fragment>
      {isLogined===true ? <Main/> : <Login/>}
    </React.Fragment>
  );
}

const mapStateToProps = ({ LogInOut } : StoreState) => ({
  isLogined : LogInOut.isLogined
});

export default connect(mapStateToProps,null)(App);
