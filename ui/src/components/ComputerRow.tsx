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
        <div
          className="row border border-dark bg-light text-black p-1 rounded-lg ml-1 mr-1"
          key={((computer.ID * 100) + index + 1).toString()}>
          <div className="col-6 p-1 pl-4">
            <span className="font-weight-bold">{child.Name}</span>
          </div>
          <div className="col-3 p-1">
            <StatusIndicator status={child.Status} />
          </div>
          <div className="col-3 p-1" >
            <ActionButtons
              status={child.Status}
              canEdit={false}
              actionFn={(action) => actionFn(action, computer, child)} /></div>
        </div>
      )
    })
  }

  return (<>
    <div
      className="row row border border-dark bg-info text-light p-1 pt-4 rounded-lg ml-1 mr-1"
      key={(computer.ID * 100).toString()} >
      <div className="col-6 p-1">
        <span className="font-weight-bold">{computer.Name}</span>
      </div>
      <div className="col-3 p-1">
        <StatusIndicator status={computer.Status} />
      </div>
      <div className="col-3 p-1">
        <ActionButtons
          status={computer.Status}
          canEdit={true}
          actionFn={(action) => actionFn(action, computer)}
        />
      </div>
    </div>
    {child(computer.Child, computer)}

  </>)
}