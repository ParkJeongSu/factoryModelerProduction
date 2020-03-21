import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Typography from "@material-ui/core/Typography";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Park Jeong Su {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default Copyright;

