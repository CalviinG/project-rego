import React from 'react';
import _     from 'underscore';

// Rui
import {FormSelect, FormToggle} from '../../../ui';

const VideoAdvancedComponent = React.createClass({
    getInitialState() {
        return {
            initialValues: [2,0,0,2,1,0,0,0,1,0],
            newValues: null,
        };
    },

    updateValues(type) {
        this.props.onChange(false);

        if (type === 'save') {
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
            optionValues[index].value = (this.state.newValues) 
                ? this.state.newValues[index]
                : this.state.initialValues[index];
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