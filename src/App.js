import { Fragment, useState } from 'react';
import { Box, Button } from '@mui/material';
import Header from './components/Header';
import MessageCenter from './components/MessageCenter';

import {
    num_rows,
    num_columns,
} from './utils/sizes';

import cellStyles from './utils/cellStyles';

import doWeHaveAWinnerThatIncludes from './utils/checkForWin';

import Board from './components/Board';

import rotate from './utils/helpers';

function App() {

    const initGamedata = () => {
        let data = new Array(num_rows).fill(new Array(num_columns).fill({
            ...cellStyles.unused, selected: false,
        }));
        return data.map( (row, rid) => (
            row.map( (cell, cid) => ({
                ...cell, 
                row: rid,
                col: cid,
            }))
        ));
    };

    const [ gameData, setGameData ] = useState(initGamedata);
    const [ message, setMessage ] = useState('Click Start to Begin');
    const [ disable, setDisable ] = useState(true);
    const [ hasWinner, setHasWinner ] = useState(true);
    const [ nextColor, setNextColor ] = useState('blue');
    const [ winnerColor, setWinnerColor ] = useState(undefined);
    const [ disableRotate, setDisableRotate ] = useState(true);
    const [ lastCell, setLastCell ] = useState({});

    const newGame = () => {
        setGameData(initGamedata())
        setDisable(false);
        setMessage();
        setNextColor('blue');
        setMessage('blue plays first');
        setHasWinner(false);
    }

    const advanceColor = color => color === 'red' ? 'blue' : 'red';

    const pickCell = (cell) => {
        let newGameData = moveHandler(cell);
        
        setGameData(newGameData);

        let check = doWeHaveAWinnerThatIncludes(cell.row, cell.col, nextColor, newGameData);
        if (check) {
            setMessage(`${nextColor} wins!`);
            setHasWinner(true);
            setWinnerColor(nextColor);
            setDisable(true);
            return;
        }
        setDisableRotate(false);

    }

    const moveHandler = (cell) => {
        if ( gameData[cell.row][cell.col].selected || disable || hasWinner) {
            return;
        }
        const newGameData = [...gameData];
        newGameData[cell.row][cell.col] = {
            ...newGameData[cell.row][cell.col],
            backgroundColor: nextColor,
            color: nextColor,
            selected: true,
        };

        setDisable(true);
        setMessage(`${nextColor} must rotate a quadrant`);
        return newGameData;
    }

    function handleRotate(quadrant, direction) {
        if ( hasWinner || disableRotate )
            return;
        let newGameData = rotate([...gameData], quadrant, direction);
        // check for win again here
        for ( let row = 0; row < 6; row++ ) {
            for ( let col = 0; col < 6; col++ ) {         
                if (doWeHaveAWinnerThatIncludes(row, col, nextColor, newGameData)) {
                    setDisable(true);
                    setDisableRotate(true);
                    setWinnerColor(nextColor);
                    setHasWinner(true);
                    setGameData(newGameData);
                    setMessage(`${nextColor} wins!`);
                    return;
                }
            }
        }

        setNextColor(advanceColor(nextColor));
        setMessage(`${advanceColor(nextColor)} plays next.`);
        setGameData(newGameData);
        
        setDisable(false);
        setDisableRotate(true);
    }

    return (
        <Fragment>
            <Header />
            <Box sx={{
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                margin: 'auto',
                padding: 'auto'
            }}>
                <MessageCenter msg={message}/>
                { hasWinner ? (<Button variant='outlined' onClick={newGame}>START</Button>) : null }
                <Board gameData={gameData} moveHandler={pickCell} rotationHandler={handleRotate} />
            </Box>
        </Fragment>
    );
}

export default App;
