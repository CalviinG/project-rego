import React from 'react';
import _     from 'underscore';

// Rui
import {FormSelect, FormToggle} from '../../../ui';

const VideoAdvancedComponent = React.createClass({
    getInitialState() {
        return {
            initialValues: [0,0,0,0,0],
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
        const aspectRatioOptions = [
            '4:3',
            '16:10',
            '16:9',
        ];

        const resolutionOptions = [
            [
                '4:3 A',
                '4:3 B',
            ],
            [
                '16:10 A',
                '16:10 B',
            ],
            [
                '16:9 A',
                '16:9 B',
            ],
        ];

        const displayModeOptions = [
            'Fullscreen',
            'Windowed Fullscreen',
            'Windowed',
        ];

        let optionValues = [
            { type: 'select', options: aspectRatioOptions, label: 'Aspect Ratio' },
            { type: 'select', options: aspectRatioOptions, label: 'Resolution' },
            { type: 'select', options: displayModeOptions, label: 'Display Mode' },
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