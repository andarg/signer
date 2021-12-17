import SigningContainer from '../container/SigningContainer';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Pages from './Pages';
import { Button, withStyles } from '@material-ui/core';
import { truncateString } from '../../background/utils';
import PopupContainer from '../container/PopupContainer';

const ApproveButton = withStyles(() => ({
  root: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(11, 156, 49, 0.6)'
    }
  }
}))(Button);

const CancelButton = withStyles(() => ({
  root: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'rgba(255, 0, 0, 0.6)'
    }
  }
}))(Button);

interface Props {
  signingContainer: SigningContainer;
  popupContainer: PopupContainer;
}

export const SignMessagePage = (props: Props) => {
  const messageWithID = props.signingContainer.messageToSign;

  return messageWithID ? (
    <div>
      <h2>Do you want to sign the message?</h2>
      <br />
      <b>
        <code>Casper Message:</code>
      </b>
      <div
        style={{
          padding: '.1rem .5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          fontSize: '1rem'
        }}
      >
        <p>{messageWithID.messageString}</p>
      </div>
      <br />
      <b>
        <code>Signing Key:</code>
      </b>
      <div
        style={{
          padding: '.1rem .5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          fontSize: '0.9rem'
        }}
      >
        <p>{truncateString(messageWithID.signingKey, 15, 15)}</p>
      </div>
      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-evenly'
        }}
      >
        <ApproveButton
          variant="outlined"
          onClick={async () => {
            await props.signingContainer.approveSigningMessage(
              messageWithID.id
            );
            await props.popupContainer.callClosePopup();
          }}
        >
          Approve
        </ApproveButton>
        <CancelButton
          variant="outlined"
          onClick={async () => {
            await props.signingContainer.cancelSigningMessage(messageWithID.id);
            await props.popupContainer.callClosePopup();
          }}
        >
          Cancel
        </CancelButton>
      </div>
    </div>
  ) : (
    <Redirect to={Pages.Home} />
  );
};
