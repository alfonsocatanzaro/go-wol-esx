import { faPlay, faPowerOff, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Status } from '../models/Computer';

type ActionButtonsProps = {
  status: Status
}

export function ActionButtons(props: ActionButtonsProps) {
  const start =
    (props.status === 'PAUSED' || props.status === 'OFFLINE' || props.status === 'STOPPED') ?
      (<button className="btn btn-success btn-sm "><FontAwesomeIcon icon={faPlay} /></button>) :
      null;

  const stop =
    (props.status === 'ONLINE' || props.status === 'RUNNING') ?
      (<button className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faPowerOff} /></button>) :
      null;

  const pause = (props.status === 'RUNNING') ?
    (<button className="btn btn-warning btn-sm"><FontAwesomeIcon icon={faPause} /></button>) :
    null;

  const spinner = (props.status === 'PENDING') ?
    (<div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>) :
    null;

  return (<>{start}{pause}{stop}{spinner}</>)

}