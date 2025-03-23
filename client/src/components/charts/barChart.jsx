import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicBars({usersData}) {
console.log("i am from basic bars")
  let countActive=usersData.filter(e=>e.status=="Active").length
  let countInActive=usersData.filter(e=>e.status=="InActive").length

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value:countActive, label: "Active",color:"green" },
            { id: 1, value: countInActive, label: "In-Active" ,color:"red"},
          
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}