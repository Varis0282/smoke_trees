import UserModel from '../models/user.js';
import _ from 'lodash';
import { successObj, errorObj } from '../../utils/settings.js'
import moment from 'moment';
import { FilterTable } from '../../utils/table.js'
import dotenv from 'dotenv';
import addressCtrl from './address.js';
dotenv.config();

const exp = {
    add: (data) => {
        return new Promise(async (resolve) => {
            try {

                if (!data.name || !data.address) {
                    return resolve({ ...errorObj, message: 'Invalid data' });
                }

                let existingUser = await UserModel.findOne({ name: data.name.toLowerCase() });
                if (!existingUser) {
                    let newUser = new UserModel();
                    newUser.name = data.name.toLowerCase();
                    newUser.addresses = data.address;
                    await newUser.save();
                    await addressCtrl.add({ address: data.address, userId: newUser._id });
                    return resolve({ ...successObj, data: newUser, message: 'User added successfully' });
                } else {
                    // check if address already exists
                    let addressExists = existingUser.addresses.find(x => x === data.address);
                    if (addressExists) {
                        return resolve({ ...errorObj, message: 'Address already exists' });
                    }
                    existingUser.addresses = [...existingUser.addresses, data.address];
                    await existingUser.save();
                    return resolve({ ...successObj, data: existingUser, message: 'User added successfully' });
                }
            } catch (error) {
                console.log(error)
                return resolve({ ...errorObj, message: error.message });
            }
        });
    },
    list: (data) => {
        return new Promise(async (resolve) => {
            try {
                if (data?.createdAt && data?.createdAt?.length) {
                    data.createdAt = {
                        $gte: moment(data.createdAt[0]).toDate(),
                        $lt: moment(data.createdAt[1]).toDate()
                    }
                }
                if (data?.updatedAt && data?.updatedAt?.length) {
                    data.updatedAt = {
                        $gte: moment(data.updatedAt[0]).toDate(),
                        $lt: moment(data.updatedAt[1]).toDate()
                    }
                }
                let x = await FilterTable(UserModel, {
                    sortField: 'createdAt',
                    sortOrder: 'ascend',
                    ...data
                })
                return resolve(x);
            } catch (error) {
                console.log(error)
                return resolve({ ...errorObj, message: error.message });
            }
        });
    },
    delete: (data) => {
        return new Promise(async (resolve) => {
            try {
                if (!data._id) {
                    return resolve({ ...errorObj, message: 'Invalid data' });
                }
                await UserModel.findByIdAndDelete(data.id);
                return resolve({ ...successObj, message: 'User deleted successfully' });
            } catch (error) {
                console.log(error)
                return resolve({ ...errorObj, message: error.message });
            }
        })
    },
    update: (data) => {
        return new Promise(async (resolve) => {
            try {
                if (!data._id) {
                    return resolve({ ...errorObj, message: 'Invalid data' });
                }
                let user = await UserModel.findById(data._id);
                if (!user) {
                    return resolve({ ...errorObj, message: 'User not found' });
                }
                _.each(data, (value, key) => {
                    user[key] = value;
                });
                await user.save();
                return resolve({ ...successObj, data: user, message: 'User updated successfully' });
            } catch (error) {
                console.log(error)
                return resolve({ ...errorObj, message: error.message });
            }
        });
    }
}

export default exp;