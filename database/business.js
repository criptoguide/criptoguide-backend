
const { filter } = require("domutils");
const { response } = require("express");
const DB = require("./db.json");

const getAllBusinesses = (filterParams) => {

    try {

        let business = DB.businesses;
        if (filterParams.location) {
            return DB.businesses.filter((business) =>
                business.city.toLowerCase().includes(filterParams.location)
            );
        }
        //         if(filterParams.country) {


        //             return DB.businesses.filter((business) => 

        // //business.country.filter(business => business.toLowerCase().includes(filterParams.country))
        //             );
        //         }

        // Other if-statements will go here for different parameters


        if(filterParams.lang && filterParams.country) {
          
            return DB.businesses.filter((business) => {
            return {...business, }
            })

        }

        return business;
    } catch (error) {

        throw ({ status: 500, message: error })
    }

}

module.exports = { getAllBusinesses }