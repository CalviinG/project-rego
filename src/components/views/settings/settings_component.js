import React from 'react';
import _     from 'underscore';

// Rui
import {FormSelect, FormSlider, FormToggle} from '../../ui';

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
            '680 x 480',
            '720 x 576',
            '800 x 600',
            '1024 x 768',
            '1152 x 864',
            '1280 x 960',
            '1280 x 1024',
        ],
        [
            '1280 x 720',
            '1360 x 768',
            '1366 x 768',
            '1600 x 900',
            '1920 x 1080',
        ],
        [
            '720 x 480',
            '1280 x 768',
            '1280 x 800',
            '1600 x 1024',
            '1680 x 1050',
        ],
    ],
    refreshRateOptions: [
        '60 Hz',
        '75 Hz',
        '100 Hz',
        '120 Hz',
        '144 Hz',
    ],
    displayModeOptions: [
        'Windowed',
        'Fullscreen',
        'Windowed Fullscreen',
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
    // Misc.
    laptopPowerSavingsOptions: [
        'Off',
        'Half',
        'Full',
    ],
};

// Global Settings Data
const settingsData = {
    // Initial Values
    // - Starting values for each setting
    'initialValues': {
        // Video Settings
        'screen':   [0,1,4,3,1],
        'advanced': [3,0,0,3,1,0,0,0,1,0],
        'misc':     [0],
    },

    // Build Values
    // - Data for building the settings
    'buildValues': {
        // Video Settings
        'screen': [
            {
                key: 0,
                label: 'Brightness',
                type: 'slider',
                options: null,
                listensTo: false,

            },
            {
                key: 1,
                label: 'Aspect Ratio',
                type: 'select',
                options: settingsValues.aspectRatioOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Resolution',
                type: 'select',
                options: settingsValues.resolutionOptions[1],
                listensTo: {
                    name: 'Aspect Ratio',
                    type: 'change',
                },
            },
            {
                key: 3,
                label: 'Refresh Rate',
                type: 'select',
                options: settingsValues.refreshRateOptions,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Display Mode',
                type: 'select',
                options: settingsValues.displayModeOptions,
                listensTo: false,
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
                options: null,
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
                options: null,
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
                options: null,
                listensTo: false,
            },
        ],
        'misc': [
            {
                key: 0,
                label: 'Laptop Power Savings',
                type: 'select',
                options: settingsValues.laptopPowerSavingsOptions,
                listensTo: false,
            }
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
                if (setting.listensTo.type === 'change') {
                    _.each(settingsData.buildValues[view], (matchingSetting, i) => {
                        if (matchingSetting.label === setting.listensTo.name) {
                            const objValue = (this.state.newValues !== null)
                                ? this.state.newValues[i]
                                : this.state.initialValues[i];
                            options = settingsValues.resolutionOptions[objValue];
                        }
                    });
                } else if (setting.listensTo.type === '') {

                }
            } else {
                options = setting.options
            }

            // What setting type to render
            if (setting.type === 'select') {
                return <FormSelect {...settingProps} selectedOption={value} options={options} />;
            } else if (setting.type === 'toggle') {
                const enabled = (value === 0) ? false : true ;
                return <FormToggle {...settingProps} enabled={enabled} />
            } else if (setting.type === 'slider') {
                return <FormSlider {...settingProps} />
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
