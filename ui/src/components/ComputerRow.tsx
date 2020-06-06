import React, { ReactElement, useCallback } from 'react';
import { Computer, ChildComputer, ComputerActionArgs, CommandAction } from '../models/Computer';
import { StatusIndicator } from './StatusIndicator';
import { ActionButtons } from './ActionButtons';

type ComputerRowProps = {
  computer: Computer,
  commandHandler: (_: ComputerActionArgs) => void
}




export default function ComputerRow({ computer, commandHandler }: ComputerRowProps): ReactElement {

  const actionFn = useCallback((action: CommandAction, computer: Computer, child?: ChildComputer) => {
    const arg: ComputerActionArgs = {
      computer, child, action
    }
    commandHandler(arg);
  }, []);

  const child = (children: ChildComputer[], computer: Computer | null) => {
    if (children == null || children.length === 0 || computer == null) return null;

    return children.map((child, index) => {
      return (
        <tr key={((computer.ID * 100) + index + 1).toString()}>
          <th scope="row">&nbsp;<span className="text-black-50">↳</span>&nbsp;{child.Name}</th>
          <td>{child.IPAddress}</td>
          <td><StatusIndicator status={child.Status} /></td>
          <td><ActionButtons
            status={child.Status}
            canEdit={false}
            actionFn={(action) => actionFn(action, computer, child)} /></td>
        </tr>
      )
    })
  }

  return (<>
    <tr key={(computer.ID * 100).toString()} className="table-primary">
      <th scope="row">{computer.Name} </th>
      <td>{computer.IPAddress}</td>
      <td><StatusIndicator status={computer.Status} /></td>
      <td><ActionButtons
        status={computer.Status}
        canEdit={true}
        actionFn={(action) => actionFn(action, computer)}
      /></td>
    </tr>
    {child(computer.Child, computer)}
  </>)
}