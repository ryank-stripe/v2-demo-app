import './App.css';

import {useState} from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { createAccount } from './requests';
import { postCreateAccount } from './axios';

function App() {

  const [stripeKey, updateStripeKey] = useState('');

  const [createAccountRequest, setCreateAccountRequest] = useState(JSON.stringify(createAccount, null, 2));
  const [createAccountResponse, setCreateAccountResponse] = useState({});

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
          updateStripeKey(event.target.value);
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
        }}
      >
        Send
      </Button>
      <div
        style={{whiteSpace: 'pre-wrap'}}
      >
        {JSON.stringify(createAccountResponse, null, 2)}
      </div>
    </div>
  );
}

export default App;
