import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import "./edit.css"

// forms 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
// react-select
import Select from "react-select"
//notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Headers from "../../components/Headers/Headers"
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSingleUser, editUser } from '../../services/ApiRequests';
import { BASE_URL } from '../../services/ApiEndPoints';
import { updateData } from "../../components/context/contextProvider"



const Edit = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { update, setUpdate } = useContext(updateData)
  // set the value of context here and used in home




  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""

  })

  const [status, setStatus] = useState("Active")
  const [image, setImage] = useState("")
  const [preview, setPreview] = useState("")

  const [imgData, setImgData] = useState("")




  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },

  ]

  const setInputValue = (e) => {
    // console.log("e =>",e)
    const { name, value } = e.target
    //name => fname 
    //[name] is fname
    setInputData({ ...inputData, [name]: value })
    console.log(inputData)


  }

  // console.log(inputData) //dont use it here otherwise it will output if you set image or status

  //status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  const setProfileImg = (e) => {
    console.log("img=>", e.target.files[0])

    setImage(e.target.files[0])
  }


  const submitUserData = async (e) => {
    e.preventDefault()
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
      toast.error("gender is required!")
    } else if (status == "") {
      toast.error("status is required!")
    } else if (location == "") {
      toast.error("Location is required!")
    } else if (image == "" && imgData == "") {
      toast.error("Image is required!")
    } else {
      // toast.success("Registration Success")
      const data = new FormData()
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      data.append("user_profile", image || imgData)
      data.append("location", location)
      console.log("data", data)
      const config = {
        "Content-Type": "multipart/form-data"
      }
      const response = await editUser(id, data, config)
      if (response.status == 200) {
        setUpdate(response.data)
        navigate("/")
      }
    }

  }



  const getUserData = async () => {
    const response = await fetchSingleUser(id)

    if (response.status == 200) {
      setInputData(response.data)
      setStatus(response.data.status)
      setImgData(response.data.profile)
    } else {
      console.log("error")
    }
  }

  useEffect(() => {
    getUserData()
    // new ue because while changing image  it will disturb the edited data by calling getUserdata()


  }, [])

  useEffect(() => {
    // instead of putting this in ue you can create a function to put the below logic when uploading image
    if (image) {
      setImgData("")
      let uri = URL.createObjectURL(image)
      console.log(uri)
      setPreview(URL.createObjectURL(image))
    }

  }, [image])

  return (
    <>
      <Headers headerName="Edit & Update" />

      <div style={{ border: "0px dashed red" }} className="container mt-1 p-2">
        <h2 className='text-center mt-1'>Edit & Update</h2>

        <Card style={{ border: "0px solid blue" }} className='shadow mt-3 p-3'>

          <div className="profile_div text-center">
            <img width={25} height={25} src={preview ? preview : `${BASE_URL}/${imgData}`} alt='img1' />
          </div>

          <Form>
            <Row>
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

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicGender">
                <Form.Label>Select Your Gender</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={"Male"}
                  name="gender"
                  value={"Male"}
                  onChange={setInputValue}
                  checked={inputData.gender == "Male" ? true : false}

                />
                <Form.Check
                  type={"radio"}
                  label={"Female"}
                  name="gender"
                  value={"Female"}
                  onChange={setInputValue}
                  checked={inputData.gender == "Female" ? true : false}


                />


              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicStatus">
                <Form.Label>Select Your Status : {status}</Form.Label>
                <Select options={options} value={status} onChange={setStatusValue} />


              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicProfile">
                <Form.Label>Select Your Profile Image</Form.Label>
                <Form.Control type="file" name="user_profile" onChange={setProfileImg} placeholder="Profile" />



              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control onChange={setInputValue} value={inputData.location} type="text" placeholder="Location" name="location" />



              </Form.Group>

              <Button variant="primary" type="submit" onClick={submitUserData}>
                Submit
              </Button>

            </Row>

          </Form>

        </Card>
        <ToastContainer />


      </div>


    </>
  )
}

export default Edit