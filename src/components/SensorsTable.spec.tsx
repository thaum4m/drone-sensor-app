
import { render, screen, within } from '@testing-library/react';
import SensorsTable from './SensorsTable';
import { Sensor } from '../types';

describe('SensorsTable', () => {
    it('should render table', () => {
        render(
            <SensorsTable
                sensors={[
                    { id: 1, name: 'sensor-1', serialNumber: '123abc', firmwareVer: '1.2.1', status: 'online' } as Sensor,
                ]}
            />
        );

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        // Should have thead and tbody.
        const rowgroup = within(table).queryAllByRole('rowgroup');
        expect(rowgroup.length).toEqual(2);

        // Get tbody row.
        const row = within(rowgroup[1]).getByRole('row');
        const cells = within(row).queryAllByRole('cell');
        
        const cellText1 = within(cells[0]).getByText('sensor-1');
        expect(cellText1).toBeInTheDocument();
        const cellText2 = within(cells[1]).getByText('123abc');
        expect(cellText2).toBeInTheDocument();
        const cellText3 = within(cells[2]).getByText('1.2.1');
        expect(cellText3).toBeInTheDocument();
        const cellText4 = within(cells[3]).getByText('Online');
        expect(cellText4).toBeInTheDocument();
    });

    it('should display table with alert when no sensors found', () => {
        render(<SensorsTable sensors={[]} />);

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
        // Should have thead and tbody.
        const rowgroup = within(table).queryAllByRole('rowgroup');
        expect(rowgroup.length).toEqual(2);
    
        // Get tbody row.
        const row = within(rowgroup[1]).getByRole('row');
        const cells = within(row).queryAllByRole('cell');
        expect(cells.length).toEqual(1);        
        const alert = within(cells[0]).getByRole('alert');
        expect(alert).toBeInTheDocument();
    });
});
