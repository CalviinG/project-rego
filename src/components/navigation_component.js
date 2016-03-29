import React      from 'react';
import _          from 'underscore';
import $          from 'jquery';
import classNames from 'classnames';

const NavigationComponent = React.createClass({
    propTypes: {
        linksData:  React.PropTypes.array.isRequired,
        activeMain: React.PropTypes.number.isRequired,
        activeSub:  React.PropTypes.number.isRequired,
    },

    getInitialState() {
        return {
            activeMain: 0,
            activeSub: 0,
        };
    },

    componentWillReceiveProps() {
        console.log('componentWillRecieveProps');
        console.log('this.props.activeMain', this.props.activeMain);
        console.log('this.state.activeMain', this.state.activeMain);
        if (this.props.activeMain != this.state.activeMain) {
            console.log('new main');
            this.setState({ activeMain: this.props.activeMain });
        }
        if (this.props.activeSub != this.state.activeSub) {
            console.log('new sub');
            this.setState({ activeSub: this.props.activeSub });
        }
    },

    componentDidUpdate() {
        this._animateSubLinks(); 
    },

    _animateSubLinks() {
        console.log('activeMain', this.state.activeMain);
        console.log('activeSub', this.state.activeSub);
        console.log('/////////////////////');

        let showingSubrefs = this.props.linksData[this.props.activeMain].length - 1;
        let $animateRef;

        // Loop through the showing sub links
        for (let i = 0; i < showingSubrefs; i++) {
            setTimeout(() => {
                $animateRef = $(this.refs['subLinkRef' + i]);
                $animateRef.addClass('sub-link-is-showing'); 
            }, (i + 1) * 100);
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
        console.log('Render');
        const mainLinks = _(this.props.linksData).map((key, value) => {
            const mainClass = classNames('main-link', {
                'active-link': (value === this.state.activeMain),
            });
            if (value > 0) {
                return <p className={mainClass} key={value} onClick={this._onMainClick.bind(this, value)}>{key[0]}</p>;
            }    
        });

        let subLinks = null;
        _(this.props.linksData).map((key, value) => {
            if (value === this.state.activeMain) {
                subLinks = _(key).map((value, index) => {
                    if (index > 0) {
                        let i = index - 1
                        const subClass = classNames('sub-link', {
                            'active-link': (i === this.state.activeSub),
                        });
                        return <p ref={'subLinkRef' + i} className={subClass} key={value+index} onClick={this._onSubClick.bind(this, i)}>{value}</p>;
                    }  
                });
            }
        });

        return (
            <div className='navigation'>
                <div className='navigation__main'>
                    <div className='navigation__wrapper'>
                        <i className='nav-icon browse-button back-browse fa fa-angle-left' />
                        <i className='nav-icon browse-button forward-browse fa fa-angle-right' />
                        <div className='home-button'><i className='home-icon fa fa-steam' /></div>
                        {mainLinks}
                        <i className='nav-icon exit-button fa fa-power-off' />
                    </div>
                </div>
                <div className='navigation__sub'>
                    <div className='navigation__wrapper' ref='subLinkHolder'>
                        {subLinks}
                    </div>
                </div>
            </div>
        );
    },
});

export default NavigationComponent;