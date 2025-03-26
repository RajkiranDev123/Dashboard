import React, { useEffect, useRef, useState } from 'react'
import Headers from "../../components/Headers/Headers"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/esm/Row"
import "./profile.css"
import Spiner from '../../components/Spiner/Spiner'
import { useParams } from 'react-router-dom'


import { fetchSingleUser } from "../../services/ApiRequests"
import moment from "moment"


import downloadPdf from '../../utilities/downloadaspdf.js'
import QRCode from "react-qr-code"


const Profile = () => {
  const [userProfile, setUserProfile] = useState({})
  const [showSpin, setShowSpin] = useState(true)
  const { id } = useParams()

  const pdfRef = useRef()

  const getUserProfile = async () => {
    const response = await fetchSingleUser(id)
    if (response?.status == 200) {
      setUserProfile(response?.data)
    } else {
      console.log("error")
    }
  }

  const val = {
    mobile: userProfile?.mobile,
    email: userProfile?.email
  }

  useEffect(() => {
    getUserProfile()
    setTimeout(() => {
      setShowSpin(false)
    }, 1000)
  }, [])
  return (<>
    <Headers headerName="Profile" />

    {
      showSpin ? <Spiner /> :
        <div className="container mt-4 p-5 " style={{ border: "0px solid red" }}>

          <Card className='card-profile shadow col-lg-6 mx-auto mt-6 p-1 ' style={{ border: "0px solid blue" }}>
            <Card.Body ref={pdfRef} style={{ border: "1px dashed black" }}>

              {/* image */}
              <Row className='p-2' style={{ border: "0px solid green" }}>
                <div className="col" style={{ border: "0px solid yellow" }}>
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img width={25} height={25} style={{ borderRadius: "50%" }} src={userProfile?.profile} alt='img' />
                  </div>
                </div>
              </Row>

              {/* all info */}
              <div className='text-center mt-1' style={{ border: "0px solid red" }}>
                <h3>{userProfile?.fname}</h3>
                <h4><i className='fa-solid fa-envelope email'></i>&nbsp;{userProfile?.email}</h4>
                <h4><i className='fa-solid fa-phone phone'></i>&nbsp;{userProfile?.mobile}</h4>
                <h4><i className='fa-solid fa-person'></i>&nbsp;{userProfile?.gender}</h4>
                <h4><i className='fa-solid fa-location-pin location'></i>&nbsp;{userProfile?.location}</h4>
                <h4><i className='fa-solid fa-square-check phone'></i> <i className='fa-solid fa-xmark location'></i>&nbsp;Status : &nbsp;{userProfile?.status}</h4>
                <h4><i className='fa-solid fa-calendar'></i>&nbsp;Date Created : {moment(userProfile?.dateCreated).format("DD-MM-YY")}</h4>
                <h4><i className='fa-solid fa-calendar-days'></i>&nbsp;Date Updated :{moment(userProfile?.dateCreated).format("DD-MM-YY")}</h4>
                <div>
                  <QRCode style={{ height: 200, width: 200 }} value={`"name=${userProfile?.fname},email=${userProfile?.email}"`} />
                </div>
              </div>
            </Card.Body>


            <button onClick={() => downloadPdf(pdfRef)}
              style={{ display: "flex", justifyContent: "center", background: "blue", color: "white", marginTop: 2, border: "none" }}>
              Download as Pdf
            </button>

          </Card>
        </div>

    }
  </>
  )
}

export default Profile