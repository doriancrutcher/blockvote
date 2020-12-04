import React, { Component } from 'react';
import './global.css'

function  Polls() {
        return (
            <div>
                <Navbar accName={window.accountId} signedIn={window.walletConnection.isSignedIn()}/>
            </div>
        );

}

export default Polls;