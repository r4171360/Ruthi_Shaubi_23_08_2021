import React, { useContext } from 'react';
import { Container, makeStyles, Snackbar } from '@material-ui/core';
import { AppContext } from '../context';
import Home from './Home';
import Favoraites from './Favoraites';
import TopBar from './TopBar';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15
    }
}));

export default function Main() {

    const classes = useStyles();
    const context = useContext(AppContext);

    return (
        <React.Fragment>
            <TopBar/>
            <Container maxWidth="lg" className={classes.root}>
                {context.currentUrl === "favoraites"? 
                        (<Favoraites/>): 
                    (<Home location={context.currentUrl === "home"?null: context.currentUrl}/>)
                }
                <Snackbar open={context.errorSnackbar} autoHideDuration={6000}>
                    <Alert severity="error">{context.errorSnackbar}</Alert>
                </Snackbar>
            </Container>
        </React.Fragment>
    );
}