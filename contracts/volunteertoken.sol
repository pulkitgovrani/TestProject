// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VolunteerToken is ERC20 {
    constructor() ERC20("VolunteerToken", "VLT") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // Initial supply to contract deployer
    }

    function rewardVolunteer(address volunteer, uint256 amount) public {
        _transfer(msg.sender, volunteer, amount);
    }
}
