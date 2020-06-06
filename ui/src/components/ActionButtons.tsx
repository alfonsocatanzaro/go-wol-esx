import {
  faPlay as playIcon,
  faPowerOff as powerOffIcon,
  faPause as pauseIcon,
  faPencilAlt as editIcon
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Status, CommandAction } from '../models/Computer';

type ActionButtonsProps = {
  status: Status
  canEdit: boolean
  actionFn: (_: CommandAction) => void
}

export function ActionButtons({ status, canEdit, actionFn }: ActionButtonsProps) {

  const edit = (canEdit && status !== 'PENDING') ?
    (<button
      className="btn btn-secondary btn-sm"
      onClick={() => actionFn('EDIT')}>
      <FontAwesomeIcon icon={editIcon} /></button>) :
    null;

  const start =
    (status === 'PAUSED' || status === 'OFFLINE' || status === 'STOPPED') ?
      (<button
        className="btn btn-success btn-sm"
        onClick={() => actionFn('POWERON')}>
        <FontAwesomeIcon icon={playIcon} /></button>) :
      null;

  const stop =
    (status === 'ONLINE' || status === 'RUNNING') ?
      (<button
        className="btn btn-danger btn-sm"
        onClick={() => actionFn('SHUTDOWN')}>
        <FontAwesomeIcon icon={powerOffIcon} /></button>) :
      null;

  const pause = (status === 'RUNNING') ?
    (<button
      className="btn btn-warning btn-sm"
      onClick={() => actionFn('SUSPEND')}>
      <FontAwesomeIcon icon={pauseIcon} /></button>) :
    null;

  const spinner = (status === 'PENDING') ?
    (<div className="spinner-border text-primary" style={{
      marginBottom: '-4px'
    }} role="status" >
      <span className="sr-only">Loading...</span>
    </div >) :
    null;

  return (<>{start}{pause}{stop}{spinner}&nbsp;&nbsp;{edit}</>)

}