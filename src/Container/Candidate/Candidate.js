import React, { Component } from 'react';
import './Candidate.css'


class Candidate extends Component {
    constructor(props){
        super(props)
        this.state={ 
            votes:'--',
           showButton:{
               disable:'false'

           },
           Voter:false

        }
    }

    sendOffVote=()=>{
        this.props.sendVote(this.props.Name,
                            this.props.voter)
    }

    initCandidate=()=>{
        this.props.setCandidate({newCandidate:this.props.Name})
        .then(
            res=>console.log(res)
        )
        .catch(console.log('Moving on'))
    }

    displayTotal=()=>{
        if(this.props.checkVoter){
            return {display:'flex'}
        }
        else{
            return {display:'none'}
        }
    }

    getVotes=()=>{
        this.props.getTotal(this.props.Name)
        .then(res=>
            this.setState({votes:res})
        )
    }

    componentDidMount(){
        this.getVotes();
    }


    render() {
     
       
        return (
            <React.Fragment>
            <div className="votingStation">
             <div className="pictureBackdrop">
                <div className="candidatePicture" >
                    <img src={this.props.picture}></img>
                </div>
            </div>
                <div>
                    <button onClick={this.sendOffVote} disabled={(!this.props.signedIn||this.props.checkVoter)} style={this.showButton}>Vote</button>
                </div>
                
                <div className="posistionOverview">
                        {this.props.Overview} 
                </div>
                <div  style={this.displayTotal()} className="voteTotal">{this.state.votes}</div>
                </div>
                
                
         </React.Fragment>
        );
    }
}

export default Candidate;