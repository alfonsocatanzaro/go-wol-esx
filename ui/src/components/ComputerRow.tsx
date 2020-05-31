import React, { ReactElement } from 'react';
import { Computer, ChildComputer } from '../models/Computer';
import { StatusIndicator } from './StatusIndicator';
import { ActionButtons } from './ActionButtons';

type ComputerRowProps = {
  computer: Computer,
  index: number
}


export default function ComputerRow({ computer, index }: ComputerRowProps): ReactElement {

  const child = (chi: ChildComputer[] | null) => {
    if (chi == null || chi.length === 0) return null;

    return chi.map((c, i) => {
      return (
        <tr key={index * 1000 + i}>
          <th scope="row">&nbsp;<span className="text-black-50">↳</span>&nbsp;{c.Name}</th>
          <td>{c.IPAddress}</td>
          <td><StatusIndicator status={c.Status} /></td>
          <td><ActionButtons status={c.Status} /></td>
        </tr>
      )
    })
  }

  return (<>
    <tr key={index * 1000} className="table-primary">
      <th scope="row">{computer.Name}</th>
      <td>{computer.IPAddress}</td>
      <td><StatusIndicator status={computer.Status} /></td>
      <td><ActionButtons status={computer.Status} /></td>
    </tr>
    {child(computer.Child)}
  </>)
}