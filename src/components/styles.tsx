import styled from '@emotion/styled';

import Cell from '@mui/material/TableCell';

export const TableCellHead = styled(Cell)`
    font-weight: bold;
`;

export const TagOn = styled.span`
  padding: 2px 4px;
  color: #44bb44;
  background: #efefef;
  border: 1px solid #dedede;
  border-radius: 4px;
`;

export const TagOff = styled(TagOn)`
  color: #dd4444;
`;