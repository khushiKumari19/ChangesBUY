
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20Token {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    uint256 public remainingTokens;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => uint256) public tokensBought;
    mapping(address => mapping(uint256 => uint256)) public transactionHistory;
    uint256 public transactionCount;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event TokensBought(address indexed buyer, uint256 amount);
    event TokensSold(address indexed seller, uint256 amount);

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        remainingTokens = _totalSupply;
        balanceOf[msg.sender] = _totalSupply;
    }

    function transfer(address to, uint256 value) external returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");

        _transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool success) {
        allowance[msg.sender][spender] = value;

        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool success) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Not allowed to transfer");

        allowance[from][msg.sender] -= value;
        _transfer(from, to, value);

        return true;
    }

    function buyTokens(uint256 amount) external payable {
        uint256 tokenPrice = 1 ether; // Change the token price as per your requirement
        require(msg.value >= amount * tokenPrice, "Insufficient payment");
        require(remainingTokens >= amount, "Insufficient tokens");

        balanceOf[msg.sender] += amount;
        tokensBought[msg.sender] += amount;
        transactionHistory[msg.sender][transactionCount] = amount;
        transactionCount++;

        remainingTokens -= amount;

        emit TokensBought(msg.sender, amount);
    }

    function sellTokens(uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        balanceOf[msg.sender] -= amount;
        remainingTokens += amount;

        emit TokensSold(msg.sender, amount);
    }

    function getBalance(address account) external view returns (uint256) {
        return balanceOf[account];
    }

    function _transfer(
        address from,
        address to,
        uint256 value
    ) private {
        balanceOf[from] -= value;
        balanceOf[to] += value;

        emit Transfer(from, to, value);
    }

    function getRemainingTokens() external view returns (uint256) {
        return remainingTokens;
    }
}