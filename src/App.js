import './App.css';

import {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { createAccount, addCustomerConfig, addMerchantConfig, addRecipientConfig, createProduct, setPrice, addPaymentMethod, addSubscription, createEntireAccount } from './requests';
import { postCreateAccount, postUpdateAccount, getAccount, deleteAccount, postProduct, postPrice, postPaymentMethod, postSubscription } from './axios';

import { ResponseAccordian } from './components/ResponseAccordian';

function App() {

  const [stripeKey, setStripeKey] = useState('');
  const [accountId, setAccountId] = useState('');
  const [productId, setProductId] = useState('');
  const [priceId, setPriceId] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');

  const [createProductRequest, setCreateProductRequest] = useState(JSON.stringify(createProduct, null, 2));
  const [createProductResponse, setCreateProductResponse] = useState();

  const [createPriceRequest, setCreatePriceRequest] = useState(null);
  const [createPriceResponse, setCreatePriceResponse] = useState();

  const [createAccountRequest, setCreateAccountRequest] = useState(JSON.stringify(createAccount, null, 2));
  const [createAccountResponse, setCreateAccountResponse] = useState();

  const [addCustomerConfigRequest, setAddCustomerConfigRequest] = useState(JSON.stringify(addCustomerConfig, null, 2));
  const [addCustomerConfigResponse, setAddCustomerConfigResponse] = useState();

  const [createPaymentMethodRequest, setCreatePaymentMethodRequest] = useState(null);
  const [createPaymentMethodResponse, setCreatePaymentMethodResponse] = useState();

  const [createSubscriptionRequest, setCreateSubscriptionRequest] = useState(null);
  const [createSubscriptionResponse, setCreateSubscriptionResponse] = useState();

  const [addMerchantConfigRequest, setAddMerchantConfigRequest] = useState(JSON.stringify(addMerchantConfig, null, 2));
  const [addMerchantConfigResponse, setAddMerchantConfigResponse] = useState();

  const [getAccountResponse, setGetAccountResponse] = useState();

  const [addRecipientConfigRequest, setAddRecipientConfigRequest] = useState(JSON.stringify(addRecipientConfig, null, 2));
  const [addRecipientConfigResponse, setAddRecipientConfigResponse] = useState();

  const [createEntireAccountRequest, setCreateEntireAccountRequest] = useState(JSON.stringify(createEntireAccount, null, 2));
  const [createEntireAccountResponse, setCreateEntireAccountResponse] = useState();

  const [deleteAccountResponse, setDeleteAccountResponse] = useState();

  return (
    <div style={{
      padding: '3rem'
    }}>
      <h1>Enter your Stripe Secret Key from Sandbox</h1>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        value={stripeKey}
        onChange={(event) => {
          setStripeKey(event.target.value);
        }}
      />

      <h1>Create your subscriptions product</h1>
      <h2>Create your product</h2>
      <h4>POST https://api.stripe.com/v1/products</h4>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={5}
        defaultValue={createProductRequest}
        onChange={(event) => {
          setCreateProductRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setCreateProductResponse(null);
          const res = await postProduct(createProductRequest, stripeKey);
          setCreateProductResponse(res);
          setProductId(res.id);

          setPrice['product'] = res.id;
          setCreatePriceRequest(JSON.stringify({...setPrice}, null, 2));          
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={createProductResponse}/>
      
      <h2>Your New Product's ID</h2>
      <h4>Auto-set after product creation</h4>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        value={productId}
        onChange={(event) => {
          setProductId(event.target.value);
        }}
      />

      <h2>Set a recurring price for it</h2>
      <h4>POST https://api.stripe.com/v1/prices</h4>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={10}
        defaultValue={createPriceRequest}
        onChange={(event) => {
          setCreatePriceRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setCreatePriceResponse(null);
          const res = await postPrice(createPriceRequest, stripeKey);
          setCreatePriceResponse(res);
          setPriceId(res.id);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={createPriceResponse}/>

      <h2>Your New Price ID</h2>
      <h4>Auto-set after price creation</h4>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        value={priceId}
        onChange={(event) => {
          setPriceId(event.target.value);
        }}
      />

      <h1>Create your first account</h1>
      <h2>Create an account</h2>
      <h4>POST https://api.stripe.com/v2/core/accounts</h4>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={15}
        defaultValue={createAccountRequest}
        onChange={(event) => {
          setCreateAccountRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setCreateAccountResponse(null);
          const res = await postCreateAccount(createAccountRequest, stripeKey);
          setCreateAccountResponse(res);
          setAccountId(res.id);

          addPaymentMethod['customer'] = res.id;
          setCreatePaymentMethodRequest(JSON.stringify({...addPaymentMethod}, null, 2));          
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={createAccountResponse}/>
      
      <h2>Your New Account's ID</h2>
      <h4>Auto-set after account creation</h4>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        value={accountId}
        onChange={(event) => {
          setAccountId(event.target.value);
        }}
      />

      <h2>Get Account Details</h2>
      <h4>{`GET https://api.stripe.com/v2/core/accounts/${accountId}`}</h4>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setGetAccountResponse(null);
          const res = await getAccount(stripeKey, accountId);
          setGetAccountResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={getAccountResponse}/>

      <h2>Add a customer configuration to Slice o’ Pie</h2>
      <h4>{`POST https://api.stripe.com/v2/core/accounts/${accountId}`}</h4>

      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={15}
        style={{
          marginTop: '2rem'
        }}
        defaultValue={addCustomerConfigRequest}
        onChange={(event) => {
          setAddCustomerConfigRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setAddCustomerConfigResponse(null);
          const res = await postUpdateAccount(addCustomerConfigRequest, stripeKey, accountId);
          setAddCustomerConfigResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={addCustomerConfigResponse}/>

      <h2>Bill Slice o’ Pie for subscriptions</h2>
      <h4>POST https://api.stripe.com/v1/setup_intents</h4>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={10}
        defaultValue={createPaymentMethodRequest}
        onChange={(event) => {
          setCreatePaymentMethodRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setCreatePaymentMethodResponse(null);
          const res = await postPaymentMethod(createPaymentMethodRequest, stripeKey);
          setCreatePaymentMethodResponse(res);
          setPaymentMethodId(res.payment_method);

          addSubscription["customer"] = accountId;
          addSubscription["items[0][price]"] = priceId;
          addSubscription["default_payment_method"] = res.payment_method;
          setCreateSubscriptionRequest(JSON.stringify({...addSubscription}, null, 2));
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={createPaymentMethodResponse}/>

      <h2>Your New Payment Method ID</h2>
      <h4>Auto-set after payment method creation</h4>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        value={paymentMethodId}
        onChange={(event) => {
          setPaymentMethodId(event.target.value);
        }}
      />

      <h2>Attach Subscription to Slice o’ Pie</h2>
      <h4>POST https://api.stripe.com/v1/subscriptions</h4>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={10}
        defaultValue={createSubscriptionRequest}
        onChange={(event) => {
          setCreateSubscriptionRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setCreateSubscriptionResponse(null);
          const res = await postSubscription(createSubscriptionRequest, stripeKey);
          setCreateSubscriptionResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={createSubscriptionResponse}/>

      <h2>Update Account with Merchant Config</h2>
      <h4>{`POST https://api.stripe.com/v2/core/accounts/${accountId}`}</h4>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={30}
        style={{
          marginTop: '2rem'
        }}
        defaultValue={addMerchantConfigRequest}
        onChange={(event) => {
          setAddMerchantConfigRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setAddMerchantConfigResponse(null);
          const res = await postUpdateAccount(addMerchantConfigRequest, stripeKey, accountId);
          setAddMerchantConfigResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={addMerchantConfigResponse}/>

      <h2>Update Account with Recipient Config</h2>
      <h4>{`POST https://api.stripe.com/v2/core/accounts/${accountId}`}</h4>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={30}
        style={{
          marginTop: '2rem'
        }}
        defaultValue={addRecipientConfigRequest}
        onChange={(event) => {
          setAddRecipientConfigRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setAddRecipientConfigResponse(null);
          const res = await postUpdateAccount(addRecipientConfigRequest, stripeKey, accountId);
          setAddRecipientConfigResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={addRecipientConfigResponse}/>

      <h2>Create an Account v2 with a customer and merchant configuration in one call</h2>
      <h4>POST https://api.stripe.com/v2/core/accounts</h4>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        rows={45}
        defaultValue={createEntireAccountRequest}
        onChange={(event) => {
          setCreateEntireAccountRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setCreateEntireAccountResponse(null);
          const res = await postCreateAccount(createEntireAccountRequest, stripeKey);
          setCreateEntireAccountResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={createEntireAccountResponse}/>
    </div>
  );
}

export default App;
