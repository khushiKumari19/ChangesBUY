import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInitialData } from '../../Action/initialData.action'
import Layout from '../../Components/Layout'
import { generatePublicUrl } from '../../UrlConfig'
import { Col, Container, Row, Table } from "react-bootstrap";
import { Button } from '@mui/material'
import Modal from '../../Components/UI/Modal'
import './style.css'
const CarsPage = () => {
  const [productDetails,setProductDetails] = useState(null)
    const [productDetailModal,setProductDetailModal] = useState(false)
  const dispatch = useDispatch()
    const car = useSelector((state)=>state.car)
    useEffect(()=>{
      dispatch(getInitialData())
    },[])
    console.log('in file',car)
    


    const handleCloseProductDetailsModals = () => {
    setProductDetailModal(false)
  }

    const showProductDetailsModal=(c)=>{
      setProductDetails(c);
      setProductDetailModal(true)
    }

    const renderProductDetailsModal = () => {
      if(!productDetails){
        return null
      }
      return(
        
        <Modal
          show={productDetailModal}
          handleClose={handleCloseProductDetailsModals}
          modalTitle={'Car Details'}
          size='lg'
        >
          <Row>
            <Col md="6">
              <label className="key">Name</label>
              <p className="value">{productDetails.name}</p>
            </Col>
            <Col md="6">
              <label className="key">Company</label>
              <p className="value">{productDetails.company}</p>
            </Col>
            <Col md="6">
              <label className="key">Country</label>
              <p className="value">{productDetails.country}</p>
            </Col>
            <Col md="6">
              <label className="key">Model</label>
              <p className="value">{productDetails.model}</p>
            </Col>
            <Col md="6">
              <label className="key">Engine</label>
              <p className="value">{productDetails.engine}</p>
            </Col>
            <Col md="6">
              <label className="key">Feul Type</label>
              <p className="value">{productDetails.feulType}</p>
            </Col>
            <Col md="6">
              <label className="key">Token Price</label>
              <p className="value">{productDetails.tokenPrice}</p>
            </Col>
            <Col md="6">
              <label className="key">Total Price</label>
              <p className="value">{productDetails.totalPrice}</p>
            </Col>
            <Col md="6">
              <label className="key">Token Hash</label>
              <p className="value">{productDetails.contractHash}</p>
            </Col>
          </Row>
          <Row>
          <Col md="12">
              <label className="key">Description</label>
              <p className="value">{productDetails.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
            <label className="key">Product Pictures</label>
              <div  style={{display: 'flex'}}>
              {
                productDetails.carPictures.map(picture=> (
                  <div className="productImgContainer">
                    <img src={generatePublicUrl(picture.img)} />
                  </div>
                ))
              }
              </div>
            </Col>  
          </Row>
        </Modal>
      )
    }

  return (
    <Layout sidebar>

      <Table style={{fontSize: '16px'}} responsive="sm">
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Company Name</th>
            <th>Token Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {
            car.cars.length > 0 ? car.cars.map((c)=>(
              <tr  onClick={()=> showProductDetailsModal(c)} key={c._id}>
                <td>{c.name}</td>
                <td>{c.company}</td>
                <td>{c.tokenPrice}</td>
                <td>{c.totalPrice}</td>
              </tr>
            )) : null
          }
        </tbody>
      </Table>
          {renderProductDetailsModal()}
        {/* {car.cars.length > 0 ? car.cars.map((c)=>(
          
          <>
          <h1>{c.name}</h1>
          <h5>{c.color}</h5>
          <img src={generatePublicUrl(c.carPictures[0].img)}/>
          </>
        )):null} */}

    </Layout>
  )
}

export default CarsPage