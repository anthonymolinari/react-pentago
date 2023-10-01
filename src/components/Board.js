import { Box, Grid, Stack, IconButton } from '@mui/material';
import Cell from './Cell';
import { num_columns } from '../utils/sizes';
 
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

export default function Board( props ) {

    const { gameData, moveHandler, rotationHandler } = props;

    return (
        <Box>
            <Box sx={{ display: 'inline' }}>
                <Box sx={{ alignItems: 'center', display: 'inline-flex'}}>
                    <IconButton onClick={() => rotationHandler(1,'cc')} aria-label="q1-rotate-anti-clockwise">
                        <UndoIcon/>
                    </IconButton>
                    <Box sx={{ width: 200}} />
                    <IconButton onClick={() => rotationHandler(2,'cw')} aria-label="q2-rotate-clockwise">
                        <RedoIcon/>
                    </IconButton>
                </Box>
                <Box sx={{ alignItems: 'center', margin: 'auto', display: 'flex', flexGrow: 1, width: 437 }}>
                    <Stack sx={{ alignItems: 'center' }}>
                        <IconButton onClick={() => rotationHandler(1,'cw')} aria-label="q1-rotate-clockwise">
                            <RedoIcon sx={{ transform: 'rotate(270deg)' }} />
                        </IconButton>
                        <Box sx={{ height: 200, margin: 0, padding: 0 }}/>
                        <IconButton onClick={() => rotationHandler(3,'cc')} aria-label="q1-rotate-anti-clockwise">
                            <UndoIcon sx={{ transform: 'rotate(270deg)' }} />
                        </IconButton>
                    </Stack>
                    <Grid container columns={num_columns} sx={{ width: 351, height: 351}}>
                        {[...gameData.map((row_arr, row_id) => row_arr.map((cell, col_id) => (
                            <Cell key={`grid-item-${row_id}${col_id}`} data={cell} moveHandler={moveHandler} />
                        )))]}
                    </Grid>
                    <Stack>
                        <IconButton onClick={() => rotationHandler(2,'cc')} aria-label="q1-rotate-anti-clockwise">
                            <UndoIcon sx={{ transform: 'rotate(90deg)' }} />
                        </IconButton>
                        <Box sx={{ height: 200, margin: 0, padding: 0 }}/>
                        <IconButton onClick={() => rotationHandler(4,'cw')} aria-label="q4-rotate-clockwise">
                            <RedoIcon sx={{ transform: 'rotate(90deg)' }} />
                        </IconButton>
                    </Stack>
                </Box>
                <Box sx={{ alignItems: 'center', display: 'inline-flex' }} >
                    <IconButton onClick={() => rotationHandler(3,'cw')} aria-label="q3-rotate-clockwise">
                        <RedoIcon sx={{ transform: 'rotate(180deg)' }} />
                    </IconButton>
                    <Box sx={{ width: 200 }}/>
                    <IconButton onClick={() => rotationHandler(4,'cc')} aria-label="q4-rotate-anti-clockwise">
                        <UndoIcon sx={{ transform: 'rotate(180deg)' }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

