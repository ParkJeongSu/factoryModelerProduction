import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AppProps {
  name : string;
};

const Hello = ( {name}  : AppProps ) => {
    React.useEffect(()=>{
        return ()=>{
            console.log('Hello unMount 실행');
        };
    });
  return (
    <React.Fragment>
      <h1>Hello + {name}</h1>
    </React.Fragment>
  );
}


export default Hello;

