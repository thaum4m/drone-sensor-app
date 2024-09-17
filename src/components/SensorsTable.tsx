import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';

import { Sensor } from '../types';
import {
  TableCellHead,
} from './styles';

export type SensorsTableProps = {
  sensors: Sensor[];
}

export const SensorsTable = ({ sensors }: SensorsTableProps) => {
  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="Sensors Table">
        <TableHead>
            <TableRow>
                <TableCellHead>Name</TableCellHead>
                <TableCellHead>Serial Number</TableCellHead>
                <TableCellHead>Firmware Version</TableCellHead>
                <TableCellHead>Status</TableCellHead>        
            </TableRow>
        </TableHead>
        <TableBody>
            {sensors.map((sensor) => (
                <TableRow
                    key={sensor.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >                
                    <TableCell>{sensor.name}</TableCell>
                    <TableCell>{sensor.serialNumber}</TableCell>
                    <TableCell>{sensor.firmwareVer}</TableCell>
                    <TableCell>
                      {sensor.status === 'online' ?
                        <Chip label="Online" color="success" size="small" /> :
                        <Chip label="Offline" color="error" size="small" />}
                    </TableCell>
                </TableRow>
            ))}
            {sensors.length === 0 &&
              <TableRow>
                <TableCell colSpan={4}>                  
                  <Alert severity="info">No sensors found.</Alert>
                </TableCell>
              </TableRow>
            }
        </TableBody>
      </Table>
    </>
  );
}
export default SensorsTable;