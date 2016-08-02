import React from 'react';

// Json
import Users from '../../../json/users.json';

// Components
import AnimationHolder          from '../../common/animation_holder.js';
import UserProfileCardComponent from '../../common/user_profile_card_component.js';

const HomeView = React.createClass({
    render() {
        const mainUser = Users[0];
        console.log('mainUser', mainUser);

        return (
            <div className='home-view'>
                <div className='home-view-left-column'>
                    <AnimationHolder zIndex={0}>
                        <UserProfileCardComponent userData={mainUser} />
                    </AnimationHolder>
                </div>
                <div className='home-view-right-column'>
                </div>
            </div>
        );
    },
});

export default HomeView;
