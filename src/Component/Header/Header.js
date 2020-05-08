import React, { Component } from 'react'
import './Header.css'
import './../../App.css'
import logo from './download.png'
import moon from './moon.png'
import axios from 'axios'
import { connect } from 'react-redux';
import { setMode } from '../../action/actionDispatch';

import {
    CORS, COIN_MARKET_INFO
    , API_KEY
} from '../ApiUrl'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            loader: false
        }
    }

    componentDidMount() {
        axios.get(CORS + COIN_MARKET_INFO
            ,
            { headers: { 'X-CMC_PRO_API_KEY': API_KEY } }
        )
            .then(response => {
                this.setState({ data: response.data.data, loader: true })
            })
            .catch(error => (
                console.log(error)
            ))
    }

    render() {
        return (
            !this.state.loader ? <h1>Loading Info . . .</h1> :
                <div className={this.props.state.app.darkMode ? 'dark' : null}>
                    < div className="header" >
                        <div className="data">
                            <span className='label'>Cryptocurrencies : <span className='stats'>{this.state.data.total_cryptocurrencies}</span> &bull; </span>
                            <span className='label'>Markets : <span className='stats'>{this.state.data.active_market_pairs}</span> &bull; </span>
                            <span className='label'>Market Cap : <span className='stats'>${Math.trunc(this.state.data.quote.USD.total_market_cap)}</span> &bull; </span >
                            <span className='label'>24h Vol : <span className='stats'>${Math.trunc(this.state.data.quote.USD.total_volume_24h)}</span> &bull; </span >
                            <span className='label'>BTC Dominance : <span className='stats'>{this.state.data.btc_dominance.toFixed(2)}%</span></span >
                            <img src={moon} align="top" alt="logo" className="moon" height="12px" width="12px"
                                onClick={() => this.props.setMode(!this.props.state.app.darkMode)}
                            />
                        </div >
                    </div>

                    <div className="label-header">
                        <img src={logo} align="top" alt="logo" className="logo" height="45px" width="270px" />
                        <div className="header-option">
                            <span className="item">Rating </span>
                            <span className="item">Tools </span>
                            <span className="item">Resource </span>
                            <span className="item">Blog </span>
                            <span className="dots">&#x000B7;&#x000B7;&#x000B7;</span>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, { setMode })(Header);