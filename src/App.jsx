import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";

import "./App.css";
import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();

const apikey = "sz5svk84tkxs";

const client = StreamChat.getInstance(apikey);

const authToken = cookies.get("token");

if(authToken) {
    client.connectUser({    
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        id: cookies.get('userId'),
        phoneNumber: cookies.get('phoneNumber'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken);
}

const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState('');
    const [isEditing, setIsEditing] = useState('');

    if(!authToken) return <Auth />
    
    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                    setCreateType={setCreateType}
                />
            </Chat>
        </div>
    );
}

export default App;
