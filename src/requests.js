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