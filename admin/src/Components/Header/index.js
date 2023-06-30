// import React from "react";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, NavLink } from "react-router-dom";
// import { signout } from "../../Action/Auth.actions";


// const Header = () => {

//   const dispatch = useDispatch()
//   const auth = useSelector((state)=>state.auth)

//   const logout = ()=>{
//     dispatch(signout())
//   }

  
//   const renderNonLoggedInLinks = () => {
//     return (
//       <Nav>
//         <li className="nav-item">
//           <NavLink to="/signin" className="nav-link">
//             Signin
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink to="/signup" className="nav-link">
//             Signup
//           </NavLink>
//         </li>
//       </Nav>
//     );
//   };

// const renderLoggeInLinks=()=>{
//   return(
//     <Nav>
//       <li className="nav-item">
//           <span className="nav-link" onClick={logout}>
//             Signout
//           </span>
//         </li>
//     </Nav>
//   )
// }

//   return (
//     <>
//       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
//         <Container>
//           <Link className="navbar-brand" to="/">CarT Admin Dashboard</Link>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="me-auto"></Nav>
//             {auth.authenticate ? renderLoggeInLinks() : renderNonLoggedInLinks()}
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default Header;

import {useState,useEffect} from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signout } from "../../Action/Auth.actions";
import './Header.css'

const Header = () => {

  const dispatch = useDispatch()
  const auth = useSelector((state)=>state.auth)

  
  const logout = ()=>{
    dispatch(signout())
  }

  const [walletAddress, setWalletAddress] = useState("");

  
  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);
  
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };
  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };


  
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };

const renderLoggeInLinks=()=>{
  return(
    <Nav>
      <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
        </li>
    </Nav>
  )
}

const renderConnectedButton = () => {
  return(
    <Nav className='nname'>
      <Nav>
      <li className="nav-item">
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
        </li>
    </Nav>
      <NavDropdown color='black' title={`Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}`} 
        id="collasible-nav-dropdown">
        <NavDropdown.Item>
          <NavLink className="non" to="/dashboard">
            Dashboard
          </NavLink>
          <Nav>
            <li className="nav-item">
                <span className="nav-link" onClick={logout}>
                  Signout
                </span>
              </li>
          </Nav>
        </NavDropdown.Item>
        
        <NavDropdown.Divider />
        <NavDropdown.Item>Disconnect</NavDropdown.Item>
        
      </NavDropdown>
    </Nav>
  )
}

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
        <Container>
          <Link className="navbar-brand" to="/">CarT Admin Dashboard</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {/* {auth.authenticate ? renderLoggeInLinks() : renderNonLoggedInLinks()} */}
            {auth.authenticate ? 
            <Nav>
                <button onClick={connectWallet}><span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? renderConnectedButton()
                    : "Connect Wallet"}
                </span></button>
              </Nav>
              : renderNonLoggedInLinks()
              }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
