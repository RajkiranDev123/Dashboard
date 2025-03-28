import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import { getMeta } from '../../services/ApiRequests';
import BarGraph from './BarGraph';

export default function BasicBars2() {

  const [meta, setMeta] = useState({})
  const getMetaData = async () => {

    const response = await getMeta()
    console.log("get meta==>", response.data)
    if (response.status == 200) {
      setMeta(response.data)
    } else {
      console.log("failed to fetch")
    }

  }

  useEffect(() => {
    getMetaData()
  }, [])

  return (<>
    <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>

      <PieChart
        series={[
          {
            data: [
              { id: 0, value: meta?.male, label: "Male", color: "blue" },
              { id: 1, value: meta?.female, label: "Female", color: "brown" },

            ],
          },
        ]}
        width={320}
        height={200}
      />
      {/*  */}
      <BarGraph />



      {/*  */}
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: meta?.active, label: "Active", color: "red" },
              { id: 1, value: meta?.inActive, label: "InActive", color: "green" },

            ],
          },
        ]}
        width={320}
        height={200}
      />



    </div>


  </>);
}