import './App.css';

import {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { createAccount, addCustomerConfig, addMerchantConfig } from './requests';
import { postCreateAccount, postUpdateAccount, getAccount } from './axios';

import { ResponseAccordian } from './components/ResponseAccordian';

function App() {

  const [stripeKey, setStripeKey] = useState('');
  const [accountId, setAccountId] = useState('');

  const [createAccountRequest, setCreateAccountRequest] = useState(JSON.stringify(createAccount, null, 2));
  const [createAccountResponse, setCreateAccountResponse] = useState({});

  const [addCustomerConfigRequest, setAddCustomerConfigRequest] = useState(JSON.stringify(addCustomerConfig, null, 2));
  const [addCustomerConfigResponse, setAddCustomerConfigResponse] = useState({});

  const [addMerchantConfigRequest, setAddMerchantConfigRequest] = useState(JSON.stringify(addMerchantConfig, null, 2));
  const [addMerchantConfigResponse, setAddMerchantConfigResponse] = useState({});

  const [getAccountResponse, setGetAccountResponse] = useState({});

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
          const res = await postCreateAccount(createAccountRequest, stripeKey);
          setCreateAccountResponse(res);
          setAccountId(res.id);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={createAccountResponse}/>

      <h1>Update Account with Customer Config</h1>

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
          const res = await postUpdateAccount(addCustomerConfigRequest, stripeKey, accountId);
          setAddCustomerConfigResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={addCustomerConfigResponse}/>

      <h1>Update Account with Merchant Config</h1>

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
          const res = await postUpdateAccount(addMerchantConfigRequest, stripeKey, accountId);
          setAddMerchantConfigResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={addMerchantConfigResponse}/>

      <h1>Get Account Details</h1>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          const res = await getAccount(stripeKey, accountId);
          setGetAccountResponse(res);
        }}
      >
        Send
      </Button>
      <ResponseAccordian body={getAccountResponse}/>
    </div>
  );
}

export default App;
