import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { AppContext } from '../context';

const useStyles = makeStyles((theme) => ({
}));

export default function TopBar() {
  const classes = useStyles();
  const context = useContext(AppContext);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" className={classes.headTitle}>WEATHER APP</Typography>
            </Grid>
            <Grid item>
                <Button onClick={()=>context.setCurrentUrl("home")} variant={context.currentUrl !== "favoraites"? "contained": "outlined"}>Home</Button>
                <Button onClick={()=>context.setCurrentUrl("favoraites")} variant={context.currentUrl === "favoraites"? "contained": "outlined"}>Favoraites</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}