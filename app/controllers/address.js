import AddressModel from "../models/address.js";
import _ from "lodash";
import { successObj, errorObj } from "../../utils/settings.js";


const exp = {
    add: (data) => {
        return new Promise(async (resolve) => {
            try {
                let newAddress = new AddressModel();
                _.each(data, (value, key) => {
                    newAddress[key] = value;
                });
                await newAddress.save();
                resolve({ ...successObj, data: newAddress, message: "Address added successfully" });
            } catch (error) {
                console.log(error)
                return resolve({ ...errorObj, message: error.message });
            }
        });
    }
};

export default exp;