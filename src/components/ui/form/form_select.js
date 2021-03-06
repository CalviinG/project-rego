import React      from 'react';
import ReactDOM   from 'react-dom';
import _          from 'underscore';
import $          from 'jquery';
import classNames from 'classnames';

import FormBase from './form_base.js';

const FormSelect = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        selectedOption: React.PropTypes.number,
        disabled: React.PropTypes.bool,
    },

    getInitialState() {
        return {
            showOptions: false,
            selectedOptionIndex: this.props.selectedOption,
            selectedOptionLabel: this.props.options[0],
        };
    },

    getDefaultProps() {
        return {
            selectedOption: null,
        };
    },

    componentWillReceiveProps(newProps) {
        const selectValue = (newProps.selectedOption > newProps.options.length)
            ? newProps.options.length - 1
            : newProps.selectedOption ;

        this.setState({
            selectedOptionIndex: selectValue,
            selectedOptionLabel: this.props.options[selectValue],
        });
    },

    componentWillUnmount() {
        window.removeEventListener('mousedown', this._checkClick);
    },

    _onMouseDown() {
        this.mouseIsDownOnComponent = true;
    },

    _onMouseUp() {
        this.mouseIsDownOnComponent = false;
    },

    _checkClick(event) {
        window.removeEventListener('mousedown', this._checkClick);

        if (this.mouseIsDownOnComponent) {
            return;
        }

        this._selectOption(this.state.selectedOptionIndex);
    },

    _selectOption(index) {
        const $options = $(this.refs.optionsRef);
        $options.css({ height: 0 });

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(index);
        }

        this.setState({
            showOptions: false,
            selectedOptionIndex: index,
            selectedOptionLabel: this.props.options[index],
        });
    },

    _showOptions() {
        const $options = $(this.refs.optionsRef);

        $options.css({
            height: (this.props.options.length * 40) + 10, // 10 is parent padding
        });

        window.addEventListener('mousedown', this._checkClick);

        this.setState({ showOptions: true });
    },

    render() {
        const label = (this.props.selectedOption)
            ? this.props.options[this.state.selectedOptionIndex]
            : this.state.selectedOptionLabel ;

        const options = _.map(this.props.options, (option, index) => {
            return (
                <div key={'Option' + index} className='option-button' onClick={this._selectOption.bind(this, index)}>{option}</div>
            );
        });

        const parentClass = classNames('rui-form-select', {
            'options-is-showing': this.state.showOptions,
        });

        return (
            <FormBase label={this.props.label} disabled={this.props.disabled}>
                <div className={parentClass} onMouseDown={this._onMouseDown} onMouseUp={this._onMouseUp}>
                    <div className='select-label' onClick={this._showOptions}>
                        <p className='label-text'>{label}</p>
                        <i className='label-icon fa fa-chevron-down' />
                    </div>
                    <div className='select-options' ref='optionsRef'>
                        {options}
                    </div>
                </div>
            </FormBase>
        );
    },
});

export default FormSelect;
