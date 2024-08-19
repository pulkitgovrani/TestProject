// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VolunteerVerification {
    struct Volunteer {
        uint256 totalHours;
        mapping(address => uint256) projectHours;
    }

    mapping(address => Volunteer) public volunteers;

    function recordVolunteerHours(address volunteer, uint256 hours, address project) public {
        volunteers[volunteer].totalHours += hours;
        volunteers[volunteer].projectHours[project] += hours;
    }

    function getVolunteerHours(address volunteer, address project) public view returns (uint256) {
        return volunteers[volunteer].projectHours[project];
    }

    function getTotalVolunteerHours(address volunteer) public view returns (uint256) {
        return volunteers[volunteer].totalHours;
    }
}
