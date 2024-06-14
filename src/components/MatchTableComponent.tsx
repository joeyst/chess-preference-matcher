import React, { useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material'

export default function MatchTableComponent(props: { matches }) {
  const headerRowNames = ["", "#", "Matches"]
  const headerColumnNames = ["Openings", "Time Controls", "Variants"]
  const matches = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

  useEffect(() => { console.log(`MATCHES: ${matches}`) }, [])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headerRowNames.map(name => <TableCell>{name}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {headerColumnNames.map((category, i) => (
            <TableRow key={category}>
              <TableCell>{category}</TableCell>
              <TableCell>{matches[i].length}</TableCell>
              <TableCell>{matches[i].join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
};