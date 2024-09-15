import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Sensor } from '../types';
import {
  TableCellHead,
  TagOn,
  TagOff,
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
                    key={sensor.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >                
                    <TableCell>{sensor.name}</TableCell>
                    <TableCell>{sensor.serialNumber}</TableCell>
                    <TableCell>{sensor.firmwareVer}</TableCell>
                    <TableCell>
                      {sensor.status === 'online' ? <TagOn>Online</TagOn> : <TagOff>Offline</TagOff>}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
export default SensorsTable;