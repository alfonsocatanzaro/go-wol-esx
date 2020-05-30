import React, { ReactElement } from 'react';
import { Computer } from '../models/Computer';

type ComputerRowProps = {
  computer: Computer,
  index: number
}

export default function ComputerRow({ computer, index }: ComputerRowProps): ReactElement {
  return (<>
    <tr key="{index}">
      <th scope="row">{computer.Name}</th>
      <td>{computer.IPAddress}</td>
      <td>{computer.Status}</td>
      <td></td>
    </tr>
  </>)
}