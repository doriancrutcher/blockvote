/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/roles/developer/contracts/assemblyscript
 *
 */

import { Context, logging, storage, PersistentMap } from "near-sdk-as";

const DEFAULT_MESSAGE = "Hello"

let votes= new PersistentMap<string,u64>("v:");
let voters=new PersistentMap<string,string>("s:")



// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/roles/developer/contracts/assemblyscript#imports
  return storage.get<string>(accountId, DEFAULT_MESSAGE);
}

export function setGreeting(message: string): void {
  const account_id = Context.sender;

  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    // String interpolation (`like ${this}`) is a work in progress:
    // https://github.com/AssemblyScript/assemblyscript/pull/1115
    'Saving greeting "' + message + '" for account "' + account_id + '"'
  );

  storage.set(account_id, message);
}


export function hello():string{
return('heyDorian')

}

// Initialize a New Candidate to be called in ComponentsdidMount
export function initializeCandidate(newCandidate:string):string{
  if(!votes.contains(newCandidate)){ 
    votes.set(newCandidate,0)
    return 'candidate set'
  }
  return 'candidate already in register'
}

// Initialize User 
export function initializeUser(User:string):void{
  if(!voters.contains(User)){
    voters.set(User,"didnotvote")
  }


  
} 

// Retreiving Number of votes for the specified Candidate
export function voteCount(name:string):u64{
  logging.log(name.toString()+" Vote Count");
  if(!votes.contains(name)){
    return 0
  }
  return votes.getSome(name);
}

//Sending vote to candidate user should only be counted once
export function sendVote(candidate:string,Voter:string):void{
  let tick:i32=1;
  logging.log(Voter)
  logging.log(voters.contains('Jeff').toString())
  if(!voters.contains(Voter)){
  let currentVotes=voteCount(candidate)
  logging.log('adding vote')
  votes.set(candidate,currentVotes+tick)
  voters.set(Voter,'did Vote')
  logging.log('Thank you for Voting!')
  logging.log("vote count at:"+voteCount(candidate).toString())
 
  }
  else{
    logging.log("you have already voted!")
  
  }
}

export function checkVote(voter:string):string{
  return (!voters.contains(voter))?'Did not vote':"voted"
}

