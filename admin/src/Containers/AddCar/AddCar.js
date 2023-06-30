import React from "react";
import Layout from "../../Components/Layout";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import "./style.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../../Action";
import { useLocation } from 'react-router-dom';


const AddCar = () => {
  const location = useLocation();
    const [carName,setCarName] = useState('')
  const [company,setCompany] = useState('')
  const [model,setModel] = useState('')
  const [country,setCountry] = useState('')
  const [color,setColor] = useState('')
  const [feulType,setFeulType] = useState('')
  const [engine,setEngine] = useState('')
  const [city,setCity] = useState('')
  const [noOfSeats,setNoOfSeats] = useState('')
  const [noOfDoors,setNoOfDoors] = useState('')
  const [totalPrice,setTotalPrice] = useState('')
  const [tokenPrice,setTokenPrice] = useState('')
  const [description,setDescription] = useState('')
  const [carPictures,setCarPictures] = useState('')
  const [token,setToken] = useState('')

  const searchParams = new URLSearchParams(location.search);
const tokenAddress = searchParams.get('tokenAddress');

  const car = useSelector((state)=>state.car)
  console.log(car)
  const dispatch = useDispatch()

  const handleCarPictures = (e) => {
    setCarPictures([...carPictures,e.target.files[0]])
  }

  const SubmitHandler = (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append("name",carName)
    form.append('company',company)
    form.append('model',model)
    form.append('country',country)
    form.append('color',color)
    form.append('feulType',feulType)
    form.append('engine',engine)
    form.append('city',city)
    form.append('noOfSeats',noOfSeats)
    form.append('noOfDoors',noOfDoors)
    form.append('totalPrice',totalPrice)
    form.append('tokenPrice',tokenPrice)
    form.append('description',description)
    form.append('tokenAddress',tokenAddress)
    for(let pic of carPictures){
      form.append('carPictures',pic)
    }
    dispatch(addCar(form))
  }

  return (
    <>
      <Layout sidebar>
        <form onSubmit={SubmitHandler}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>ADD CAR</h1>
          <div style={{ height: "300px", width: "70%" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Car Name"
                  variant="standard"
                  multiline
                  value={carName}
                  onChange={(e)=>setCarName(e.target.value)}
                />

                <TextField
                  id="standard-basic"
                  label="Company"
                  variant="standard"
                  multiline
                  value={company}
                  onChange={(e)=>setCompany(e.target.value)}
                />
               


                <TextField
                  id="standard-basic"
                  label="Model"
                  variant="standard"
                  multiline
                  value={model}
                  onChange={(e)=>setModel(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Country"
                  variant="standard"
                  multiline
                  value={country}
                  onChange={(e)=>setCountry(e.target.value)}
                />

                <TextField
                  id="standard-basic"
                  label="City"
                  variant="standard"
                  multiline
                  value={city}
                  onChange={(e)=>setCity(e.target.value)}
                />

                <TextField
                  id="standard-basic"
                  label="Engine"
                  variant="standard"
                  multiline
                  value={engine}
                  onChange={(e)=>setEngine(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Feul Type"
                  variant="standard"
                  multiline
                  value={feulType}
                  onChange={(e)=>setFeulType(e.target.value)}
                />

                <TextField
                  id="standard-basic"
                  label="Color"
                  variant="standard"
                  multiline
                  value={color}
                  onChange={(e)=>setColor(e.target.value)}
                />

                <TextField
                  id="standard-basic"
                  label="No of Seats"
                  variant="standard"
                  multiline
                  value={noOfSeats}
                  onChange={(e)=>setNoOfSeats(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="No of Doors"
                  variant="standard"
                  multiline
                  value={noOfDoors}
                  onChange={(e)=>setNoOfDoors(e.target.value)}
                />

                <TextField
                  id="standard-basic"
                  label="Total Price"
                  variant="standard"
                  multiline
                  value={totalPrice}
                  onChange={(e)=>setTotalPrice(e.target.value)}
                />

                <TextField
                  id="standard-basic"
                  label="Token Price"
                  variant="standard"
                  multiline
                  value={tokenPrice}
                  onChange={(e)=>setTokenPrice(e.target.value)}
                />
              </div>
              <TextField
                  id="standard-basic"
                  label="Token Address"
                  variant="standard"
                  multiline
                  style={{ width: "83.3%" }}
                  value={tokenAddress}
                  onChange={(e)=>setToken(e.target.value)}
                />
              <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                multiline
                style={{ width: "83.3%" }}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
              <br />
              {
                carPictures.length > 0 ?
                carPictures.map((pic,index)=>(
                  <div key={index}>{pic.name}</div>
                )) : null
              }
              <Input
                type="file"
                onChange={handleCarPictures}
                style={{ width: "83.3%", marginTop: "15px" }}
              />
              <br />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: "20px",
              width: "30%",
            }}
          >
            <div>
              <Button style={{ top:"3rem" , width: "120px" }} variant="outlined">
                Resert
              </Button>
            </div>
            <div>
              <Button type='submit' style={{  top:"3rem" ,width: "120px" }} variant="contained">
                Add
              </Button>
            </div>
          </div>
        </div>
        </form>
      </Layout>
    </>
  );
};

export default AddCar;
