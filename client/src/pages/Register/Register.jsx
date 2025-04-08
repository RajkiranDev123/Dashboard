import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import "./register.css"

// form
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from "react-bootstrap/Card"
// react-select
import Select from "react-select"
//notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Headers from "../../components/Headers/Headers"
//api request
import { registerUser } from "../../services/ApiRequests"
//context api
import { addData } from "../../components/context/contextProvider"
import Spiner from '../../components/Spiner/Spiner';

const Register = () => {
  const [inputData, setInputData] = useState({ fname: "", lname: "", email: "", mobile: "", gender: "", location: "" })
  const [status, setStatus] = useState("Active")

  const [image, setImage] = useState("")
  const [preview, setPreview] = useState("")

  const [spin, setSpin] = useState(false)

  const navigate = useNavigate()
  const { setUserAdd } = useContext(addData)

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ]
  const setInputValue = (e) => {
    const { name, value } = e.target
    //name = "fname" // name="lname"
    setInputData({ ...inputData, [name]: value })
  }
  const setStatusValue = (e) => {
    // e= { value: "Active", label: "Active" },
    setStatus(e.value)
  }
  const setProfileImg = (e) => {
    console.log("img=>", e.target.files[0])
    //A FileList is an array-like object,data type is object
    setImage(e.target.files[0])
  }
  const submitUserData = async (e) => {
    e.preventDefault()
    //unpack values from arrays, or properties from objects, into distinct variables.(de structuring)
    const { fname, lname, email, mobile, gender, location } = inputData
    if (fname == "") {
      toast.error("First Name is required!")
    } else if (lname == "") {
      toast.error("Last Name is required!")
    } else if (email == "") {
      toast.error("Email is required!")
    } else if (lname == "") {
      toast.error("Last Name is required!")
    } else if (!email.includes("@")) {
      toast.error("Enter valid email!")
    } else if (mobile == "") {
      toast.error("Mobile No is required!")
    } else if (mobile.length > 10) {
      toast.error("Length is more!")
    } else if (mobile.length < 10) {
      toast.error("10 digits is required!")
    } else if (gender == "") {
      toast.error("Gender is required!")
    } else if (status == "") {
      toast.error("Status is required!")
    } else if (location == "") {
      toast.error("Location is required!")
    } else if (image == "") {
      toast.error("Image is required!")
    } else {
      // JSON can't handle file uploads
      const data = new FormData()
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("location", location)
      // image and status
      data.append("status", status)
      data.append("user_profile", image)

      console.log("Form Data before submit ==>", data)

      const config = { "Content-Type": "multipart/form-data" }
      setSpin(true)
      const response = await registerUser(data, config)
      console.log("response after submit ==>", response)
      if (response?.status === 201) {
        setInputData({ ...inputData, fname: "", lname: "", email: "", mobile: "", gender: "", location: "" })
        setSpin(false)

        // context
        setUserAdd(response?.data)
        setStatus("")
        setImage("")
        navigate("/")
      } else {
        toast.error(response?.response?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (image) {
      //  The URL.createObjectURL()  allows you to create a temporary URL from a Blob(image,file etc)
      //  can be used in any place  (such as an href,src attribute).
      setPreview(URL.createObjectURL(image))
    }
  }, [image])

  return (
    <>
    <div style={{ border: "0px dashed red" ,background:"#71797E",height:"100vh"}}>
      {/* header */}
      <Headers headerName="Register" />

      <ToastContainer />

      {/* container */}
      <div style={{ border: "0px dashed red" ,background:"#71797E"}} className="container mt-1 p-4">

        {/* heading */}
        <h2 className='text-center mt-1' style={{color:"white"}}>Register</h2>

        {/* card */}
        <Card style={{ border: "0px solid blue" }} className='shadow mt-3 p-3'>

          {/* profile pic */}
          <div className="profile_div text-center m-3">
            <img src={preview ? preview : "/vite.svg"} alt='img1' />
          </div>

          {/* form */}
          <Form>
            <Row style={{ border: "0px solid red" }}>

              {/* form group : groups more than one elements : label & control*/}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={inputData.fname} onChange={setInputValue} placeholder="Enter First Name" name='fname' />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={inputData.lname} onChange={setInputValue} placeholder="Enter Last Name" name='lname' />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={inputData.email} onChange={setInputValue} placeholder="Email" name='email' />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicMobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="number" value={inputData.mobile} onChange={setInputValue} placeholder="Mobile" name='mobile' />
              </Form.Group>


              {/* /
              The name attribute is used to reference elements in a JavaScript, or to reference form data after a form is submitted.
              Note: Only form elements with a name attribute will have their values passed when submitting a form.
               */}

              {/* gender */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicGender">
                <Form.Label>Select Your Gender :</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={"Male"}
                  name="gender"
                  value={"Male"}
                  onChange={setInputValue}
                // defaultChecked
                />
                {/* name should be same to make a group that is gender */}
                <Form.Check
                  type={"radio"}
                  // type={"checkbox"}
                  label={"Female"}
                  name={"gender"}
                  value={"Female"}
                  onChange={setInputValue}
                />
              </Form.Group>

              {/* status */}

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicStatus">
                <Form.Label>Select Your Status : {status}</Form.Label>
                <Select placeholder={status} options={options} value={status} onChange={setStatusValue} />
              </Form.Group>

              {/* image */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicProfile">
                <Form.Label>Select Your Profile Image</Form.Label>
                <Form.Control type="file" name="user_profile" onChange={setProfileImg} placeholder="Profile" />
              </Form.Group>

              {/* location */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control onChange={setInputValue} value={inputData.location} type="text" placeholder="Location" name="location" />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={submitUserData}>
                {spin ? <Spiner /> : "Submit"}
           
              </Button>


            </Row>
          </Form>
        </Card>
        {/* card ends*/}
      </div>
      {/* container ends*/}
      </div>
    </>
  )
}

export default Register