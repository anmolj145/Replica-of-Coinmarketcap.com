import React, { Component } from 'react'
import './Detail.css'
import { connect } from 'react-redux';

class Detail extends Component {

    render() {
        let d = this.props.state.app.detail_data
        return (
            <div className={this.props.state.app.darkMode ? 'dark' : null}>
                <div className="main">
                    <div className="div-heading">
                        <span className="detail-name">{d.name} </span>
                        <span className="detail-symbol">({d.symbol})</span>
                        <span className="detail-price">$ {d.quote.USD.price.toFixed(2)}</span>
                        <span> USD </span>
                        <span className="detail-change_24h"
                            style={d.quote.USD.percent_change_24h > 0 ? { color: "green" } : { color: "red" }}
                        >({d.quote.USD.percent_change_24h.toFixed(2)}%)</span>
                    </div>

                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{d.name}</td>
                            </tr>
                            <tr>
                                <td>Symbol</td>
                                <td>{d.symbol}</td>
                            </tr>
                            <tr>
                                <td>Mineable</td>
                                {d.tags[0] === 'mineable' ? <td>True</td> : <td>False</td>}
                            </tr>
                            <tr>
                                <td>Circulating Supply</td>
                                <td>{d.circulating_supply.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>${d.quote.USD.price.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Volume in last 24 h</td>
                                <td>${d.quote.USD.volume_24h.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>% Change in 1 hr</td>
                                <td>{d.quote.USD.percent_change_1h.toFixed(2)} %</td>
                            </tr>
                            <tr>
                                <td>% Change in 24 hr</td>
                                <td>{d.quote.USD.percent_change_24h.toFixed(2)} %</td>
                            </tr>
                            <tr>
                                <td>% Change in 7 days</td>
                                <td>{d.quote.USD.percent_change_7d.toFixed(2)} %</td>
                            </tr>
                            <tr>
                                <td>Market Capital</td>
                                <td>${d.quote.USD.market_cap.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps)(Detail);