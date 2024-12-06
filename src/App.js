import './App.css';

import {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { createAccount, addCustomerConfig } from './requests';
import { postCreateAccount, postAddCustomerConfig } from './axios';

function App() {

  const [stripeKey, setStripeKey] = useState('');
  const [accountId, setAccountId] = useState('');

  const [createAccountRequest, setCreateAccountRequest] = useState(JSON.stringify(createAccount, null, 2));
  const [createAccountResponse, setCreateAccountResponse] = useState({});

  const [addCustomerConfigRequest, setAddCustomerConfigRequest] = useState(JSON.stringify(addCustomerConfig, null, 2));
  const [addCustomerConfigResponse, setAddCustomerConfigResponse] = useState({});

  return (
    <div style={{
      padding: '3rem'
    }}>
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
      <div
        style={{whiteSpace: 'pre-wrap'}}
      >
        {JSON.stringify(createAccountResponse, null, 2)}
      </div>

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
        defaultValue={addCustomerConfigRequest}
        onChange={(event) => {
          setAddCustomerConfigRequest(event.target.value);
        }}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={async () => {
          const res = await postAddCustomerConfig(addCustomerConfigRequest, stripeKey, accountId);
          setAddCustomerConfigResponse(res);
        }}
      >
        Send
      </Button>
      <div
        style={{whiteSpace: 'pre-wrap'}}
      >
        {JSON.stringify(addCustomerConfigResponse, null, 2)}
      </div>
    </div>
  );
}

export default App;
