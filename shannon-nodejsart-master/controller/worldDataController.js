let Country = require('country-state-city').Country;
let State = require('country-state-city').State;
let City = require('country-state-city').City;

exports.getAllStatesCities = function (req, res, next) {

    let state = []
    State.getAllStates().map((val,ind)=>{
        state.push(val.name) 
    })
    
    let city = []
    City.getAllCities().map((val,ind)=>{
        city.push(val.name)
    })

    res.json({
        data:{
            city,
            state
        }
    })
};