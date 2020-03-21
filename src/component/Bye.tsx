import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AppProps {
  name : string;
};

const Bye = ( {name}  : AppProps ) => {
    React.useEffect(()=>{
        return ()=>{
            console.log('Bye unMount 실행');
        };
    });
  return (
    <React.Fragment>
      <h1>Bye {name}</h1>
    </React.Fragment>
  );
}



export default Bye;

