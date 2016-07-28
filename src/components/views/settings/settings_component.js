import React from 'react';
import _     from 'underscore';

// Rui
import {FormSelect, FormSlider, FormToggle, FormKeyInput} from '../../ui';

// Setting Values
const settingsValues = {
    //// In-Game Settings
    // Game
    maxPingOptions: {
        value: 75,
        min: 50,
        max: 500,
        interval: 5,
        decimals: 0,
    },
    steamNotificationLocationOptions: [
        'Top Left',
        'Top Right',
        'Bottom Left',
        'Bottom Right',
    ],
    csgoTwitchOptions: [
        'Only Steam Status',
        'Always Shared',
        'Disabled',
    ],
    // HUD
    hudScaleOptions: {
        value: 0.95,
        min: 0.50,
        max: 0.95,
        interval: 0.01,
        decimals: 2,
    },
    hudColorOptions: [
        'White',
        'Blue',
        'Purple',
        'Green',
        'Yellow',
        'Orange',
        'Red',
    ],
    healthAmmoOptions: [
        'Default',
        'Simple',
    ],
    bombHudPositionOptions: [
        'Show In Inventory',
        'Show Under Radar',
    ],
    miniScoreboardPositionOptions: [
        'Top of Screen',
        'Bottom of Screen',
    ],
    miniScoreboardStyleOptions: [
        'Show Avatars',
        'Show Player Count',
    ],
    scoreboardMouseEnableOptions: [
        'Secondary Fire',
        'Jump',
        'Duck',
        'Use',
        'Drop Weapon',
        'Last Weapon Used',
    ],
    // Crosshair
    crosshairStyleOptions: [
        'Default',
        'Classic',
        'Dynamic',
        'Static',
    ],
    crosshairAlphaOptions: {
        value: 255,
        min: 0,
        max: 255,
        interval: 1,
        decimals: 0,
    },
    crosshairThicknessOptions: {
        value: 1,
        min: 0,
        max: 100,
        interval: 0.5,
        decimals: 1,
    },
    crosshairSizeOptions: {
        value: 5,
        min: 0,
        max: 100,
        interval: 1,
        decimals: 0,
    },
    crosshairGapOptions: {
        value: 0,
        min: -100,
        max: 100,
        interval: 1,
        decimals: 0,
    },
    // Team
    teamTagOptions: [
        'No Team Tag',
        'Fnatic',
        'Liquid.HyperX',
    ],
    teamTagDeathNoticesOptions: [
        'No',
        'Yes',
        'Minified Tags',
    ],
    teamColorsCompetativeOptions: [
        'No',
        'Show Colors',
        'Colors and Letters',
    ],
    // Spectator
    spectatorMapVoteOptions: [
        'Use Number Keys',
        'Use Weapon Slots',
    ],
    spectatorCameraSpeedOptions: {
        value: 0.22,
        min: 0.05,
        max: 0.40,
        interval: 0.01,
        decimals: 2,
    },
    spectatorFollowGrendadeOptions: [
        'Left Alt',
        'Left Shift',
        'Reload Key',
    ],
    // Items
    itemsViewmodelPositionOptions: [
        'Desktop',
        'Couch',
        'Classic',
    ],
    // Radar
    radarHudSizeOptions: {
        value: 1.00,
        min: 0.80,
        max: 1.30,
        interval: 0.01,
        decimals: 2,
    },
    radarMapZoomOptions: {
        value: 0.55,
        min: 0.25,
        max: 1.00,
        interval: 0.05,
        decimals: 2,
    },
    //// Controls Settings
    // Keyboard
    // Mouse
    mouseHoldModeOptions: [
        'Hold',
        'Toggle',
    ],
    mouseSensitivityOptions: {
        value: 1.25,
        min: 0.00,
        max: 10.00,
        interval: 0.01,
        decimals: 2,
    },
    mouseZoomSensitivityOptions: {
        value: 1.00,
        min: 0.10,
        max: 1.00,
        interval: 0.01,
        decimals: 2,
    },
    mouseAccelerationOptions: {
        value: 0.01,
        min: 0.01,
        max: 10.00,
        interval: 0.01,
        decimals: 2,
    },
    // Binds
    //// Audio Settings
    // Sound
    audioOptions: {
        value: 0.65,
        min: 0.00,
        max: 1.00,
        interval: 0.01,
        decimals: 2,
    },
    speakerConfigurationOptions: [
        'Headphones',
        '2 Speakers',
        '4 Speakers',
        '5.1 Speakers',
    ],
    // Music
    //// Video Settings
    // Screen
    brightnessOptions: {
        value: 1.6,
        min: 1.6,
        max: 2.6,
        interval: 0.1,
        decimals: 1,
    },
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
        // In-Game Settings
        'game': [0,75,3,1,0],
        'hud': [0.95,0.75,3,0,1,0,1,0],
        'crosshair': [3,255,1,5,0,0],
        'team': [2,0,1],
        'spectator': [0,1,0.22,0,0,1],
        'items': [0,0,1,1,0],
        'radar': [1.00,0.55,0,1],
        // Controls Settings
        'keyboard': ['W','D','A','S','Shift','Space','Ctrl','Left Mouse','Right Mouse','R','Q','G','E','F','U','Y','B','Tab','1','2','3','4','5'],
        'mouse': [0,0,0,1.25,1.00,1,0,0.01],
        'binds': [],
        // Audio Settings
        'sound': [0.65,0.55,0,0.28,1,0],
        'music': [0.52,0.26,0.41,0.70,0.22,0.61,0.45,0.25],
        // Video Settings
        'screen':   [1.6,1,4,3,1],
        'advanced': [3,0,0,3,1,0,0,0,1,0],
        'misc':     [0],
    },

    // Build Values
    // - Data for building the settings
    'buildValues': {
        // In-Game Settings
        'game': [
            {
                key: 0,
                label: 'Game Instructor Messages',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Max Acceptable Matchmaking Ping',
                type: 'slider',
                options: settingsValues.maxPingOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Steam Notification Location',
                type: 'select',
                options: settingsValues.steamNotificationLocationOptions,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Developer Console',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 4,
                label: 'CS:GO & Twitch.tv Profile Sharing',
                type: 'select',
                options: settingsValues.csgoTwitchOptions,
                listensTo: false,
            },
        ],
        'hud': [
            {
                key: 0,
                label: 'HUD Scale',
                type: 'slider',
                options: settingsValues.hudScaleOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'HUD Transparancy',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'HUD Color',
                type: 'select',
                options: settingsValues.hudColorOptions,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Health/Ammo Style',
                type: 'select',
                options: settingsValues.healthAmmoOptions,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Bomb HUD Position',
                type: 'select',
                options: settingsValues.bombHudPositionOptions,
                listensTo: false,
            },
            {
                key: 5,
                label: 'Scoreboard Mouse Enable',
                type: 'select',
                options: settingsValues.scoreboardMouseEnableOptions,
                listensTo: false,
            },
            {
                key: 6,
                label: 'Mini-Scoreboard Position',
                type: 'select',
                options: settingsValues.miniScoreboardPositionOptions,
                listensTo: false,
            },
            {
                key: 7,
                label: 'Mini-Scoreboard Style',
                type: 'select',
                options: settingsValues.miniScoreboardStyleOptions,
                listensTo: false,
            },

        ],
        'crosshair': [
            {
                key: 0,
                label: 'Crosshair Style',
                type: 'select',
                options: settingsValues.crosshairStyleOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Crosshair Alpha',
                type: 'slider',
                options: settingsValues.crosshairAlphaOptions,
                listensTo: {
                    name: 'Crosshair Style',
                    type: 'block',
                    blockedByValue: 0,
                },
            },
            {
                key: 2,
                label: 'Crosshair Thickness',
                type: 'slider',
                options: settingsValues.crosshairThicknessOptions,
                listensTo: {
                    name: 'Crosshair Style',
                    type: 'block',
                    blockedByValue: 0,
                },
            },
            {
                key: 3,
                label: 'Crosshair Alpha',
                type: 'slider',
                options: settingsValues.crosshairSizeOptions,
                listensTo: false,
                listensTo: {
                    name: 'Crosshair Style',
                    type: 'block',
                    blockedByValue: 0,
                },
            },
            {
                key: 4,
                label: 'Crosshair Gap',
                type: 'slider',
                options: settingsValues.crosshairGapOptions,
                listensTo: false,
                listensTo: {
                    name: 'Crosshair Style',
                    type: 'block',
                    blockedByValue: 0,
                },
            },
            {
                key: 5,
                label: 'Crosshair Dot',
                type: 'toggle',
                options: null,
                listensTo: {
                    name: 'Crosshair Style',
                    type: 'block',
                    blockedByValue: 0,
                },
            },
        ],
        'team': [
            {
                key: 0,
                label: 'Team Tag (From Steam Groups)',
                type: 'select',
                options: settingsValues.teamTagOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Show Team Tags In Death Notices',
                type: 'select',
                options: settingsValues.teamTagDeathNoticesOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Show Teammate Colors In Competative',
                type: 'select',
                options: settingsValues.teamColorsCompetativeOptions,
                listensTo: false,
            },
        ],
        'spectator': [
            {
                key: 0,
                label: 'Spectator Map Vote Selection Method',
                type: 'select',
                options: settingsValues.spectatorMapVoteOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Smooth Spectator Camera',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Smooth Spectator Camera Speed',
                type: 'slider',
                options: settingsValues.spectatorCameraSpeedOptions,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Disable Caster Control On User Control',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Automatic Killer Replay',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 5,
                label: 'Follow Grenade Key',
                type: 'select',
                options: settingsValues.spectatorFollowGrendadeOptions,
                listensTo: false,
            },
        ],
        'items': [
            {
                key: 0,
                label: 'Switch Weapon On Pickup',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Viewmodel Position',
                type: 'select',
                options: settingsValues.itemsViewmodelPositionOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Always Show Inventory',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Close Buy Menu After Purchase',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Open Buy Menu With Use Key',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
        ],
        'radar': [
            {
                key: 0,
                label: 'Radar HUD Size',
                type: 'slider',
                options: settingsValues.radarHudSizeOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Radar Map Zoom',
                type: 'slider',
                options: settingsValues.radarMapZoomOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Rotate The Radar',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Toggle Shape With Scoreboard',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
        ],
        // Controls Settings
        'keyboard': [
            {
                key: 0,
                label: 'Move Forward',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Move Backward',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Move Left (Strafe)',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Move Right (Strafe)',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Walk',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 5,
                label: 'Jump',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 6,
                label: 'Duck',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 7,
                label: 'Fire',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 8,
                label: 'Secondary Fire',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 9,
                label: 'Reload',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 10,
                label: 'Last Weapon Used',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 11,
                label: 'Drop Weapon',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 12,
                label: 'Use',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 13,
                label: 'Inspect Weapon',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 14,
                label: 'Team Message',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 15,
                label: 'Chat Message',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 16,
                label: 'Buy Menu',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 17,
                label: 'Scoreboard',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 18,
                label: 'Primary Weapon',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 19,
                label: 'Secondary Weapon',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 20,
                label: 'Knife',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 21,
                label: 'Cycle Grenades',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
            {
                key: 22,
                label: 'Bomb',
                type: 'key-input',
                options: null,
                listensTo: false,
            },
        ],
        'mouse': [
            {
                key: 0,
                label: 'Reverse Mouse',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Duck Mode',
                type: 'select',
                options: settingsValues.mouseHoldModeOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Crouch Mode',
                type: 'select',
                options: settingsValues.mouseHoldModeOptions,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Mouse Sensitivity',
                type: 'slider',
                options: settingsValues.mouseSensitivityOptions,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Zoom Sensitivity',
                type: 'slider',
                options: settingsValues.mouseZoomSensitivityOptions,
                listensTo: false,
            },
            {
                key: 5,
                label: 'Raw Input',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 6,
                label: 'Mouse Acceleration',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 7,
                label: 'Acceleration Amount',
                type: 'slider',
                options: settingsValues.mouseAccelerationOptions,
                listensTo: {
                    name: 'Mouse Acceleration',
                    type: 'block',
                    blockedByValue: 0,
                },
            },
        ],
        'binds': [

        ],
        // Audio Settings
        'sound': [
            {
                key: 0,
                label: 'Master Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'GOTV Caster Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Speaker Configuration',
                type: 'select',
                options: settingsValues.speakerConfigurationOptions,
                listensTo: false,
            },
            {
                key: 3,
                label: 'VOIP Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Enable Voice In-Game',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Play Audio When Game In Background',
                type: 'toggle',
                options: null,
                listensTo: false,
            },
        ],
        'music': [
            {
                key: 0,
                label: 'Master Music Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 1,
                label: 'Main Menu Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 2,
                label: 'Round Start Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 3,
                label: 'Round End Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 4,
                label: 'Bomb/Hostage Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 5,
                label: 'Ten Second Warning Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 6,
                label: 'Death Camera Volume',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
            {
                key: 7,
                label: 'Music Volume In Steam Overlay',
                type: 'slider',
                options: settingsValues.audioOptions,
                listensTo: false,
            },
        ],
        // Video Settings
        'screen': [
            {
                key: 0,
                label: 'Brightness',
                type: 'slider',
                options: settingsValues.brightnessOptions,
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
            // In-Game Settings
            'game',
            'hud',
            'crosshair',
            'team',
            'spectator',
            'items',
            'radar',
            // Controls Settings
            'keyboard',
            'mouse',
            'binds',
            // Audio Settings
            'sound',
            'music',
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

        // Key-Input Component Fix
        // Check for multiple choices of same key
        if (this.props.view === 'keyboard') {
            let keyboardValues = undefined;
            _.each(newValues, (key, i) => {
                if (value === key && index !== i) {
                    keyboardValues = {
                        emptyKeyIndex: i, //This is the index of the component which have the inputed key
                        replacingKeyIndex: index, //This is the index of the new component with the matching key
                        replacingKeyValue: key, // The new value of the replacingKeyIndex
                    };
                }
            });

            if (keyboardValues !== undefined) {
                newValues[keyboardValues.emptyKeyIndex] = '';
                newValues[keyboardValues.replacingKeyIndex] = keyboardValues.replacingKeyValue;
            }
        }

        this.props.onChange(changesMade);
        this.setState({ newValues: newValues });
    },

    render() {
        const view = this.props.view;
        const settingsToRender = _.map(settingsData.buildValues[view], (setting, index) => {
            // Base props
            let settingProps = {
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
                } else if (setting.listensTo.type === 'block') {
                    options = setting.options;
                    _.each(settingsData.buildValues[view], (matchingSetting, i) => {
                        if (matchingSetting.label === setting.listensTo.name) {
                            const objValue = (this.state.newValues !== null)
                                ? this.state.newValues[i]
                                : this.state.initialValues[i];
                            if (objValue === setting.listensTo.blockedByValue) {
                                settingProps.disabled = true;
                            }
                        }
                    });
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
                options.value = (this.state.newValues !== null)
                    ? this.state.newValues[index]
                    : this.state.initialValues[index];
                return <FormSlider {...settingProps} {...options} />
            } else if (setting.type === 'key-input') {
                return <FormKeyInput {...settingProps} input={value} />
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
