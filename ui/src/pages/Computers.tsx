import React, { useCallback } from 'react';
import ComputerRow from '../components/ComputerRow';
import { Computer, ChildComputer, ComputerActionArgs } from '../models/Computer';

// TODO: Obtain computerd from api service

const computers: Computer[] = [
  {
    "ID": 1,
    "Name": "ESX00",
    "IPAddress": "192.168.1.4",
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
    "IPAddress": "192.168.1.5",
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
        "Status": "PAUSED"
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
    <div className="row">
      <div className="col-1"></div>
      <div className="col-10">
        <table className="table table-light mt-5">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">IpAddress</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {computers.map((v, i) => {
              return (
                <ComputerRow
                  key={v.ID}
                  computer={v}
                  commandHandler={(arg) => commandHandler(arg)} />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>)
}

export default Computers