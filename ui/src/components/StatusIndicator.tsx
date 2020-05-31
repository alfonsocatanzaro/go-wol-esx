import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Status } from '../models/Computer';

type StatusIndicatorProps = {
  status: Status
}

export function StatusIndicator(props: StatusIndicatorProps) {

  const { text, color } =
    (props.status === 'ONLINE' && { text: "On Line", color: "green" }) ||
    (props.status === 'OFFLINE' && { text: "Off Line", color: "red" }) ||
    (props.status === 'PAUSED' && { text: "Paused", color: "darkorange" }) ||
    (props.status === 'STOPPED' && { text: "Stopped", color: "red" }) ||
    (props.status === 'RUNNING' && { text: "Running", color: "gree" }) ||
    (props.status === 'PENDING' && { text: "Pending...", color: "darkorange" }) ||
    { text: "Unknow", color: "gray" };

  const icon =
    props.status !== "PENDING" ?
      (
        <FontAwesomeIcon icon={faCircle} color={color} />
      ) :
      (
        <div className="spinner-grow spinner-grow-sm" style={{ color: color }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )

  return (<span>{icon}&nbsp;{text}</span>)
}