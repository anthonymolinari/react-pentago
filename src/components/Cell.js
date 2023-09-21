
import { Box } from "@mui/system";


export default function Cell(props) {

    const { data, onClick } = props;

    return (
        <Box sx={{
            border: 1,
            borderColor: 'black',
            boarderRadius: '50%',
        }} onClick={}>

        </Box>
    );
}
