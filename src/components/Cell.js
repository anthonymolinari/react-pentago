import { Box } from "@mui/system";

import { cellSizes } from "../utils/sizes";

export default function Cell( props ) {

    const { data, moveHandler } = props;

    return (
        <Box key={`cell-${data.row}-${data.col}`} sx={{
            width: cellSizes.width,
            height: cellSizes.height,
            backgroundColor: data.backgroundColor,
            border: 1,
            borderColor: 'black',
            borderRadius: '50%',
            margin: 0.4,
        }} onClick={() => moveHandler(data)}> </Box>
    )
}

