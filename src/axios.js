import axios from 'axios';
import qs from 'qs';

const config = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Stripe-Version': 'unsafe-development',
            'Authorization': `Bearer ${token}`
        }
    }
}

const configUrlEncode = (token) => {
    return {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    }
}

export const postProduct = async (body, token) => {
    return axios.post('https://api.stripe.com/v1/products', qs.stringify(JSON.parse(body)), configUrlEncode(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const postPrice = async (body, token) => {
    return axios.post('https://api.stripe.com/v1/prices', qs.stringify(JSON.parse(body)), configUrlEncode(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const postPaymentMethod = async (body, token) => {
    return axios.post('https://api.stripe.com/v1/setup_intents', qs.stringify(JSON.parse(body)), configUrlEncode(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const postSubscription = async (body, token) => {
    return axios.post('https://api.stripe.com/v1/subscriptions', qs.stringify(JSON.parse(body)), configUrlEncode(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const postCreateAccount = async (body, token) => {
    return axios.post('https://api.stripe.com/v2/core/accounts', body, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const getAccount = async (token, accountId) => {
    return axios.get(`https://api.stripe.com/v2/core/accounts/${accountId}?include=requirements&include=configuration.merchant&include=configuration.recipient&include=configuration.customer&include=requirements`, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const postUpdateAccount = async (body, token, accountId) => {
    return axios.post(`https://api.stripe.com/v2/core/accounts/${accountId}`, body, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}

export const deleteAccount = async (token, accountId) => {
    return axios.post(`https://api.stripe.com/v2/core/accounts/${accountId}/close`, {}, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response.data;
        });
}