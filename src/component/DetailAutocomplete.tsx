import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { CssBaseline } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface DetailAutocompleteProps {
};

const DetailAutocomplete = ( {}  : DetailAutocompleteProps ) => {
  return (
    <React.Fragment>
      <Grid item xs={6} md={6} lg={6}>
            <FormControl required style={{width: '100%'}}>
              <Typography variant="h6" align ='center'>
                h6. Heading
              </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={top100Films.map(option => option.title)}
                renderInput={params => (
                  <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
                )}
              />
        </Grid>

      <CssBaseline/>
    </React.Fragment>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 }
];



export default DetailAutocomplete;

