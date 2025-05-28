import React, { useState } from 'react'
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import Dropdown from "react-bootstrap/Dropdown"
import Spiner2 from '../Spiner/Spiner2'

import "./table.css"
import moment from "moment";
import { useNavigate } from "react-router-dom"

import { changeStatus } from '../../services/ApiRequests'
import { ToastContainer, toast } from 'react-toastify';

import Pagin from '../Pagination/Pagination'
import Spiner from '../Spiner/Spiner'

const Tables = ({ usersData, deleteUser, getAllUsers,
  handleNext, handlePrevious, page, pageCount, setPage }) => {
  const [pageNumber, setPageNo] = useState("")
  // change status
  const updateStatus = async (id, status) => {
    const res = await changeStatus(id, status)
    if (res.status == 200) {
      getAllUsers()
      toast.success("status updated")
    } else {
      toast.error("error")
    }
  }
  const navigate = useNavigate()

  return (<>
  
  { usersData.length>0 ? <div id="jumpTable" className="container mt-2 p-3" style={{ border: "0px solid red" }}>
      <Row className='p-1' style={{ border: "0px solid blue" }}>

        <Card className='shadow' style={{ overflowX: "scroll", overflowY: "unset", height: 400 }}>

          <Table >
            {/* thead */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Change Status</th>
                <th>Profile</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* tbody */}
            <tbody>
              {
                usersData?.length > 0 ? usersData?.map((element, index) => {
                  return <>
                    <tr>
                      <td>{index + 1 + (page - 1) * 4}</td>
                      <td>{moment(element?.dateCreated).format("DD-MM-YYYY")}</td>
                      <td>{element?.fname + " " + element?.lname}</td>
                      <td>{element?.email}</td>
                      <td style={{ color: element?.gender == "Male" ? "blue" : "black" }}>{element?.gender}</td>

                      {/* status */}
                      <td>
                        <Dropdown className='text-center'>

                          <Dropdown.Toggle variant={element?.status == "Active" ? "success" : "danger"}>
                            {element?.status} &nbsp;
                            <i className="fa-sharp-duotone fa-solid fa-arrow-down"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => updateStatus(element?._id, "Active")}>Active</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateStatus(element?._id, "InActive")}>InActive</Dropdown.Item>
                          </Dropdown.Menu>

                        </Dropdown>
                      </td>

                      {/* image */}
                      <td>
                        {/* <img width={25} height={25} style={{borderRadius:"50%"}} src={`${BASE_URL}/uploads/${element?.profile}`} alt='img' /> */}
                        <img width={25} height={25} style={{ borderRadius: "50%" }} src={element?.profile} alt='img' />
                      </td>

                      {/* actions : view,edit,delete*/}
                      <td>
                        <Dropdown className='text-center'>

                          <Dropdown.Toggle className='action' variant='dark' id='dropdown-basic'  >
                            <i className='fa-solid fa-ellipsis-vertical'></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate(`/userprofile/${element?._id}`)}><i style={{ color: "green" }} className='fa-solid fa-eye'></i> View</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate(`/edit/${element?._id}`)}><i style={{ color: "black" }} className='fa-solid fa-edit'></i> Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => deleteUser(element?._id)}><i style={{ color: "red" }} className='fa-solid fa-remove'></i> Delete</Dropdown.Item>
                          </Dropdown.Menu>

                        </Dropdown>
                      </td>

                    </tr>
                  </>
                }) : <div className='d-flex justify-content-center'>No data found!</div>
              }

            </tbody>
          </Table>
          {/* pagination */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
           {usersData?.length>0&& <div>
              <input value={pageNumber} onChange={(e) => {
                let temp=Number(e.target.value).toString()
                if ( temp == "NaN") {
                  return
                } else {
                  setPageNo(e.target.value)
                }

              }
              }
                style={{ width: 89, outline: "none" }}
                placeholder='Pg.No' type='text' />&nbsp;

              <button onClick={() => {if (!pageNumber=="")setPage(pageNumber)}} style={{ background: "red", border: "none", borderRadius: 3, color: "white", outline: "none" }}>Go</button>
              &nbsp;
              <button onClick={() => { setPage(1); setPageNo("") }} style={{ border: "none", background: "green", borderRadius: 3, color: "white", outline: "none" }}>Clear</button>

            </div>}

            <Pagin handlePrevious={handlePrevious} handleNext={handleNext} setPage={setPage} page={page} pageCount={pageCount} />
          </div>


        </Card>


      </Row>
      {/* row ends */}
      <ToastContainer />

    </div>:<Spiner/>}
 
  </>)
}

export default Tables