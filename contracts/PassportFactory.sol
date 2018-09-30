pragma solidity ^0.4.24;

contract PassportFactory {
    struct Passport{
        bytes32 name;
        bytes32 country;
        bytes32 passportNumber;
        uint256 birthday;
        bytes32 gender;
        bytes32 placeOfBirth;
        bytes32 issuingAuth;
        address passportOwner;
    }
    
    mapping(address => Passport) passports;

    function createPassport(
        bytes32 _name,
        bytes32 _country,
        bytes32 _passportNumber,
        uint256 _birthday,
        bytes32 _gender,
        bytes32 _placeOfBirth,
        bytes32 _issuingAuth) public {
        Passport memory passport = Passport(_name, _country, _passportNumber, _birthday, _gender, _placeOfBirth, _issuingAuth, msg.sender);
        passports[msg.sender] = passport;
    }
    function getPassportName(address _person) constant public returns (bytes32) {
        return passports[_person].name;
    }
    function getPassportCountry(address _person) constant public returns (bytes32) {
        return passports[_person].country;
    }    
    function getPassportNumber(address _person) constant public returns (bytes32) {
        return passports[_person].passportNumber;
    }        
    function getPassportBirthday(address _person) constant public returns (uint256) {
        return passports[_person].birthday;
    }   
    function getPassportGender(address _person) constant public returns (bytes32) {
        return passports[_person].gender;
    }                
    function getPassportOrigin(address _person) constant public returns (bytes32) {
        return passports[_person].placeOfBirth;
    }                    
    function getPassportIssuer(address _person) constant public returns (bytes32) {
        return passports[_person].issuingAuth;
    }                    
}