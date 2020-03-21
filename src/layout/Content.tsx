import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Copyright from './../component/Copyright';
import ToDoListMain from '../component/ToDoListMain';
import NomalTable from '../component/NomalTable';

// import Paper from '@material-ui/core/Paper';



interface ContentProps  {
  classes : any
  };

const Content = ({classes } : ContentProps)=> {

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          
          {/* Nomal Table */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <NomalTable columnList={[]} dataList = {[]} />
            </Grid>
          </Grid>
          {/* Nomal Table */}

          {/* Home */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <ToDoListMain todos={[]}/>
            </Grid>
          </Grid>
          {/* Home */}

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    );
  }

  export default Content;