import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const styles = {
    sidebar: {
        height: '100%',
        minWidth: '250px',
        overflowY: 'scroll'
    },
    seasonButton: {
        background: 'inherit',
        transition: '0.5s',
        fontFamily: '\'Allerta Stencil\', sans-serif',
        cursor: 'pointer',
        textAlign: 'center',
        minWidth: '100px',
        fontSize: '2em',
        margin: '1em',
        padding: '0.25em',
        color: 'yellow',
        border: '1px solid red',
        borderRadius: '10px',
        '&:hover': {
            background: 'yellow',
            color: 'black',
        }
    },
    infoBtn: {
        outline: 'none',
        fontSize: '2em',
        transition: '0.5s',
        fontFamily: '\'Allerta Stencil\', sans-serif',
        cursor: 'pointer',
        textAlign: 'center',
        minWidth: '165px',
        background: 'inherit',
        padding: '0.25em',
        color: 'lightblue',
        border: '1px solid red',
        borderRadius: '10px',
        margin: ' 1em 1em 0 1em',
        '&:hover': {
            background: 'aquamarine',
            color: 'darkgreen',
        }
    }
}

const seasons = [];

for (let i = 1; i <= 9; i++) {
    const sauces = require(`../sauces/season_${i}.json`);
    seasons.push(sauces);
}


const SeasonSelector = ({ classes, history }) => {
    let msg = (
        <div style = {{color:'white', textAlign: 'center', marginTop:'26px'}}>
            Select a Season
        </div>
    );

    return (
        <div className={classes.sidebar}>
            <a href="https://github.com/nvkex" target="_blank">
                <button className={classes.infoBtn}>
                    <i className="fa fa-github" aria-hidden="true"> </i>
                    &nbsp;Github
                </button>
            </a>
            {msg}
            {
                seasons.map((_, i) => (
                    <div
                        key={i + 1}
                        className={classes.seasonButton}
                        onClick={() => history.push(`/seasons/${i + 1}`)}>
                        Season
                        {' '}
                        {i + 1}
                    </div>
                ))
            }
        </div>
    )

}

SeasonSelector.propTypes = {
    classes: PropTypes.shape({}).isRequired
}

export default withRouter(injectSheet(styles)(SeasonSelector)); 
