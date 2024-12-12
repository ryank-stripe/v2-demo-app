export const createProduct = {
    "name": "Pizza Party Platform Services"
}

export const setPrice = {
    "product": null,
    "unit_amount": 1000,
    "currency": "usd",
    "recurring[interval]": "month"
}

export const addPaymentMethod = {
    "customer": null,
    "payment_method": "pm_card_visa",
    "confirm": true,
    "automatic_payment_methods[enabled]": true,
    "automatic_payment_methods[allow_redirects]": "never"
}

export const addSubscription = {
    "customer": null,
    "items[0][price]": null,
    "default_payment_method": null
}

export const createAccount = {
    "display_name": "Acme",
    "contact_email": "contact@test.com",
    "identity": {
        "country": "us",
        "entity_type": "company"
    }
}

export const addCustomerConfig = {
    "include": [
        "configuration.customer"
    ],
    "configuration": {
        "customer": {}
    }
}

export const addMerchantConfig = {
    "include": [
        "identity","requirements"
    ],
    "configuration": {
        "merchant": {
            "features": {
                "card_payments": {
                    "requested": true
                }
            }
        }
    },
    "dashboard": "none",
    "defaults": {
        "responsibilities": {
            "fees_collector": "stripe",
            "losses_collector": "stripe"
        }
    }
}

export const addRecipientConfig = {
    "include": [
        "identity","requirements"
    ],
    "configuration": {
        "recipient": {
            "features": {
                "stripe_balance": {
                    "stripe_transfers": {
                        "requested": true
                    }
                }
            }
        }
    }
  }