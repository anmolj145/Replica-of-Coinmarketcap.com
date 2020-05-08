import React, { Component } from 'react'
import './Home.css'
import axios from 'axios'
import {
    CORS,
    // API_KEY, // used when pro url is used
    COIN_MARKET_LISTING_LATEST_PAGING_URL,
    TOP_100_COMMON_URL_STARTING,
    TOP_100_BY_ADJUSTED_VOLUME,
    TOP_100_BY_REPORTED_VOLUME,
    NORMAL_ICON, NORMAL_GRAPH,
    REPORTED_ICON, REPORTED_GRAPH,
    ADJUSTED_ICON, ADJUSTED_GRAPH,
    VIEW_ALL
} from '../ApiUrl'
import LoadingBar from 'react-top-loading-bar';

import { connect } from 'react-redux';
import { setCounter, setDetailData, resetCounter } from '../../action/actionDispatch.js'

class MainPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            loader: true,
            loadingBarProgress: 0,
            intervalId: 0,
            symbol: 'USD',
            type: 'normal',
            view_all: false,
            load_more: false
        }
    }

    componentDidMount() {
        // console.log(this.props.state.app.current_counter)
        axios.get(CORS + COIN_MARKET_LISTING_LATEST_PAGING_URL + this.props.state.app.current_counter
            // , { headers: { 'X-CMC_PRO_API_KEY': API_KEY } } needed when pro api is used
        )
            .then(response => { this.setState({ data: response.data.data, loader: false }) })
            .catch(error => (console.log(error)))
    }

    fetchPage = (count) => {
        this.setState({ loader: true })
        this.props.setCounter(count)
        //console.log(this.state)
        // axios.get(CORS + COIN_MARKET_LISTING_LATEST_PAGING_URL + this.props.state.app.current_counter
        //     //  , { headers: { 'X-CMC_PRO_API_KEY': API_KEY } }  needed when pro api is used
        // )
        //     .then(response => {
        //         this.setState({ data: response.data.data, loader: false })
        //     })
        //     .catch(error => console.log(error))


        var URL, CURRENCIES = 'BCH,BTC,ETH,LTC,USD,XRP'

        if (this.state.type === 'normal') {
            //console.log(this.state)
            //if (this.state.view_all === true) this.setState({ view_all: false })
            URL = CORS + COIN_MARKET_LISTING_LATEST_PAGING_URL + this.props.state.app.current_counter
            //console.log(this.state)
            console.log('normal')
        }

        if (this.state.view_all === true) {
            console.log(this.props.state.app.current_counter)
            URL = CORS + VIEW_ALL + this.props.state.app.current_counter
            console.log(URL)
            //console.log(this.state)
            console.log('inside view all')
        }

        if (this.state.type === 'adjusted_volume') {
            //if (this.state.view_all === true) this.setState({ view_all: false })
            URL = CORS + TOP_100_COMMON_URL_STARTING + CURRENCIES + TOP_100_BY_ADJUSTED_VOLUME + this.props.state.app.current_counter
            console.log('adjusted_volume')
        }

        if (this.state.type === 'reported_volume') {
            //if (this.state.view_all === true) this.setState({ view_all: false })
            URL = CORS + TOP_100_COMMON_URL_STARTING + CURRENCIES + TOP_100_BY_REPORTED_VOLUME + this.props.state.app.current_counter
            //console.log(this.state)
            console.log('reported_volume')
        }

        axios.get(URL)
            .then(response => {
                console.log(response.data)
                console.log(this.state)
                this.setState({ data: response.data.data, loader: false }, (() => console.log(this.state)))
            })
            .catch(error => console.log(error))
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
        this.setState({ intervalId: intervalId });
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - 30);
    }

    onGetDetail(d) {
        setInterval(async () => {
            if (this.state.loadingBarProgress !== 100) {
                this.setState({ loadingBarProgress: this.state.loadingBarProgress + 4 })
            }
            if (this.state.loadingBarProgress === 100) {
                this.setState({ loadingBarProgress: 0 })
                if (this.state.loadingBarProgress === 0) {
                    this.props.history.push('/detail')
                }
            }
        }, 100)
        this.props.setDetailData(d)
    }

    handleChange(event) {
        this.setState({ symbol: event.target.value })
    }

    handleTypeChange(event) {
        this.setState({ type: event.target.value, loader: true, view_all: false, load_more: false }, (() => this.typeChange()))
    }

    typeChange = () => {
        console.log('inside type change')
        this.props.resetCounter(1)
        var URL, CURRENCIES = 'BCH,BTC,ETH,LTC,USD,XRP'
        if (this.state.type === 'normal') {
            URL = CORS + COIN_MARKET_LISTING_LATEST_PAGING_URL + this.props.state.app.current_counter
            console.log('normal')
        }
        if (this.state.type === 'adjusted_volume') {
            URL = CORS + TOP_100_COMMON_URL_STARTING + CURRENCIES + TOP_100_BY_ADJUSTED_VOLUME + this.props.state.app.current_counter
            console.log('adjusted_volume')
        }
        if (this.state.type === 'reported_volume') {
            URL = CORS + TOP_100_COMMON_URL_STARTING + CURRENCIES + TOP_100_BY_REPORTED_VOLUME + this.props.state.app.current_counter
            console.log('reported_volume')
        }
        axios.get(URL)
            .then(response => {
                //console.log(response.data)
                this.setState({ data: response.data.data, loader: false })
            })
            .catch(error => console.log(error))
    }

    async loadMore(count) {
        console.log('inside load more')
        this.props.setCounter(count)
        console.log(this.props.state.app.current_counter)
        console.log(CORS + VIEW_ALL + this.props.state.app.current_counter)
        await axios.get(CORS + VIEW_ALL + this.props.state.app.current_counter)
            .then(response => {
                console.log(response.data)
                console.log(response.data.data.lenght)
                for(var i =0 ; i < response.data.data.lenght; i++)
                {
                    this.state.data.push(response.data.data[i])
                }
                //this.state.data.push(response.data.data)
                console.log(this.state)
                //this.setState({ data: response.data.data, loader: false }, (() => console.log(this.state)))
            })
            .catch(error => console.log(error))
    }

    render() {
        var test = 'abc'
        return (
            this.state.loader ? <h1>Loading . . .</h1> :
                <div className={this.props.state.app.darkMode ? 'dark' : null}>
                    <div className="tbl">
                        <LoadingBar
                            progress={this.state.loadingBarProgress}
                            height={7}
                            color='#3366ff'
                            onRef={ref => (this.LoadingBar = ref)}
                        />

                        {this.props.state.app.current_counter > 1 ?
                            <h2 className="title">Cryptocurrencies </h2> :
                            <h2 className="title">Top 100 Cryptocurrencies by Market Capitalization</h2>
                        }

                        <div className="currency-select-div">

                            <select className="currency-select-heading" value={'Cryptocurrencies'} onChange={(e) => this.handleTypeChange(e)}>
                                < option className="currency-val" value={'normal'} >Cryptocurrencies</option>
                                < option className="currency-val" value={'normal'} >Top 100</option>
                            </select>
                            {/* <span onClick={(() => this.setState({ type: 'normal' }, (() => this.typeChange())))} className="currency-select-heading">Cryptocurrencies</span> */}
                            {/* <span onClick={(() => console.log('excng'))} className="currency-select-heading">Exchanges</span> */}
                            <select className="currency-select-heading" value={'Exchanges'} onChange={(e) => this.handleTypeChange(e)}>
                                < option className="currency-val" value={this.state.type} >Exchanges</option>
                                < option className="currency-val" value={'adjusted_volume'} >Top 100 By Adjusted Volume</option>
                                < option className="currency-val" value={'reported_volume'} >Top 100 By Reported Volume</option>
                            </select>
                            <div className="pagination-btn-div" >
                                {this.props.state.app.current_counter > 1 ?
                                    <div type="button" className="pagination-btn" onClick={() => this.fetchPage(-100)}>&#8592; Previous 100</div>
                                    : null}
                                < div type="button" className="pagination-btn" onClick={() => this.fetchPage(100)}>Next 100 &#8594;</div>
                                {this.state.type === 'normal' ?
                                    < div type="button" className="pagination-btn" onClick={() => this.setState({ view_all: true, load_more: true }, (() => this.fetchPage(0)))}>View All </div>
                                    : null}
                            </div>

                            <select className="currency-select-drop-down" value={this.state.symbol} onChange={(e) => this.handleChange(e)}>
                                {
                                    Object.keys(this.state.data[0].quote).map(currency_name => (
                                        < option className="currency-val" key={currency_name}
                                            value={currency_name}  > {currency_name}</option>
                                    ))
                                }
                            </select>
                        </div >

                        {this.state.type === 'normal' ?
                            <div className="heading">
                                <div className="cmn w5">#</div>
                                <div className="cmn w15">Name</div>
                                <div className="cmn w15 alf">Market Cap</div>
                                <div className="cmn w10 alf">Price</div>
                                <div className="cmn w15 alf">Volume (24h)</div>
                                <div className="cmn w15 alf">Circulating Supply</div>
                                <div className="cmn w10 alf">Change (24h)</div>
                                <div className="cmn w15 alf">Price Graph(7d)</div>
                            </div>
                            :
                            this.state.type === 'reported_volume' ?
                                <div className="heading">
                                    <div className="cmn w5">#</div>
                                    <div className="cmn w10">Name</div>
                                    <div className="cmn w15 alf">Volume (24h)</div>
                                    <div className="cmn w15 alf">Volume (7d)</div>
                                    <div className="cmn w15 alf">Volume (30d)</div>
                                    <div className="cmn w10 alf">No. Markets</div>
                                    <div className="cmn w10 alf">Change (24h)</div>
                                    <div className="cmn w12 alf">Vol Graph(7d)</div>
                                    <div className="cmn w10 alf">Launched</div>
                                </div>
                                :
                                //   adjusted_volume
                                <div className="heading">
                                    <div className="cmn w5">#</div>
                                    <div className="cmn w10">Name</div>
                                    <div className="cmn w10 alf">Adj. Vol (24h)</div>
                                    <div className="cmn w15 alf">Vol (24h)</div>
                                    <div className="cmn w15 alf">Vol (7d)</div>
                                    <div className="cmn w15 alf">Vol (30d)</div>
                                    <div className="cmn w10 alf">No. Markets</div>
                                    <div className="cmn w10 alf">Change (24h)</div>
                                    <div className="cmn w10 alf">Vol Graph</div>
                                </div>
                        }

                        {

                            this.state.data.map((d, index) => {
                                let arr = []
                                if (this.state.symbol === 'USD') arr.push(d.quote.USD)
                                if (this.state.symbol === 'BTC') arr.push(d.quote.BTC)
                                if (this.state.symbol === 'ETH') arr.push(d.quote.ETH)
                                if (this.state.symbol === 'LTC') arr.push(d.quote.LTC)
                                if (this.state.symbol === 'BCH') arr.push(d.quote.BCH)
                                if (this.state.symbol === 'XRP') arr.push(d.quote.XRP)


                                if (this.state.type === 'normal')
                                    return (
                                        < div className="dta" key={d.id} >
                                            <div className="dsp-inb w5">{this.props.state.app.current_counter + index}</div>
                                            <div className="dsp-inb w15 nmh" onClick={() => { this.onGetDetail(d) }} data-toggle="tooltip" data-placement="right" title={d.name}>
                                                <img alt='symbol' src={NORMAL_ICON + d.id + ".png"} width="15px" height="15px" /><span>&nbsp;</span>{d.name}
                                            </div>
                                            <div className="dsp-inb w15 alf">{Math.trunc(arr[0].market_cap)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div>
                                            <div className="dsp-inb w10 alf bl">{arr[0].price.toFixed(2)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div >
                                            <div className="dsp-inb w15 alf bl">{Math.trunc(arr[0].volume_24h)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div >
                                            <div className="dsp-inb w15 alf">
                                                {Math.trunc(d.circulating_supply)} {d.symbol}{d.tags[0] === "mineable" ? null : '*'}
                                            </div>
                                            <div className="dsp-inb w10 alf" style={arr[0].percent_change_24h >= 0 ? { color: "green" } : { color: "red" }}>
                                                {arr[0].percent_change_24h.toFixed(2)}%
                                            </div>
                                            < div className="dsp-inb w15 alf">
                                                <img alt='symbol' src={NORMAL_GRAPH + d.id + ".png"} width="140px" height="40px" />
                                            </div>
                                        </div >
                                    )

                                if (this.state.type === 'reported_volume')
                                    return (
                                        < div className="dta" key={d.id} >
                                            <div className="dsp-inb w5">{this.props.state.app.current_counter + index}</div>
                                            <div className="dsp-inb w10 nmh" onClick={() => { this.onGetDetail(d) }}>
                                                <img alt='symbol' src={REPORTED_ICON + d.id + ".png"} width="15px" height="15px" /><span>&nbsp;</span>
                                                {d.name}</div>
                                            <div className="dsp-inb w10 alf bl">{Math.trunc(arr[0].volume_24h)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div>
                                            <div className="dsp-inb w15 alf bl">{Math.trunc(arr[0].volume_7d)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div >
                                            <div className="dsp-inb w15 alf bl">{Math.trunc(arr[0].volume_30d)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div >
                                            <div className="dsp-inb w10 alf bl">{d.num_market_pairs}</div>
                                            <div className="dsp-inb w10 alf" style={arr[0].percent_change_volume_24h >= 0 ? { color: "green" } : { color: "red" }}>
                                                {arr[0].percent_change_volume_24h.toFixed(2)}%
                                                </div>
                                            < div className="dsp-inb w12 alf">
                                                <img alt='symbol' src={REPORTED_GRAPH + d.id + ".png"} width="100px" height="40px" />
                                            </div>
                                            {
                                                typeof d.date_launched === typeof test ?
                                                    (
                                                        < div className="dsp-inb w10 alf">{d.date_launched.slice(0, 7)}</div>
                                                    )
                                                    :
                                                    (< div className="dsp-inb w10 alf"> --- </div>)
                                            }
                                        </div >
                                    )

                                if (this.state.type === 'adjusted_volume')
                                    return (
                                        < div className="dta" key={d.id} >

                                            <div className="dsp-inb w5">{this.props.state.app.current_counter + index}</div>
                                            <div className="dsp-inb w10" onClick={() => { this.onGetDetail(d) }}>
                                                <img alt='symbol' src={ADJUSTED_ICON + d.id + ".png"} width="15px" height="15px" /><span>&nbsp;</span>
                                                {d.name}</div>
                                            <div className="dsp-inb w10 alf bl">{Math.trunc(arr[0].volume_24h_adjusted)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div>

                                            <div className="dsp-inb w15 alf bl">{arr[0].volume_24h.toFixed(2)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div >
                                            <div className="dsp-inb w15 alf bl">{Math.trunc(arr[0].volume_7d)} {this.state.symbol === 'USD' ? '$' : this.state.symbol}</div >
                                            <div className="dsp-inb w15 alf bl">  {Math.trunc(arr[0].volume_30d)} {d.symbol}</div>
                                            {/* {console.log(typeof arr[0].percent_change_volume_24h)} */}
                                            <div className="dsp-inb w10 alf bl">{d.num_market_pairs}</div>
                                            <div className="dsp-inb w10 alf" style={arr[0].percent_change_volume_24h >= 0 ? { color: "green" } : { color: "red" }}>
                                                {arr[0].percent_change_volume_24h.toFixed(2)}%
                                                </div>
                                            < div className="dsp-inb w10 alf">
                                                <img alt='symbol' src={ADJUSTED_GRAPH + d.id + ".png"} width="85x" height="40px" />
                                            </div>
                                        </div >
                                    )
                                return null
                            })
                        }

                        {
                            //this.state.data.lenght === 200
                            this.state.load_more === true && this.state.type === 'normal'
                                ?
                                <div type="button" className="load-more-btn" onClick={() => this.loadMore(200)}>Load More</div>
                                : null
                        }
                        <span><i>* Not Mineable</i></span>
                        <div className="pagination-btn-div btm" >
                            {this.props.state.app.current_counter > 1 ?
                                <div type="button" className="pagination-btn" onClick={() => this.fetchPage(-100)}>&#8592; Previous 100</div> : null}
                            <div type="button" className="pagination-btn" onClick={() => this.fetchPage(100)}>Next 100 &#8594;</div>
                            {this.state.type === 'normal' ?
                                <div type="button" className="pagination-btn" onClick={() => { this.setState({ view_all: true, load_more: true }, (() => this.fetchPage(0))) }}>View All </div>
                                : null}
                        </div>

                        <button title='Back to top' className='scroll'
                            onClick={() => { this.scrollToTop() }}>
                            <span className='arrow-up'>&uarr;</span>
                        </button>
                    </div >
                </div >
        )
    }
}

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps, { setCounter, setDetailData, resetCounter })(MainPage);