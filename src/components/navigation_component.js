import React from 'react';

const NavigationComponent = React.createClass({
    propTypes: {
        links: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {
            selectedMainLink: 0,
            selectedSubLink: 0,
        };
    },

    render() {
        return (
            <div className='navigation'>
                <div className='navigation__main'>
                    Main
                </div>
                <div className='navigation__sub'>
                    Sub
                </div>
            </div>
        );
    },
});

export default NavigationComponent;