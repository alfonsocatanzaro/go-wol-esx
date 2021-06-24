import React from 'react';
import { useParams } from 'react-router-dom';

export default function ComputerEdit() {
  let { id } = useParams<{id:string}>();
  return (<>
    <h1>Edit computer {id}</h1>
  </>)
}