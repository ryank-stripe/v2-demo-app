import axios from 'axios';

const config = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Stripe-Version': 'unsafe-development',
            'Authorization': `Bearer ${token}`
        }
    }
}

export const postCreateAccount = async (body, token) => {
    return axios.post('https://api.stripe.com/v2/core/accounts', body, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getAccount = async (token, accountId) => {
    return axios.get(`https://api.stripe.com/v2/core/accounts/${accountId}?include=requirements&include=configuration.merchant&include=configuration.recipient&include=configuration.customer&include=requirements`, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const postUpdateAccount = async (body, token, accountId) => {
    return axios.post(`https://api.stripe.com/v2/core/accounts/${accountId}`, body, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const deleteAccount = async (token, accountId) => {
    return axios.post(`https://api.stripe.com/v2/core/accounts/${accountId}/close`, {}, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}