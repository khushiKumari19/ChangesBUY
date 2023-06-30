import { useState, useEffect } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import Layout from '../Layout';

const ERC20Token = require("./ERC20Token");
const { web3 } = require('../../Containers/Metamask/utils/ethereumAPI');
const web3Token = new web3.eth.Contract(ERC20Token.abi);

const ERC20MainMenu = ({ onClickCreate, importToken }) => {
    const [tokenAddress, setTokenAddress] = useState("");
    const [deployedContracts, setDeployedContracts] = useState([]);

    useEffect(() => {
        const fetchDeployedContracts = async () => {
            const accounts = await web3.eth.getAccounts();
            const blockNumber = await web3.eth.getBlockNumber();

            const pastEvents = await web3Token.getPastEvents('allEvents', {
                fromBlock: 0,
                toBlock: blockNumber
            });

            const deployedAddresses = pastEvents.map(event => {
                if (event.event === 'ContractDeployed') {
                    return event.returnValues.contractAddress;
                }
            }).filter(address => address !== undefined);
            console.log(deployedAddresses); // add this line


            setDeployedContracts(deployedAddresses);
        };

        fetchDeployedContracts();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() => onClickCreate()}
                >
                    Create token
                </Button>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Token address"
                    sx={{ m: 1, width: '50ch' }}
                    placeholder="0x"
                    size="small"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() => importToken(tokenAddress)}
                >
                    Import token
                </Button>
            </Grid>
            <Grid item xs={12}>
                <h4>Deployed Contracts:</h4>
                <ul>
                    {deployedContracts.map((address, index) => (
                        <li key={index}>{address}</li>
                    ))}
                </ul>
            </Grid>
        </Grid>
    )
}

export default ERC20MainMenu;
