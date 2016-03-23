import React      from 'react';
import _          from 'underscore';
import classNames from 'classnames';

const NavigationComponent = React.createClass({
    propTypes: {
        linksData:  React.PropTypes.array.isRequired,
        activeMain: React.PropTypes.number.isRequired,
        activeSub:  React.PropTypes.number.isRequired,
    },

    getInitialState() {
        return {
            activeMain: this.props.activeMain,
            activeSub: this.props.activeSub,
        };
    },

    _onMainClick(index) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange('main', index);
        }

        this.setState({
            activeMain: index,
            activeSub: 0,
        });
    },

    _onSubClick(index) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange('sub', index);
        }

        this.setState({ activeSub: index });
    },

    render() {
        const mainLinks = _(this.props.linksData).map((key, value) => {
            const mainClass = classNames('main-link', {
                'active-link': (value === this.state.activeMain),
            });
            return <p className={mainClass} key={value} onClick={this._onMainClick.bind(this, value)}>{key[0]}</p>;
        });

        let subLinks = null;
        _(this.props.linksData).map((key, value) => {
            if (value === this.state.activeMain) {
                subLinks = _(key).map((value, index) => {
                    if (index > 0) {
                        const subClass = classNames('sub-link', {
                            'active-link': ((index - 1) === this.state.activeSub),
                        });
                        return <p className={subClass} key={index} onClick={this._onSubClick.bind(this, (index - 1))}>{value}</p>;
                    }  
                });
            }
            
        });

        return (
            <div className='navigation'>
                <div className='navigation__main'>
                    <i className='fa fa-angle-left' />
                    <i className='fa fa-angle-right' />
                    <i className='fa fa-steam' />
                    {mainLinks}
                    <i className='fa fa-sign-out' />
                </div>
                <div className='navigation__sub'>
                    {subLinks}
                </div>
            </div>
        );
    },
});

export default NavigationComponent;