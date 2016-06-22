import React from 'react';
import _     from 'underscore';

// Rui
import {FormSelect, FormToggle} from '../../../ui';

const VideoAdvancedComponent = React.createClass({
    getInitialState() {
        return {
            initialValues: [2,0,0,0,2,0,0,0,2,0],
            newValues: null,
        };
    },

    _onChange(index, value) {
        const valuesToCheck = (this.state.newValues === null) ? this.state.initialValues : this.state.newValues ;
        console.log('valuesToCheck', valuesToCheck);
        let newValues = (JSON.parse(JSON.stringify(valuesToCheck)));;
        newValues[index] = value;
        console.log('newValues    ', newValues);

        let changesMade = false;
        _.each(newValues, (value, i) => {
            if (value !== this.state.initialValues[i]) {
                changesMade = true;
            }
        });

        console.log('changesMade', changesMade);

        this.props.onChange(changesMade);

        this.setState({ newValues: newValues });
    },

    render() {
        const qualityOptions = [
            'Low',
            'Medium',
            'High',
        ];

        const antiAliasingOptions = [
            'None',
            'FXAA',
            '2x MSAA',
            '4x MSAA',
            '8x MSAA',
            '2x EQAA',
            '16xQ CSAA',
        ];

        const textureFilteringOptions = [
            'Bilinear',
            'Anisotropic 16X',
        ];

        const verticalSyncOptions = [
            'Disabled',
            'Tripple Buffered',
        ];

        let optionValues = [
            { type: 'select', options: qualityOptions, label: 'Global Shadow Quality' },
            { type: 'select', options: qualityOptions, label: 'Model / Texture Detail' },
            { type: 'select', options: qualityOptions, label: 'Effect Detail' },
            { type: 'select', options: qualityOptions, label: 'Shader Detail' },
            { type: 'toggle', options: false, label: 'Multicore Rendering' },
            { type: 'select', options: antiAliasingOptions, label: 'Multisampling Anti-Aliasing Mode' },
            { type: 'select', options: textureFilteringOptions, label: 'Texture Filtering Mode' },
            { type: 'toggle', options: false, label: 'FXAA Anti-Aliasing' },
            { type: 'select', options: verticalSyncOptions, label: 'Wait for Vertical Sync' },
            { type: 'toggle', options: false, label: 'Motion Blur' },
        ];

        const renderOptions = _.map(optionValues, (option, index) => {
            optionValues[index].value = this.state.initialValues[index];
            const v = optionValues[index];

            if (v.type === 'select') {
                return <FormSelect key={index} selectedOption={v.value} label={v.label} options={v.options} onChange={this._onChange.bind(this, index)} />
            } else if (v.type === 'toggle') {
                const enabled = (v.value === 0) ? false : true ; 
                return <FormToggle key={index} enabled={enabled} label={v.label} onChange={this._onChange.bind(this, index)} />
            }
        });

        return (
            <div className='video-advanced-wrapper'>
                {renderOptions}
            </div>
        );
    },
});

export default VideoAdvancedComponent;