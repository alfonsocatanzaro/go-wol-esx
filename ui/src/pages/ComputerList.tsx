import React, { useCallback } from 'react';
import ComputerRow from '../components/ComputerRow';
import { ComputerActionArgs } from '../models/Computer';
import { useComputers } from '../hooks/useComputers';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

export default function ComputerList() {
  const { computersList } = useComputers();
  let history = useHistory();

  const commandHandler = useCallback((c: ComputerActionArgs) => {
    console.log(`${c.computer.Name} ${c.action} ${c.child && c.child.Name}`)
    if (c.action == 'EDIT') {
      history.push(`/computers/edit/${c.computer.ID}`);
    }
  }, []);

  return (
    <>
      <div className="row ml-1 mt-1">
        <NavLink className="btn btn-info" to="/computers/add">
          Add new
        </NavLink>
      </div>
      <div className="row border border-dark bg-dark text-light p-1 mt-1 rounded-lg ml-1 mr-1">
        <div className="col-6 p-1 ">Name</div>
        <div className="col-3 p-1">Status</div>
        <div className="col-3 p-1">Action</div>
      </div>
      {computersList.map((v, i) => {
        return (
          <ComputerRow
            key={v.ID}
            computer={v}
            commandHandler={(arg) => commandHandler(arg)} />
        )
      })}
    </>)
}
