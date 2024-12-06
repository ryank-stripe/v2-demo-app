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

export const postAddCustomerConfig = async (body, token, accountId) => {
    return axios.post(`https://api.stripe.com/v2/core/accounts/${accountId}`, body, config(token))
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}