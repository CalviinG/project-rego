import React from 'react';
import _     from 'underscore';

// Rui
import {FormSelect, FormToggle} from '../../ui';

const array = ['a', 'b', 'c', 'd'];

// Setting Values
const settingsValues = {
    // Video Settings
    // Screen
    aspectRatioOptions: [
        'Normal 4:3',
        'Widescreen 16:9',
        'Widescreen 16:10',
    ],
    resolutionOptions: [
        [
            '680x480',
            '720x576',
            '800x600',
            '1024x768',
            '1152x864',
            '1280x960',
            '1280x1024',
        ],
        [
            '1280x720',
            '1360x768',
            '1366x768',
            '1600x900',
            '1920x1080',
        ],
        [
            '720x480',
            '1280x768',
            '1280x800',
            '1600x1024',
            '1680x1050',
        ],
    ],
    // Advanced
    qualityOptions: [
        'Low',
        'Medium',
        'High',
        'Very High',
    ],
    antiAliasingOptions: [
        'None',
        '2x MSAA',
        '4x MSAA',
        '8x MSAA',
    ],
    textureFilteringOptions: [
        'Bilinear',
        'Trilinear',
        'Anisotropic 2X',
        'Anisotropic 4X',
        'Anisotropic 8X',
        'Anisotropic 16X',
    ],
    verticalSyncOptions: [
        'Disabled',
        'Dubbled Buffered',
        'Tripple Buffered',
    ],
};

// Global Settings Data
const settingsData = {
    // Initial Values
    // - Starting values for each setting
    'initialValues': {
        // Video Settings
        'screen': [1,4],
        'advanced': [3,0,0,3,1,0,0,0,1,0],
        'misc': [],
    },

    // Build Values
    // - Data for building the settings
    'buildValues': {
        // Video Settings
        'screen': [
            {
                key: 0,
                label: 'Aspect Ratio',
                type: 'select',
                options: settingsValues.aspectRatioOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Resolution',
                type: 'select',
                options: settingsValues.resolutionOptions[1],
                listensTo: 'Aspect Ratio',
            },
        ],
        'advanced': [
            {
                key: 0,
                label: 'Global Shadow Quality',
                type: 'select',
                options: settingsValues.qualityOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Model / Texture Quality',
                type: 'select',
                options: settingsValues.qualityOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Effect Detail',
                type: 'select',
                options: settingsValues.qualityOptions,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Shader Detail',
                type: 'select',
                options: settingsValues.qualityOptions,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Multicore Rendering',
                type: 'toggle',
                options: array,
                listensTo: false,
            },
            {
                key: 5,
                label: 'Multisampling Anti-Aliasing Mode',
                type: 'select',
                options: settingsValues.antiAliasingOptions,
                listensTo: false,
            },
            {
                key: 6,
                label: 'Texture Filtering Mode',
                type: 'select',
                options: settingsValues.textureFilteringOptions,
                listensTo: false,
            },
            {
                key: 7,
                label: 'FXAA Anti-Aliasing',
                type: 'toggle',
                options: array,
                listensTo: false,
            },
            {
                key: 8,
                label: 'Wait For Vertical Sync',
                type: 'select',
                options: settingsValues.verticalSyncOptions,
                listensTo: false,
            },
            {
                key: 9,
                label: 'Motion Blur',
                type: 'toggle',
                options: array,
                listensTo: false,
            },
        ],
        'misc': [

        ],
    },
};

const VideoSettingsComponent = React.createClass({
    propTypes: {
        view: React.PropTypes.oneOf([
            // Video Settings
            'screen',
            'advanced',
            'misc',
        ]),
    },

    getInitialState() {
        return {
            initialValues: settingsData.initialValues[this.props.view],
            newValues: null,
        };
    },

    updateValues(type) {
        this.props.onChange(false);

        if (type === 'save' && this.state.newValues !== null) {
            this.setState({
                initialValues: this.state.newValues,
                newValues: null,
            });
        } else if (type === 'cancel') {
            this.setState({
                initialValues: this.state.initialValues,
                newValues: null,
            });
        }
    },

    _onChange(index, value) {
        const valuesToCheck = (this.state.newValues === null) ? this.state.initialValues : this.state.newValues ;
        let newValues = (JSON.parse(JSON.stringify(valuesToCheck)));;

        if (value === true) {
            newValues[index] = 1;
        } else if (value === false) {
            newValues[index] = 0;
        } else {
           newValues[index] = value;
        }

        let changesMade = false;
        _.each(newValues, (value, i) => {
            if (value !== this.state.initialValues[i]) {
                changesMade = true;
            }
        });

        this.props.onChange(changesMade);
        this.setState({ newValues: newValues });
    },

    render() {
        const view = this.props.view;
        const settingsToRender = _.map(settingsData.buildValues[view], (setting, index) => {
            // Base props
            const settingProps = {
                key: `${this.props.view}Key${index}`,
                label: setting.label,
                onChange: this._onChange.bind(this, index),
            };

            // Puts correct value
            const value = (this.state.newValues !== null)
                ? this.state.newValues[index]
                : this.state.initialValues[index];

            // Checks if one setting responds to another
            let options;
            if (setting.listensTo !== false) {
                _.each(settingsData.buildValues[view], (matchingSetting, i) => {
                    if (matchingSetting.label === setting.listensTo) {
                        const objValue = (this.state.newValues !== null)
                            ? this.state.newValues[i]
                            : this.state.initialValues[i];
                        options = settingsValues.resolutionOptions[objValue];
                    }
                });
            } else {
                options = setting.options
            }

            // What setting type to render
            if (setting.type === 'select') {
                return <FormSelect {...settingProps} selectedOption={value} options={options} />;
            } else if (setting.type === 'toggle') {
                const enabled = (value === 0) ? false : true ;
                return <FormToggle {...settingProps} enabled={enabled} />
            }
        });

        return (
            <div className='video-settings-wrapper'>
                {settingsToRender}
            </div>
        );
    },
});

export default VideoSettingsComponent;
