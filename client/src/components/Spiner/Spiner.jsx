import Spinner from "react-bootstrap/Spinner"

import React from 'react'

const Spiner = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "23px" }}>
        <Spinner animation="border" variant="danger" />
      </div>

    </>
  )
}

export default Spiner