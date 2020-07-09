import { useState, useCallback, useEffect } from "react";
import { Computer } from '../models/Computer';

import Axios from "axios";




export const useComputers = () => {
  const [computersList, setComputersList] = useState<Computer[]>([]);
  const [time, setTime] = useState<number>(Date.now());

  const fetchData = useCallback(async () => {
    const resp = await Axios.get<Computer[]>(
      `${process.env.REACT_APP_API_URL}/api/computers`
    );
    // TODO Manage error
    setComputersList(resp.data);

  }, []);

  //initial load
  useEffect(() => {
    console.log("first load");
    fetchData();
  }, []);

  // periodical update
  useEffect(() => {
    const interval = setInterval(async () => {
      setTime(Date.now());
      console.log("periodical update!");
      fetchData();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return { computersList }
}

