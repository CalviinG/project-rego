import React from 'react';

// Json
import Teams from '../../../json/teams.json';

// Components
import AnimationHolder          from '../../common/animation_holder.js';
import UserProfileCardComponent from '../../common/user_profile_card_component.js';
import FriendListCardComponent  from '../../common/friend_list_card_component.js';
import BulletinCardComponent    from '../../common/bulletin_card_component.js';

const HomeView = React.createClass({
    propTypes: {
        users: React.PropTypes.object.isRequired,
    },

    render() {
        const users = this.props.users;

        return (
            <div className='home-view'>
                <div className='home-view-left-column'>
                    <AnimationHolder>
                        <UserProfileCardComponent userData={users.mainUser} />
                    </AnimationHolder>
                    <AnimationHolder height='calc(100% - 320px)'>
                        <FriendListCardComponent friends={users.friends} />
                    </AnimationHolder>
                </div>
                <div className='home-view-middle-column'>
                    <AnimationHolder>
                        <BulletinCardComponent />
                    </AnimationHolder>
                </div>
                <div className='home-view-right-column'>
                </div>
            </div>
        );
    },
});

export default HomeView;
