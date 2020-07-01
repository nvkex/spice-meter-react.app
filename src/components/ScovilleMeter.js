import React, { useState, useEffect } from 'react'
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import Pepper from '../images/pepper.svg';
import fire from '../images/fire.svg';


const levels = [];

for (let i = 1; i <= 11; i++) {
    const image = require(`../images/${i.toString().padStart(2, '0')}.svg`);
    levels.push(image);
}

const styles = {
    container: {
        display:'inline-flex',
        flexDirection: 'column'
    },
    meter: {
        position: 'relative',
        height: '100%'
    },
    level: {
        position: 'absolute',
        height: '100%',
        width: 'auto'
    },
    blink_me: {
        animation: 'blinker 1s cubic-bezier(0, 2.25, 0, 2.25) infinite'
    },
    text:{
        fontFamily: '\'Allerta Stencil\', sans-serif',
        color: 'rgb(228, 77, 77)',
        textAlign: 'center',
        fontSize: '2em',
        margin: '0',
        textTransform: 'uppercase',
        textShadow: '0px 0px 8px red',
        textStroke: '1px red'
    },
    textYellow:{
        textShadow: '0px 0px 8px yellow',
        textStroke: '1px rgb(211, 211, 0)',
        color: 'rgb(228, 228, 159)'
    }
};

const ranges = [0, 2201, 4001, 9001, 30001, 40001, 71001, 135600, 357000, 625000, 1000000];

const getLevels = (scovilles) => {
    const allLevels = levels.filter((level, i) => scovilles >= ranges[i]);
    if (scovilles >= 1000000) {
        allLevels.push(fire);
    }
    return allLevels;
};

const ScovilleMeter = ({ classes, scovilles, height }) => {
    const allLevels = getLevels(scovilles);
    const [displayedLevels, setDisplayedLevels] = useState([]);

    // Animate rising Scoville Meter
    useEffect(() => {
        if (displayedLevels.length !== allLevels.length) {
            setTimeout(() => {
                const levelsToShow = allLevels.slice(0, displayedLevels.length + 1);
                setDisplayedLevels(levelsToShow);
            }, 100);
        }

    });

    // Blink the fire svg
    useEffect(() => {

    });

    return (
        <div 
            className = {classes.container} 
            style = {{
                height: `${height}px`,
                width: `${0.58 * height}px`
            }}
        >
            <div className={classes.meter}>
                <img src={Pepper} alt="pepper-outline" className={classes.level}></img>
                {
                    displayedLevels.map((level, i) => (
                        i === 11
                            ? (<img key={level} src={level} alt={level} className={`${classes.level} ${classes.blink_me}`}></img>)
                            : (<img key={level} src={level} alt={level} className={classes.level}></img>)
                    ))
                }
            </div>
            <p className ={classes.text} >
                <span className = {classes.textYellow}>scoville</span> 
                <br/>
                <span className = {classes.textYellow}>level</span>
                <br/>
                {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(scovilles)}
            </p>
        </div>
    )
}

ScovilleMeter.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    scovilles: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
}

export default injectSheet(styles)(ScovilleMeter);
