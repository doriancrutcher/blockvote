import 'regenerator-runtime/runtime';
import React,{useState}from 'react';
import { login, logout, onSubmit, hello } from './utils';
import './global.css';
import Candidate from './Container/Candidate/Candidate';
import Navbar from './Components/Navbar/Navbar';
import Leslie from './assets/knope.jpeg';
import Ron from './assets/Ron.jpg'

import getConfig from './config'
import { async } from 'regenerator-runtime';
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  const [sayhello,sethello]=useState('not yet')
  // use React Hooks to store greeting in component state
  const [greeting, setGreeting] = React.useState()

  // when the user has not yet interacted with the form, disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // after submitting the form, we want to show Notification
  const [showNotification, setShowNotification] = React.useState(false)

  const [didVote,setDidVote]=useState(false)

  const [signIn,setSignIn]=React.useState(false)

  // The useEffect hook can be used to fire side-effects during render
  // Learn more: https://reactjs.org/docs/hooks-intro.html
  React.useEffect(
    () => {
      // in this case, we only care to query the contract when signed in
      if (window.walletConnection.isSignedIn()) {
      
      

        // window.contract is set by initContract in index.js
        window.contract.getGreeting({ accountId: window.accountId })
          .then(greetingFromContract => {
            setGreeting(greetingFromContract)
          })
      }
    },

    // The second argument to useEffect tells React when to re-run the effect
    // Use an empty array to specify "only run on first render"
    // This works because signing into NEAR Wallet reloads the page
    []
  )

  // if not signed in, return early with sign-in prompt
 
  const checkVoter=()=>{
    let voteStatus=false;
    window.contract.checkVote({voter:window.accountId})
    .then(res=>{
     setDidVote((res==="Did not vote")?false:true)
     console.log((res==="Did not vote")?false:true)
    
    })
   
  }

  checkVoter();

  // const testVote=()=>{
  //   window.contract.sendVote({candidate:'Ron',Voter:'Jeff'})
  // }

  // const testCount=()=>{
  //   window.contract.voteCount({name:'Ron'})
  //   .then(res=>{console.log(res)})
  // }
  

 
  const sendVoteToReg=(Name,Sender)=>{
    console.log(Name + Sender)
    window.contract.sendVote({candidate:Name,Voter:Sender})
  }


 const getVotes=(Person)=>{
  return window.contract.voteCount({name:Person})
 }



  return (
    <React.Fragment>
      <Navbar accName={window.accountId} signedIn={window.walletConnection.isSignedIn()}/>
      <div className="pollingBooth">
      <div className="Candidate">
        <Candidate 
        setCandidate={window.contract.initializeCandidate}
        voter={window.accountId} 
        checkVoter={didVote} 
        sendVote={sendVoteToReg} 
        signedIn={window.walletConnection.isSignedIn()} 
        Name="Leslie" Overview={<p>Waffles Forever</p>} 
        picture={Leslie}
        getTotal={getVotes}
        /></div>
      <div className="VotingTopic">{!didVote?'Which one is your favorite?':'Thanks for Voting!'}</div>
  <div className="Candidate">
        <Candidate 
      setCandidate={window.contract.initializeCandidate} 
      voter={window.accountId} checkVoter={didVote} 
      sendVote={sendVoteToReg} 
      signedIn={window.walletConnection.isSignedIn()} 
      Name="Ron" Overview={<p>Undermine the Government</p>} 
      picture={Ron}
      getTotal={getVotes}
      />
  </div>
      </div>
      
  
    </React.Fragment>
  )
}


