import React, { useCallback } from 'react';
import ComputerRow from '../components/ComputerRow';
import { Computer, ChildComputer, ComputerActionArgs } from '../models/Computer';

// TODO: Obtain computerd from api service

const computers: Computer[] = [
  {
    "ID": 1,
    "Name": "ESX00",
    "Status": "OFFLINE",
    "Child": [
      {
        "ID": 5,
        "Name": "UBUNTU",
        "Status": "STOPPED"
      },
      {
        "ID": 8,
        "Name": "NODE80",
        "Status": "ONLINE"
      }
    ] as ChildComputer[]
  },
  {
    "ID": 2,
    "Name": "ESX01",
    "Status": "ONLINE",
    "Child": [
      {
        "ID": 8,
        "Name": "Windows10",
        "Status": "STOPPED"
      },
      {
        "ID": 9,
        "Name": "Raspbian",
        "Status": "PENDING"
      },
      {
        "ID": 3,
        "Name": "NONE90",
        "Status": "ONLINE"
      }
    ] as ChildComputer[]
  }
];




function Computers() {

  const commandHandler = useCallback((c: ComputerActionArgs) => {
    console.log(`${c.computer.Name} ${c.action} ${c.child && c.child.Name}`)
  }, []);


  return (
    <>
      <div className="row border border-dark bg-dark text-light p-1 mt-4 rounded-lg ml-1 mr-1">
        <div className="col-6 p-1 ">Name</div>
        <div className="col-3 p-1">Status</div>
        <div className="col-3 p-1">Action</div>
      </div>
      {computers.map((v, i) => {
        return (
          <ComputerRow
            key={v.ID}
            computer={v}
            commandHandler={(arg) => commandHandler(arg)} />
        )
      })}
    </>)
}

export default Computers