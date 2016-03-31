import React      from 'react';
import _          from 'underscore';
import $          from 'jquery';
import classNames from 'classnames';

const NavigationComponent = React.createClass({
    propTypes: {
        linksData:   React.PropTypes.array.isRequired,
        linkHistory: React.PropTypes.object.isRequired,
        activeMain:  React.PropTypes.number.isRequired,
        activeSub:   React.PropTypes.number.isRequired,
        onChange:    React.PropTypes.func.isRequired,
    },

    getInitialState() {
        return {
            sameMain: false,
        };
    },

    componentDidUpdate() {
        if (!this.state.sameMain) {
            this._animateSubLinks();
        }
    },

    _animateSubLinks() {
        let showingSubrefs = this.props.linksData[this.props.activeMain].length - 1;
        let $animateRef;

        // Loop through the showing sub links
        for (let i = 0; i < showingSubrefs; i++) {
            setTimeout(() => {
                $animateRef = $(this.refs['subLinkRef' + i]);
                $animateRef.addClass('sub-link-is-showing'); 
            }, (i + 1) * 75);
        };
    },

    _onMainClick(index) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange('main', index);
        }

        this.setState({ sameMain: false });
    },

    _onSubClick(index, target) {

        if (typeof this.props.onChange === 'function') {
            this.props.onChange('sub', index);
        }

        this.setState({ sameMain: true });
    },

    _browseHistory(type) {
        if (typeof this.props.onChange === 'function') {
            let currentMain = parseInt(_.first(this.props.linkHistory.history[this.props.linkHistory.position]));
            let upcomingMain;

            // Browsing back
            if (type === 'back') {
                console.log('Going back');
                if (!this.props.linkHistory.stopBack) {
                    this.props.onChange('back', this.props.linkHistory.history[this.props.linkHistory.position - 1]);
                    if (this.props.linkHistory.length === 1) {
                        upcomingMain = parseInt(_.first(this.props.linkHistory.history[this.props.linkHistory.position]));
                    } else {
                        upcomingMain = parseInt(_.first(this.props.linkHistory.history[this.props.linkHistory.position - 1]));
                    }
                }
            // Browsing forward
            } else if (type === 'forward') {
                console.log('Going forward');
                if (!this.props.linkHistory.stopForward) {
                    this.props.onChange('forward', this.props.linkHistory.history[this.props.linkHistory.position + 1]);
                    if (this.props.linkHistory.position === this.props.linkHistory.history.length - 1) {
                        upcomingMain = parseInt(_.first(this.props.linkHistory.history[this.props.linkHistory.position]));
                    } else {
                        upcomingMain = parseInt(_.first(this.props.linkHistory.history[this.props.linkHistory.position + 1]));
                    }
                } else {
                    return ;
                }
            }

            if (currentMain != upcomingMain) {
                this.setState({ sameMain: false });
            } else {
                this.setState({ sameMain: true });
            }
        } 
    },

    render() {
        const mainLinks = _(this.props.linksData).map((key, value) => {
            const mainClass = classNames('main-link', {
                'active-link': (value === this.props.activeMain),
            });
            if (value > 0) {
                return <p className={mainClass} key={value} onClick={this._onMainClick.bind(this, value)}>{key[0]}</p>;
            }    
        });

        let subLinks;
        _(this.props.linksData).map((key, value) => {
            if (value === this.props.activeMain) {
                subLinks = _(key).map((value, index) => {
                    if (index > 0) {
                        let i = index - 1
                        const subClass = classNames('sub-link', {
                            'active-link': (i === this.props.activeSub),
                            'sub-link-is-showing': this.state.sameMain,
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
                        <i className='nav-icon browse-button back-browse fa fa-angle-left' onClick={this._browseHistory.bind(this, 'back')} />
                        <i className='nav-icon browse-button forward-browse fa fa-angle-right' onClick={this._browseHistory.bind(this, 'forward')} />
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