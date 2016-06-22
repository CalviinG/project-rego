import React      from 'react';
import $          from 'jquery';
import _          from 'underscore';
import classNames from 'classnames';

// Common Components
import AnimationHolder from './animation_holder.js';
import ScrollHolder    from './scroll_holder.js';

// Rui Components
import {FormButton} from '../ui';

const SettingsHolder = React.createClass({
    propTypes: {
        labels: React.PropTypes.array.isRequired,
    },
    
    getInitialState() {
        return {
            selectedLabel: 0,
        };
    },

    getDefaultProps() {
        return {
            changesMade: false,
        };
    },

    _buildLabels(labels) {
        return _.map(labels, (button, index) => {
            const labelClass = classNames('label-button', {
                'is-selected': index === this.state.selectedLabel,
            });

            return (
                <div key={button.label + '_LabelKey' + index} className={labelClass} onClick={this._changeLabel.bind(this, index)}>
                    <div className='button-icon'><i className={'label-icon fa ' + button.icon} /></div>
                    <div className='button-label'>{button.label}</div>
                </div>
            );
        });
    },

    _buildBlocks(blocks) {

    },

    _changeLabel(index) {
        if (index !== this.state.selectedLabel) {
            this.setState({ selectedLabel: index });
        }
    },

    render() {
        // Labels
        const labels = this._buildLabels(this.props.labels);

        // Label highlighter positioning
        const highlighterStyle = ({ transform: `translate(0px, ${this.state.selectedLabel * 60}px)` });

        // Blocks
        const blocks = _.map(this.props.labels, (label, index) => {
            const blockClass = classNames('holder-block', {
                'is-active': index === this.state.selectedLabel,
            });

            // Positioning the blocks correct
            const heightValue = window.innerHeight - 160;
            const blockStyle = ({ transform: `translate(0px, ${(index * heightValue) - (this.state.selectedLabel * heightValue)}px)` }); 

            return (
                <div key={'LabelBlock' + index} className={blockClass} style={blockStyle}>
                    <ScrollHolder>
                    {label.block}
                    </ScrollHolder>
                </div>
            );
        });

        return (
            <div className='settings-holder-wrapper'>
                <div className='left-settings-labels'>
                    {labels}
                    <div className='label-highlighter' style={highlighterStyle} />
                </div>
                <div className='middle-settings-divider' />
                <div className='right-settings-holder'>
                    <div className='blocks-holder'>
                        {blocks}
                    </div>
                    <div className='holder-action-buttons'>
                        <FormButton disabled={!this.props.changesMade} label='Cancel' />
                        <FormButton disabled={!this.props.changesMade} primary label='Save Changes' />
                    </div>
                </div>
            </div>
        );
    },
});

export default SettingsHolder;