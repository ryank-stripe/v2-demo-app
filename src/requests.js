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
    "display_name": "SliceOPie",
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
        "identity",
        "configuration.merchant",
        "requirements"
    ],
    "identity": {
      "business_details": {
        "registered_name": "SliceOPie"
      }
    },
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
        "identity",
        "configuration.recipient"
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

export const createEntireAccount = {
    "contact_email": "bestpizza@test.com",
    "display_name": "Best Pizza",
    "dashboard": "none",
    "identity": {
        "country": "US",
        "entity_type": "company",
        "business_details": {
          "registered_name": "Best Pizza"
        }
    },
    "configuration": {
        "customer": {
            "shipping": {
                "phone": "+12345678901",
                "name": "Best Pizza"
            }
        },
        "merchant": {
          "features" : {
            "card_payments": {
              "requested": true
            }
          }
       }
    },
    "defaults": {
        "currency": "usd",
        "responsibilities": {
            "fees_collector": "stripe",
            "losses_collector": "stripe"
        },
        "locales": [
            "en-US"
        ]
    },
    "include": [
        "configuration.customer",
        "configuration.merchant",
        "identity"
    ]
}
