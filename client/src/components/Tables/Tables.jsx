import React from 'react'
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Table from "react-bootstrap/Table"
import Dropdown from "react-bootstrap/Dropdown"

import "./table.css"
import { BASE_URL } from '../../services/ApiEndPoints'
import { NavLink, useNavigate } from "react-router-dom"

import { changeStatus } from '../../services/ApiRequests'
import { ToastContainer, toast } from 'react-toastify';

import Pagin from '../Pagination/Pagination'




const Tables = ({ userData, deleteUser, getAllUsers,
  handleNext, handlePrevious, page, pageCount, setPage }) => {

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

  return (
    // container
    <div className="container mt-2 p-3" style={{ border: "0px solid red" }}>
      <Row className='p-1' style={{ border: "0px solid blue" }}>

        <Card className='shadow' style={{ overflowX: "scroll", overflowY: "unset", height: 300 }}>

          <Table >
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Profile</th>

                <th>Action</th>
              </tr>
            </thead>

            {/* tbody */}
            <tbody>
              {
                userData?.length > 0 ? userData?.map((element, index) => {
                  return <>
                    <tr>
                      <td>{index + 1 + (page - 1) * 4}</td>
                      <td>{element?.dateCreated}</td>
                      <td>{element?.fname + " " + element?.lname}</td>
                      <td>{element?.email}</td>
                      <td>{element?.gender}</td>

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
                      <td>
                        {/* <img width={25} height={25} style={{borderRadius:"50%"}} src={`${BASE_URL}/uploads/${element.profile}`} alt='img' /> */}
                        <img width={25} height={25} style={{ borderRadius: "50%" }} src={element?.profile} alt='img' />




                      </td>
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
          <Pagin handlePrevious={handlePrevious} handleNext={handleNext} setPage={setPage} page={page} pageCount={pageCount} />

        </Card>


      </Row>
      {/* row ends */}
      <ToastContainer />

    </div>
    // continer ends
  )
}

export default Tables