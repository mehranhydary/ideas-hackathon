pragma solidity ^0.4.24;
import "./PassportFactory.sol";


contract TravelEntryFactory is PassportFactory {
    struct TravelHistory {
        bytes32 location;
        uint256 entryDate;
        uint256 exitDate;
        address issuingAuth;
    }

    mapping (bytes32 => TravelHistory[]) travels;
    
    function createTravelHistory (
        bytes32 _location,
        uint256 _entryDate,
        address _traveller) public {
        TravelHistory memory travelHistory = TravelHistory(_location, _entryDate, 0, msg.sender);
        travels[passports[_traveller].passportNumber].push(travelHistory);
    }

    function updateTravelHistory (
        uint256 _exitDate,
        address _traveller) public {
        travels[passports[_traveller].passportNumber][travels[passports[_traveller].passportNumber].length - 1].exitDate = _exitDate;   
    }
}