import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer';
import SensorsTableLoader from '../components/SensorsTableLoader';

export const HomePage = () => {
  return (
    <Paper>
        <TableContainer component={Paper}>
          <SensorsTableLoader />
        </TableContainer>
    </Paper>
  )
}

export default HomePage
