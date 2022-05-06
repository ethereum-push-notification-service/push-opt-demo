import React, { useState, useEffect } from 'react'
import { useWeb3React } from "@web3-react/core";
import { channels, OnSubscribeModal } from "@epnsproject/frontend-sdk-staging";
import ConnectButton from './connect';

/*
 * GLOBAL CONSTANTS
 */
// EPNS's API base url
const BASE_URL = "https://backend-kovan.epns.io/apis";

// You have to provide your "channel" address here
const CHANNEL_ADDRESS = "0x94c3016ef3e503774630fC71F59B8Da9f7D470B7"; // sample


/* Your App */
function App() {
  const { library, active, account, chainId } = useWeb3React();
  const [isSubscribed, setSubscribeStatus] = useState(false);
  const [channel, setChannel] = useState();
  const [showModal, setShowModal] = useState();

  const onClickHandler = (e) => {
    e.preventDefault();
    
    if (!isSubscribed) {
      channels.optIn(
        library.getSigner(account),
        CHANNEL_ADDRESS,
        chainId,
        account,
        {
          onSuccess: () => {
            console.log("channel opted in");
            setShowModal(true);
            setSubscribeStatus(true);
          }
        }
      );
    } else {
      channels.optOut(
        library.getSigner(account),
        CHANNEL_ADDRESS,
        chainId,
        account,
        {
          onSuccess: () => {
            console.log("channel opted out");
            setSubscribeStatus(false);
          }
        }
      );
    }
  };
  
  useEffect(() => {
    if (!account) return;

    // on page load, fetch channel details
    channels.getChannelByAddress(CHANNEL_ADDRESS, BASE_URL).then((channelData) => {
      setChannel(channelData);
    });
    // fetch if user is subscribed to channel
    channels.isUserSubscribed(account, CHANNEL_ADDRESS).then((status) => {
      setSubscribeStatus(status);
    });
  }, [account]);
  
  return (
    <div>
      <ConnectButton />

      {showModal && <OnSubscribeModal onClose={() => setShowModal(false)} />}

      {active ? (
        channel ? (
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              margin: 20
            }}>
              <p><b>Channel Address: </b>{CHANNEL_ADDRESS}</p>
            {
              isSubscribed ? (
                <button onClick={onClickHandler}>OPT-OUT</button>
              ) : (
                <button onClick={onClickHandler}>OPT-IN</button>
              )
            }
          </div>
        ) : (
          <div>No Channel Details</div>
        )
      ) : null}
    </div>
  );
}

export default App;