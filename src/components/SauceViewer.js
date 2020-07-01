import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import ScovilleMeter from './ScovilleMeter';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-aroud',
        alignItems: 'center',
        padding: '0.5em',
        '& img': {
            color: 'white',
        },
    },
    bottle: {
        marginTop: '30px',
        height: '300px'
    },
    containerItem:{
        width: '50%',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
    },
    containerItemRight:{
        width: '50%',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    info:{
        textShadow: '0px 0px 6px yellow',
        color: 'yellow',
        textAlign: 'center',
        fontSize:'1.2em',
        '& a':{
            textDecoration: 'none',
            color: 'lightgreen',
        },
    },

};

const SauceViewer = ({ classes, sauce }) => {

    return (
        <div className={classes.container}>
            {
                sauce
                    ? (
                        <>
                            <div className={classes.containerItemRight}>
                                <img className={classes.bottle} src={sauce.img_url} alt={sauce.name} />
                                <div className={classes.info}>
                                    <h3>{sauce.name}</h3>
                                    <small>
                                        <a href = {sauce.website} target = "_blank">{sauce.maker}</a>
                                        </small>
                                </div>
                            </div>
                            <div className = {classes.containerItem}>
                            <ScovilleMeter height={500} scovilles={sauce.scovilles} />
                            </div>
                        </>
                    )
                    : (
                        <h3>Sauce not found</h3>
                    )
            }
        </div>
    )

};

SauceViewer.propTypes = {
    classes: PropTypes.shape({}).isRequired,
};

export default injectSheet(styles)(SauceViewer);
