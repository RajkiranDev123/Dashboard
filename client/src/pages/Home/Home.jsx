import React, { useContext, useEffect, useState, Suspense } from 'react'

import "./home.css"
import Headers from "../../components/Headers/Headers"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown"
import Row from "react-bootstrap/Row"
import Alert from "react-bootstrap/Alert"
import { useNavigate } from 'react-router-dom'
import moment from "moment"
import Tables from "../../components/Tables/Tables"

import Spiner from '../../components/Spiner/Spiner'

//import the contexts (context has states)
import { addData, updateData } from '../../components/context/contextProvider'

import { fetchAllUsers, userDelete, exportToCsv } from "../../services/ApiRequests"
import { toast } from 'react-toastify'
import Footer from '../../components/Footer/Footer'
// import BasicBars from "../../components/charts/barChart"
import BasicBars2 from "../../components/charts/barChart2"
import DateRange from "../../components/DateRange/DateRange"

const BasicBars = React.lazy(() => import("../../components/charts/barChart"))


const Home = () => {
  const [showSpin, setShowSpin] = useState(true)
  const navigate = useNavigate()

  //use the contexts
  const { userAdd, setUserAdd } = useContext(addData)
  const { update, setUpdate } = useContext(updateData)
  //      use    &    set

  const [usersData, setUsersData] = useState([])
  const [search, setSearch] = useState("")
  const [gender, setGender] = useState("All")
  const [status, setStatus] = useState("All")
  const [dateRange, setDateRange] = useState("")
  const [sort, setSort] = useState("new")
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const goToRegister = () => {
    navigate("/register")
  }
  const deleteUser = async (id) => {
    const response = await userDelete(id)
    if (response?.status == 200) {
      getAllUsers()
    } else {
      toast.error("error")
    }

  }

  const clearInputs = async () => {
    setSearch("")
  }

  async function exportcsv() {
    const response = await exportToCsv()
    if (response?.status == 200) {
      window.open(response.data.downloadUrl, "blank")
    }
  }

  //pagin
  const handlePrevious = () => {
    setPage(
      () => {
        if (page == 1) return page
        return page - 1
      }
    )
  }

  const handleNext = () => {
    setPage(
      () => {
        if (page == pageCount) return page
        return page + 1
      }
    )
  }

  const getAllUsers = async () => {

    const config = { "date-range": dateRange, "Content-Type": "application/json" }
    const response = await fetchAllUsers(search, gender, status, sort, page, config)

    if (response?.status == 200) {
      setUsersData(response?.data?.usersData)
      setPageCount(response?.data?.pagination?.pageCount)
    } else {
      console.log("failed to fetch")
    }
  }

  useEffect(() => {
    let timer1
    //debouncing
    timer1 = setTimeout(() => {
      getAllUsers()
    }, 2000)

    return () => {
      //The cleanup function will be run every time the hook re-runs ,not on initial render
      // and also when the component unmounts.
      console.log("clean up called on when dependencies change or useEffect hook re-runs and unmounting")
      clearTimeout(timer1)
    }
  }, [search])

  useEffect(() => {
    getAllUsers()
    setTimeout(() => {
      setShowSpin(false)
    }, 1000)

  }, [gender, status, sort, dateRange, page])
  return (<>
    {
      userAdd ?
        <Alert variant='success' onClose={() => setUserAdd("")} dismissible>{userAdd.fname} is added!</Alert> : ""
      ////////////////////////////////////////// empty the context
    }
    {
      update ?
        <Alert variant='success' onClose={() => setUpdate("")} dismissible>{update.fname} is updated!</Alert> : ""
    }

    <Headers headerName="Dashboard" />
    {/* container */}
    <div className=" p-2 " style={{ border: "0px solid red", background: "#2c3968" }}>
      {/* main */}
      <div className="main_div p-2" style={{ border: "0px solid blue" }}>

        {/* search & add */}
        <div className="search_add m-2 p-2 d-flex justify-content-between flex-wrap"
          style={{ border: "0px solid violet", borderRadius: 4, background: "" }}>

          {/* search */}
          <div className="search col-sm-12 col-md-12 col-lg-6 d-flex justify-content-start">
            <Form className='d-flex'>
              <Form.Control
                type='search'
                placeholder='Search by name'
                className='me-2'
                aria-label='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant='success' className='search_button me-2'>Search</Button>
              <Button onClick={() => { clearInputs() }} variant='danger' className='search_button'>Clear</Button>
            </Form>
          </div>
          {/* search ends*/}

          {/* add button*/}
          <div className="add_btn col-sm-12 col-md-12 col-lg-6 d-flex justify-content-end">
            <Button variant='primary' onClick={goToRegister} className='add_button'><i className='fa-solid fa-plus'></i>Add User</Button>
          </div>
          {/* add button ends*/}
        </div>
        {/* search & add  ends*/}

        {/* charts */}
        <div className="search_add m-2 p-2 d-flex justify-content-between align-items-center flex-wrap"
          style={{ border: "2px outset brown", borderRadius: 4, background: "#F5F5DC" }}>
          <Suspense fallback={<p>wait...........</p>}>
            <BasicBars usersData={usersData} />
          </Suspense>
          <BasicBars2 usersData={usersData} />
        </div>
        {/* charts ends */}


        {/*export & filters :  export,gender,value,status */}
        <Row className='m-2 p-2' style={{ border: "2px outset black", borderRadius: 4, background: "#E9DCC9" }}>
          <div className="filters_div mt-5 d-flex justify-content-between align-items-center flex-wrap" style={{ border: "0px solid green" }}>

            {/* export  starts*/}

            <div className="export col-sm-12 col-md-12 col-lg-3 d-flex justify-content-center">
              <Button onClick={exportcsv} variant='primary' className='export_button'>Export To CSV</Button>
            </div>

            {/* export ends*/}

            {/* gender */}
            <div className="filter_gender col-sm-12 col-md-12 col-lg-3"
              style={{ border: "0px solid red", borderRadius: 3, background: "white", padding: 3, boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px " }}>
              <h6 style={{ color: "red" }} className='text-center'>Filter By Gender</h6>
              <div className="gender d-flex justify-content-around" style={{ color: "brown" }}>
                <Form.Check
                  type={"radio"}
                  label={"All"}
                  name="gender"
                  value={"All"}
                  defaultChecked
                  onChange={(e) => setGender(e.target.value)}

                />
                <Form.Check
                  type={"radio"}
                  label={"Male"}
                  name="gender"
                  value={"Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  type={"radio"}
                  label={"Female"}
                  name="gender"
                  value={"Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
            {/* gender ends*/}

            {/* sort by value starts */}
            <div className="filter_newold col-sm-12 col-md-12 col-lg-3" >
              <h6 style={{ color: "red" }} className='text-center'>Sort by Value</h6>

              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id='dropdown-basic'>
                  <i style={{ fontSize: 13 }} className='fa-solid fa-sort'></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>

              </Dropdown>
            </div>
            {/* sort by value ends*/}

            {/* sort by status */}
            <div className="filter_status col-sm-12 col-md-12 col-lg-3"
              style={{ border: "0px solid red", borderRadius: 3, background: "white", padding: 3, boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px " }}>

              <h6 style={{ color: "red" }} className='text-center'>Filter By Status</h6>
              <div className="status_radio d-flex justify-content-around flex-wrap gap-1" style={{ color: "brown" }}>
                <Form.Check
                  type={"radio"}
                  label={"All"}
                  name="status"
                  value={"All"}
                  defaultChecked
                  onChange={(e) => setStatus(e.target.value)}
                />
                <Form.Check
                  type={"radio"}
                  label={"Active"}
                  name="status"
                  value={"Active"}
                  onChange={(e) => setStatus(e.target.value)}

                />
                <Form.Check
                  type={"radio"}
                  label={"InActive"}
                  name="status"
                  value={"InActive"}
                  onChange={(e) => setStatus(e.target.value)}

                />
              </div>

            </div>

            {/* sort by status ends*/}

            {/* date range */}
            <div style={{ display: "flex", justifyContent: "center", background: "", width: "100%", padding: 5, alignItems: "center", marginTop: 3, borderRadius: 4 }}>
              <div style={{ border: "3px outset grey", borderRadius: 4, padding: 2 }}>
                <p style={{ fontWeight: "", color: "red", marginLeft: 26 }}>Filter By Date-Range :</p>
                <DateRange setDateRange={setDateRange} />
              </div>
            </div>
            {/* date range ends */}
          </div>
        </Row>
        {/* export,gender,value,status ends*/}



        {/* main div ends */}
      </div>

      {/* table */}
      {
        showSpin ? <Spiner /> : <Tables usersData={usersData} deleteUser={deleteUser} getAllUsers={getAllUsers}
          handlePrevious={handlePrevious} handleNext={handleNext} setPage={setPage} page={page} pageCount={pageCount}
        />
      }
      {/* table ends*/}

      {/* footer starts */}
      <Footer />

    </div>
    {/* container ends */}



  </>

  )
}

export default Home