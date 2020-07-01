import React, { useState, useEffect } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import SauceViewer from './SauceViewer';


const styles = {
    container: {
        width: '100%',
        display: 'flex',
        color: 'yellow',
        flexDirection: 'column',
    },
    selectedSauce: {
        height: '70%',
    },
    bottles: {
        display: 'flex',
        felxWrap: 'wrap',
        maxHeight: '410px',
        overflow: 'auto',
        justifyContent: 'center',
        '& img': {
            height: '200px',
            cursor: 'pointer',
        },
    },
};

const SeasonViewer = ({ match, classes, history }) => {
    const { season } = match.params;
    const [sauces, setSauces] = useState([]);
    const [selectedSauce, setSelectedSauce] = useState(null);
    

    useEffect(() => {
        const sauces = require(`../sauces/season_${season}.json`);
        setSauces(sauces);
        const { sauce_id } = match.params;

        if(sauce_id){
            setSelectedSauce(sauces.find(sauce => sauce.id == sauce_id));
        }
    }, [season, match.params]);

    return (
        <div className={classes.container}>
            <div className={classes.selectedSauce}>
                <Switch>
                    <Route
                        path="*/sauces/:sauce_id"
                        component={(props) => (
                            <SauceViewer {...props} sauce={selectedSauce || null}/>
                        )} />
                </Switch>
            </div>
            <div className={classes.bottles}>
                {
                    sauces.map(sauce => (
                        <img 
                            key={sauce.id} 
                            src={sauce.img_url} 
                            alt={sauce.name}
                            onClick = {() => history.push(`/seasons/${season}/sauces/${sauce.id}`)}
                            />
                    ))
                }
            </div>
        </div>
    )

};

SeasonViewer.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({}).isRequired,
};

export default withRouter(injectSheet(styles)(SeasonViewer));
