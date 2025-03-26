
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import { useState } from "react";
import React from 'react'
const DateRange = ({ setDateRange }) => {
  const [dateRangeFrom, setDateRangeFrom] = useState("")
  const [dateRangeTo, setDateRangeTo] = useState("")

  function search() {
    setDateRange(dateRangeFrom + "--" + dateRangeTo)
  }

  return (<>
    <p style={{ display: "flex", justifyContent: "space-between", padding: 2 }}>{dateRangeFrom} {(dateRangeFrom || dateRangeTo) && "to"} {dateRangeTo}&nbsp;
      {(dateRangeFrom || dateRangeTo) && <>
        <button onClick={() => { setDateRange(""), setDateRangeFrom(""), setDateRangeTo("") }}
          style={{ border: "none", borderRadius: 5, background: "red", color: "white" }}>
          Clear
        </button>
        <button onClick={() => search()}
          style={{ border: "none", borderRadius: 5, background: "green", color: "white" }}>
          Search
        </button>
      </>
      }
    </p>
    <DateRangePicker
      onSelect={(date) => {
        setDateRangeFrom(date.start.format("YYYY-MM-DD")),
          setDateRangeTo(date.end.format("YYYY-MM-DD"))
      }}
      singleDateRange={true}
    />
  </>

  )
}

export default DateRange