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
import { yesterdayDate,todayDate,monthDate } from '../../utilities/dates'

import Spiner from '../../components/Spiner/Spiner'

//import the contexts (context has states)
import { addData, updateData } from '../../components/context/contextProvider'

import { fetchAllUsers, userDelete, exportToCsv, getMetaAddedUsers } from "../../services/ApiRequests"
import { toast } from 'react-toastify'
import Footer from '../../components/Footer/Footer'

import DateRange from "../../components/DateRange/DateRange"

const BasicBars2 = React.lazy(() => import("../../components/charts/barChart2"))


const Home = () => {
  const [showSpin, setShowSpin] = useState(true)
  const [filterHideShow, setFilterHideShow] = useState(true)
  const [chartsHideShow, setChartsHideShow] = useState(true)
  const [usersAddedHideShow, setUsersAddedHideShow] = useState(true)

  const [filterToday, setFilterToday] = useState(false)
  const [filterYesterday, setFilterYesterday] = useState(false)
  const [filterThisMonth, setFilterThisMonth] = useState(false)





  const [meta, setMeta] = useState({})


  const navigate = useNavigate()

  //use the contexts
  const { userAdd, setUserAdd } = useContext(addData)
  const { update, setUpdate } = useContext(updateData)
  //      use    &    set

  const [usersData, setUsersData] = useState([])

  const [search, setSearch] = useState("")
  const [gender, setGender] = useState("All")
  const [status, setStatus] = useState("All")
  const [sort, setSort] = useState("new")

  const [dateRange, setDateRange] = useState("")
  console.log(dateRange)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  const goToRegister = () => {
    navigate("/register")
  }

  function hideAll() {
    setChartsHideShow(false)
    setFilterHideShow(false)
    setUsersAddedHideShow(false)
  }

  function showAll() {
    setChartsHideShow(true)
    setFilterHideShow(true)
    setUsersAddedHideShow(true)
  }
  // delete user
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

  // meta usersAdded
  const getMetaDataUsersAdded = async () => {

    const response = await getMetaAddedUsers()

    if (response.status == 200) {
      setMeta(response.data)
    } else {
      console.log("failed to fetch")
    }

  }
  // filters
  const filterByToday = () => {
    setFilterToday(true)
    setFilterYesterday(false)
    setFilterThisMonth(false)
    setDateRange(todayDate)
  }
  const filterByYesterday = () => {
    setFilterToday(false)
    setFilterYesterday(true)
    setFilterThisMonth(false)
    setDateRange(yesterdayDate)

  }
  const filterByThisMonth = () => {
    setFilterToday(false)
    setFilterYesterday(false)
    setFilterThisMonth(true)
    setDateRange(monthDate)

  }
  const clearAll = () => {
    setFilterToday(false)
    setFilterYesterday(false)
    setFilterThisMonth(false)
    setDateRange("")

  }

  ///////////filters/////////////////

  useEffect(() => {
    let timer1
    //debouncing
    timer1 = setTimeout(() => {
      getAllUsers()
    }, 2000)
    return () => {
      //The cleanup function will be run every time the hook re-runs ,not on initial render and  when the component unmounts.
      clearTimeout(timer1)
    }
  }, [search])

  useEffect(() => {
    getAllUsers()
    getMetaDataUsersAdded()
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

          {/* search text box*/}
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
              {/* <Button variant='success' className='search_button me-2'>Search</Button> */}
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontWeight: "bold", display: "flex", gap: 2, marginLeft: 5 }}>
            <span style={{ color: "white" }}>Charts</span>
            <button onClick={() => setChartsHideShow(!chartsHideShow)}
              style={{ border: "none", fontWeight: "bold", background: "grey", color: "white", borderRadius: 4 }}>{chartsHideShow ? "▼" : "▲"}</button>
          </p>
          <div style={{ display: "flex" }}>
            {/* hide all */}
            <p style={{ fontWeight: "bold", display: "flex", gap: 2, marginLeft: 5 }}>
              <span style={{ color: "white" }}>Hide All</span>
              <button onClick={() => hideAll()}
                style={{ border: "none", fontWeight: "bold", background: "grey", color: "white", borderRadius: 4 }}>{"▲"}</button>
            </p>
            <p style={{ fontWeight: "bold", display: "flex", gap: 2, marginLeft: 5 }}>
              <span style={{ color: "white" }}>Show All</span>
              <button onClick={() => showAll()}
                style={{ border: "none", fontWeight: "bold", background: "grey", color: "white", borderRadius: 4 }}>{"▼"}</button>
            </p>
          </div>
        </div>
        {chartsHideShow && <div className="search_add m-2 p-2"
          style={{
            border: "0px outset brown", borderRadius: 4, background: "#C0C0C0",
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px "
          }}>
          <Suspense fallback={<p>wait...........</p>}>
            <BasicBars2 />
          </Suspense>
        </div>}
        {/* charts ends */}
        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* users added details */}
        <p style={{ fontWeight: "bold", display: "flex", gap: 2, marginLeft: 5 }}>
          <span style={{ color: "white" }}>Users Added</span>
          <button onClick={() => setUsersAddedHideShow(!usersAddedHideShow)}
            style={{ border: "none", fontWeight: "bold", background: "grey", color: "white", borderRadius: 4 }}>{usersAddedHideShow ? "▼" : "▲"}</button>
        </p>
        {usersAddedHideShow && <div className="search_add m-2 p-2 d-flex justify-content-around align-items-center flex-wrap"
          style={{
            border: "0px outset brown", borderRadius: 4, background: "#C0C0C0",
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px "
          }}>
           {/* total  */}
           <div style={{
            background: "white", padding: 4, borderRadius: 3,
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(12, 10, 121, 0.3) 0px 8px 16px -8px "
          }}>
            <p style={{ color: "grey" }}>Total Users</p>
            <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{meta?.totalDocs}</p>

          </div>

          {/* this month : metaDataMonth */}
          <div style={{
            background: "white", padding: 4, borderRadius: 3,
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(12, 10, 121, 0.3) 0px 8px 16px -8px "
          }}>
            <p style={{ color: "grey" }}>Users Added this Month</p>
            <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{meta?.metaDataMonth}</p>

          </div>

          {/* yesterday */}
          <div style={{
            background: "white", padding: 4, borderRadius: 3,
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(12, 10, 121, 0.3) 0px 8px 16px -8px "
          }}>
            <p style={{ color: "grey" }}>Users Added Yesterday</p>
            <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{meta?.metaDataYesterday}</p>

          </div>

          {/* today */}
          <div style={{
            background: "white", padding: 4, borderRadius: 3, marginTop: 1,
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(12, 10, 121, 0.3) 0px 8px 16px -8px "
          }}>
            <p style={{ color: "grey" }}>Users Added Today</p>
            <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{meta?.metaDataToday}</p>
          </div>

        </div>}
        {/* user added details ends */}
        {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}



        {/*export & filters :  export,gender,value,status */}
        <p style={{ fontWeight: "bold", display: "flex", gap: 2, marginLeft: 5 }}>
          <span style={{ color: "white" }}>Filtering & Sorting</span>
          <button onClick={() => setFilterHideShow(!filterHideShow)}
            style={{ border: "none", fontWeight: "bold", background: "grey", color: "white", borderRadius: 4 }}>{filterHideShow ? "▼" : "▲"}</button>
        </p>
        {filterHideShow && <Row className='m-2 p-2' style={{ border: "2px outset black", borderRadius: 4, background: "#899499" }}>

          <div className="filters_div mt-5 d-flex justify-content-between align-items-center flex-wrap" style={{ border: "0px solid green" }}>

            {/* export  starts*/}

            <div className="export col-sm-12 col-md-12 col-lg-3 d-flex justify-content-center">
              <Button onClick={exportcsv} variant='primary' className='export_button'>Export To CSV</Button>
            </div>

            {/* export ends*/}

            {/* gender */}
            <div className="filter_gender col-sm-12 col-md-12 col-lg-3"
              style={{
                border: "0px solid red", borderRadius: 3, background: "white", padding: 3,
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px "
              }}>
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
              <h6 style={{ color: "brown" }} className='text-center'>Sort by Value</h6>

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
              style={{
                border: "0px solid red", borderRadius: 3, background: "white", padding: 3,
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px "
              }}>

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
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", width: "100%", padding: 5, alignItems: "center", marginTop: 3, borderRadius: 4, gap: 5 }}>
              <div style={{ border: "0px outset grey", borderRadius: 4, padding: 2, background: "white", }}>
                <p style={{ fontWeight: "", color: "red", marginLeft: 26 }}>Filter By Date-Range :</p>
                <DateRange setDateRange={setDateRange} />
              </div>

              <div style={{ background: "white", width: 320, height: 356, padding: 3, borderRadius: 3, overflowY: "scroll" }}>
                <p style={{ color: "red" }}>&nbsp;More Filters :</p>
                <p style={{fontWeight:"bold",textAlign:"center"}}>{dateRange}</p>

                <br /><br />
                <p onClick={() => filterByToday()} style={{
                  padding: 2, borderRadius: 3, background: "grey", color: filterToday ? "black" : "white", cursor: "pointer", fontWeight: "bold"
                }}>Filter by Today</p>
                <br />
                <p onClick={() => { filterByYesterday() }} style={{
                  padding: 2, borderRadius: 3, background: "grey", color: filterYesterday ? "black" : "white", cursor: "pointer", fontWeight: "bold"
                }}>Filter by Yesterday</p>
                <br />
                <p onClick={() => { filterByThisMonth() }} style={{
                  padding: 2, borderRadius: 3, background: "grey", color: filterThisMonth ? "black" : "white", cursor: "pointer", fontWeight: "bold"
                }}>Filter by This Month</p>
                {/* <br /> */}
                <button onClick={() => { clearAll() }} style={{ background: "blue", borderRadius: 3, border: "none", width: "100%", color: "white" }}>Clear All</button>


              </div>

            </div>
            {/* date range ends */}
          </div>
        </Row>}
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