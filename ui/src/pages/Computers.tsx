import React from 'react';
import ComputerRow from '../components/ComputerRow';
import { Computer, ChildComputer } from '../models/Computer';

//TODO list of PC
//TODO simple host component
//TODO esxi host component


const computers: Computer[] = [
  {
    "ID": 1,
    "Name": "ESX00",
    "IPAddress": "192.168.1.4",
    "Status": "UNKNOWN",
    "Child": [
      {
        "ID": 5,
        "Name": "UBUNTU",
        "Status": "UNKNOWN"
      },
      {
        "ID": 8,
        "Name": "NODE80",
        "Status": "UNKNOWN"
      }
    ] as ChildComputer[]
  },
  {
    "ID": 2,
    "Name": "ESX01",
    "IPAddress": "192.168.1.5",
    "Status": "UNKNOWN",
    "Child": [
      {
        "ID": 8,
        "Name": "Windows10",
        "Status": "OFFLINE"
      },
      {
        "ID": 9,
        "Name": "Raspbian",
        "Status": "SUSPENDED"
      },
      {
        "ID": 3,
        "Name": "NONE90",
        "Status": "OFFLINE"
      }
    ] as ChildComputer[]
  }
];


function Computers() {
  return (

    <div className="row">
      <div className="col-1"></div>
      <div className="col-10">
        <table className="table table-light mt-5 rounded">
          <thead className="table-light">
            <tr>
              <th scope="col" >Name</th>
              <th scope="col">IpAddress</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody >
            {computers.map((v, i) => {
              return (
                <ComputerRow computer={v} index={i} />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>)
}

export default Computers