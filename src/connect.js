import { useEffect } from "react"
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from "@web3-react/core"


const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})

const wrapperStyles = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: 20
};


const ConnectButton = () => {
  const { active, account, activate, deactivate } = useWeb3React()


  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem('isWalletConnected', true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', false)
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [activate]);

  return (
    <div style={wrapperStyles}>
      <button onClick={connect}>Connect to MetaMask</button>
      {active ? <p>Connected with <b>{account}</b></p> : <p>Not connected</p>}
      <button onClick={disconnect}>Disconnect</button>
    </div>
  )
};

export default ConnectButton;

