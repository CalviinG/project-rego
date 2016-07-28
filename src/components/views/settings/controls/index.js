import React from 'react';

// Components
import SettingsComponent from '../settings_component.js';

// Common Components
import AnimationHolder from '../../../common/animation_holder.js';
import SettingsHolder  from '../../../common/settings_holder.js';

const ControlsView = React.createClass({
    getInitialState() {
        return {
            changesMade: false,
        };
    },

    // This function runs when a value is changed in SettingsComponent
    _onChange(value) {
        this.setState({ changesMade: value });
    },

    // This function runs when you press 'Cancel' or 'Save Changes'
    _onEdit(type) {
        this.refs.keyboard.updateValues(type);
        this.refs.mouse.updateValues(type);
        this.refs.binds.updateValues(type);
    },

    render() {
        const settingsLabels = [
            {
                label: 'Keyboard',
                icon: 'fa-keyboard-o',
                block: <SettingsComponent ref='keyboard' view='keyboard' onChange={this._onChange} />,
            },
            {
                label: 'Mouse',
                icon: 'fa-mouse-pointer',
                block: <SettingsComponent ref='mouse' view='mouse' onChange={this._onChange} />,
            },
            {
                label: 'Binds',
                icon: 'fa-terminal',
                block: <SettingsComponent ref='binds' view='binds' onChange={this._onChange} />,
            },
        ];

        return (
            <div className='settings-view'>
                <AnimationHolder>
                    <SettingsHolder labels={settingsLabels} changesMade={this.state.changesMade} onEdit={this._onEdit} />
                </AnimationHolder>
            </div>
        );
    },
});

export default ControlsView;
