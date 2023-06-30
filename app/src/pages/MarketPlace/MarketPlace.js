import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarDetailsById, getInitialData } from "../../Actions/Car.actions";
import Header from "../../components/Navbar/Navbar";
import { generatePublicUrl } from "../../urlConfig";
import { useParams, Link, NavLink } from "react-router-dom";
import "./style.css";
// 0xd6e477FF47094c142E7ca2d442BF2CE1Cbf215Df
const Web3 = require('web3');
const web3 = new Web3(window.ethereum);
const ERC20Token = require("../../Contracts/ERC20Token.json");

const MarketPlace = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const[totalSupply,setTotalSupply]= useState('');
  const [contractInstance, setContractInstance] = useState(null);
  const [contractNames, setContractNames] = useState({});

  const fetchContractDetails = async (contractHash) => {
    try {
      const contractInstance = new web3.eth.Contract(ERC20Token.abi, contractHash);
      const name = await contractInstance.methods.name().call();
      const symbol = await contractInstance.methods.symbol().call();
      const totalSupply = await contractInstance.methods.totalSupply().call();
      const remainingTokens = await contractInstance.methods.getRemainingTokens().call(); 
      console.log(name, symbol,totalSupply,remainingTokens);
      return {  name,
        symbol,
        totalSupply: totalSupply / 1000000000000000000,
        remainingTokens: remainingTokens / 1000000000000000000};
    } catch (error) {
      console.error('Error fetching contract details:', error);
      return null;
    }
  };

  const car = useSelector((state) => state.car);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeContract = async () => {
      try {
        // Fetch and store contract details
        const contractHashes = car.cars.map(c => c.contractHash);
        const contractDetails = {};
        for (const contractHash of contractHashes) {
          const details = await fetchContractDetails(contractHash);
          contractDetails[contractHash] = details;
        }
        setContractNames(contractDetails);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };
  
    initializeContract();
  }, [car.cars]);

  useEffect(() => {
    dispatch(getInitialData());
  }, []);

  return (
    <div className="marketplace-container">
      {car.cars.length > 0 ? (
        car.cars.map((c) => (
<Link to={`/car-detail/${c._id}?name=${contractNames[c.contractHash]?.name}&remainingTokens=${contractNames[c.contractHash]?.remainingTokens}`} key={c._id}>
            <div className="car-container">
              <div className="img-container">
                <img className="car-image" src={generatePublicUrl(c?.carPictures[0]?.img)} alt={c.name} />
              </div>
              <div className="car-details">
                <div className="name">
                  <b>{c.name}</b>
                </div>
                <div className="car-info">
                  <div className="cmp">
                    <b>Company:</b> {c.company}
                  </div>
                  <div className="price">
                    <b>Total Price:</b> ${c.totalPrice}
                  </div>
                  <div className="Cname">
                    <b>Token Name:</b> {contractNames[c.contractHash]?.name}
                    </div>
                    <div className="Csymb">
                    <b>Token Symbol:</b> {contractNames[c.contractHash]?.symbol}
                    </div>
                    <div className="Csymb">
                    <b>Remaining Tokens:</b> {contractNames[c.contractHash]?.remainingTokens}
                    </div>
                    <div className="supply">
                    <b>Total Supply:</b> {contractNames[c.contractHash]?.totalSupply}
                    </div>
                    <div className="token">
                    <b>Token Price:</b> ${c.totalPrice/contractNames[c.contractHash]?.totalSupply}
                  
                </div>
              </div>
            </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No cars found</p>
      )}
    </div>
  );
};

export default MarketPlace;
