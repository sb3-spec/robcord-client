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

const checkIfInGeneral = async () => {

    try {
        const general = await client.getChannelById('team', 'general');

        const isIn = await general.queryMembers({ "name" : cookies.get('username')});

        if(isIn.members.length === 0) {
            const adding = await general.addMembers([cookies.get('userId')]);
        }
    } catch (error) {
        console.log(error);
    }
}


if(authToken) {
    client.connectUser({    
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        id: cookies.get('userId'),
        phoneNumber: cookies.get('phoneNumber'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
    }, authToken);

    checkIfInGeneral();
}







const App = () => {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState('');
    const [isEditing, setIsEditing] = useState('');
    const [toggleContainer, setToggleContainer] = useState(false);

    if(!authToken) return <Auth /> 

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team dark">
                <ChannelListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setCreateType={setCreateType}
                    setToggleContainer={setToggleContainer}
                    toggleContainer={toggleContainer}
                />
                <ChannelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                    setCreateType={setCreateType}
                    setToggleContainer={setToggleContainer}
                    toggleContainer={toggleContainer}
                />
            </Chat>
        </div>
    );
}

export default App;
