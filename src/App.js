import './App.css';

import {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { createAccount, addCustomerConfig, addMerchantConfig, addRecipientConfig } from './requests';
import { postCreateAccount, postUpdateAccount, getAccount, deleteAccount } from './axios';

import { ResponseAccordian } from './components/ResponseAccordian';

function App() {

  const [stripeKey, setStripeKey] = useState('');
  const [accountId, setAccountId] = useState('');

  const [createAccountRequest, setCreateAccountRequest] = useState(JSON.stringify(createAccount, null, 2));
  const [createAccountResponse, setCreateAccountResponse] = useState();

  const [addCustomerConfigRequest, setAddCustomerConfigRequest] = useState(JSON.stringify(addCustomerConfig, null, 2));
  const [addCustomerConfigResponse, setAddCustomerConfigResponse] = useState();

  const [addMerchantConfigRequest, setAddMerchantConfigRequest] = useState(JSON.stringify(addMerchantConfig, null, 2));
  const [addMerchantConfigResponse, setAddMerchantConfigResponse] = useState();

  const [getAccountResponse, setGetAccountResponse] = useState();

  const [addRecipientConfigRequest, setAddRecipientConfigRequest] = useState(JSON.stringify(addRecipientConfig, null, 2));
  const [addRecipientConfigResponse, setAddRecipientConfigResponse] = useState();

  const [deleteAccountResponse, setDeleteAccountResponse] = useState();

  return (
    <div style={{
      padding: '3rem'
    }}>
      <h1>Enter your Stripe Secret Key from Sandbox</h1>
      <TextField
        id="outlined-basic"
        label="Stripe Key"
        variant="outlined"
        fullWidth
        value={stripeKey}
        onChange={(event) => {
          setStripeKey(event.target.value);
        }}
      />

      <h1>Create your first account</h1>
      <h4>POST https://api.stripe.com/v2/core/accounts</h4>
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
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
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={createAccountResponse}/>

      <h1>Get Account Details</h1>
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

      <h1>Update Account with Customer Config</h1>
      <h4>{`POST https://api.stripe.com/v2/core/accounts/${accountId}`}</h4>
      <TextField
        id="outlined-basic"
        label="Stripe Account ID"
        variant="outlined"
        fullWidth
        value={accountId}
        onChange={(event) => {
          setAccountId(event.target.value);
        }}
      />

      <TextField
        id="outlined-multiline-static"
        label="Multiline"
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

      <h1>Update Account with Merchant Config</h1>
      <h4>{`POST https://api.stripe.com/v2/core/accounts/${accountId}`}</h4>
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
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

      <h1>Update Account with Recipient Config</h1>
      <h4>{`POST https://api.stripe.com/v2/core/accounts/${accountId}`}</h4>
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
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

      <h1>Delete Account</h1>
      <h4>{`POST https://api.stripe.com/v2/core/accounts/${accountId}/close`}</h4>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          setDeleteAccountResponse(null);
          const res = await deleteAccount(stripeKey, accountId);
          setDeleteAccountResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={deleteAccountResponse}/>
    </div>
  );
}

export default App;
