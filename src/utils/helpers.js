export default function rotate(m, qid, direction) {

    const N = 3;

    // after rotate, correct the row and col values
    const fixAttr = (matrix) => (
        matrix.map( (row, rid) => (
            row.map( (cell, cid) => ({
                ...cell,
                row: rid,
                col: cid,
            }))
        ))
    );   

    // perform a clockwise rotation on the selected quadrant
    const rotate_cw = (m, offset_col, offset_row) => {
        for ( let i = 0; i < (parseInt(N/2)); i++ ) {
            for ( let j = 0; j < (N-i-1); j++ ) {
                let temp  = m[i+offset_row][j+offset_col];
                m[i+offset_row][j+offset_col] = m[N-1-j+offset_row][i+offset_col];
                m[N-1-j+offset_row][i+offset_col] = m[N-1-i+offset_row][N-1-j+offset_col];
                m[N-1-i+offset_row][N-1-j+offset_col] = m[j+offset_row][N-1-i+offset_col];
                m[j+offset_row][N-1-i+offset_col] = temp;
            }
        }
        return m;
    }   

    // perform a counter-clockwise rotation on the selected quadrant
    const rotate_cc = (m, offset_col, offset_row) => {
        for ( let i = 0; i < parseInt(N/2); i++ ) {
            for ( let j = 0; j < (N-i-1); j++ ) {
                let temp  = m[j+offset_row][i+offset_col];
                m[j+offset_row][i+offset_col] = m[i+offset_row][N-1-j+offset_col];
                m[i+offset_row][N-1-j+offset_col] = m[N-1-j+offset_row][N-1-i+offset_col];
                m[N-1-j+offset_row][N-1-i+offset_col] = m[N-1-i+offset_row][j+offset_col];
                m[N-1-i+offset_row][j+offset_col] = temp;
            }
        }
        return m
    }

    let offset_row; 
    let offset_col;

    switch(qid) {
        case 1:
            offset_row = 0; offset_col = 0;
            break;
        case 2:
            offset_row = 0; offset_col = 3;
            break;
        case 3:
            offset_row = 3; offset_col = 0;
            break;
        case 4:
            offset_row = 3; offset_col = 3;
            break;
        default:
            return m; 
    }

    if ( direction === 'cc' ) {
        m = rotate_cc(m, offset_col, offset_row);
    } 
    else if ( direction === 'cw' ) {
        m = rotate_cw(m, offset_col, offset_row);
    }

    return fixAttr(m);
}

