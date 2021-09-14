import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">robcord</p>
    </div>
);

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
};

const customChannelMessageFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContent = ({ isCreating, setIsCreating, isEditing, setIsEditing, setCreateType, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove('token');
        cookies.remove('fullName');
        cookies.remove('userId');
        cookies.remove('phonremoveeNumber');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');

        window.location.reload();
    };

    const filters = { members: { $in: [client.userID] } }

    return (
        <>
            <SideBar logout={logout}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            type="team"  
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}                          
                        />

                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessageFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}       
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            type="messaging"    
                            setToggleContainer={setToggleContainer}     
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}            
                        />

                    )}
                />
            </div>
        </>
    )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer]  = useState(false);

    return (
        <>
            <div className="channel-list__container"
            
            >
                <ChannelListContent 
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}               
                />
            </div>
            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-86%", backgroundColor: "	#383838" }}
            >
                <ChannelListContent 
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing} 
                    setToggleContainer={setToggleContainer}              
                />
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                    {toggleContainer ? <i class="fas fa-arrow-circle-left"></i> : <i class="fas fa-arrow-right"></i>}
                </div>
            </div>
        </>
    );

}

export default ChannelListContainer