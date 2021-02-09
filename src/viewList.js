import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import './App.css';

class ViewList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            thumbnail: null,
            cheapestDealID: null,
            userId: null,
            loggedIn: false,
            rrows: null,
            tableView: true,
            cardView: false,
            history: [],
            gamesList: [],
            noViews: null,
            dealsOn: false
        }

        console.log("in componentdidmount");
        let gameTemp = []
        let tempo = []
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/api/db/viewedGames",
        }).then((res) => {
            //console.log(res.data);
            if (res.data) {
                tempo = res.data;
                this.setState({ isLoaded: true });

            }
            else {
                console.log("no ID");
                this.setState({ noViews: false });
            }
            console.log(res.data);
        }).then(() => {
            if (this.state.isLoaded) {
                for (let i = 0; i < tempo.length; ++i) {

                    fetch(`https://agile-sands-96303.herokuapp.com/api/game/${tempo[i].gameId}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            else
                                throw Error("HTTP 404, Not Found");
                        }).then((json) => {
                            console.log(json.deals[0].price)
                            console.log("JJOOOOOOOOOOOOOOOOOOOOOO")
                            tempo[i]["deals"] = json.deals[0].price;
                            tempo[i]["thumb"] = json.info.thumb;
                        }).then((re)=>{
                            this.setState({dealsOn: true})
                        }).catch((err) => {
                            console.log("ERROR" + err)
                        })
                }
                
                this.setState({gamesList: tempo})
            }
        });
    }

    componentDidMount() {
 
    }

    render() {
        const forceUpdate = () => {
            this.setState(this.state);
            this.forceUpdate();
        }
        var { isLoaded, items } = this.state;
        console.log(this.state)
        var { dealsOn, items } = this.state;
        if (!isLoaded && !dealsOn) {
            return (
                <div>
                    <div class="d-flex justify-content-center">
                        <h4>Loading...</h4>
                    </div>
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            if (!isLoaded && !dealsOn) {
                return (
                    <div class="d-flex justify-content-center">
                        <br></br>
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                );
            }
            else {
                document.title = "Search History";
                if (this.state.gamesList.length == 0) {
                    return (
                        <div>
                            <h3>No Games at the moment.</h3>
                        </div>
                    )
                }
                else {
                    const setCardView = props => {
                        props.cardView = true;
                        props.tableView = false;
                        console.log(props);
                    }

                    const setTableView = props => {
                        props = true;
                    }
                    // <div class="btn-group float-right" role="group" aria-label="Basic example">
                    //     <button type="button" class="btn btn-primary" onClick={() => setCardView(this.state)}><i class="fa fa-th-large" aria-hidden="true"></i> Card View</button>
                    //     <button type="button" class="btn btn-danger" onClick={() => setTableView(this.state.tableView)}><i class="fa fa-table" aria-hidden="true"></i> Table View</button>
                    // </div>
                    return (
                        <div>
                            <h2>Top 20 Most Viewed Games!</h2>
                            {this.state.tableView == true && <DisplayList rrows={this.state.rrows} forceUpdate={forceUpdate} gamesList={this.state.gamesList} isLoaded={this.state.isLoaded} />}
                        </div>
                    )
                }
            }
        }
    }

}
/*
                            <div class="btn-group float-right" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-primary" onClick={() => setCardView(this.state)}><i class="fa fa-th-large" aria-hidden="true"></i> Card View</button>
                                <button type="button" class="btn btn-danger" onClick={() => setTableView(this.state.tableView)}><i class="fa fa-table" aria-hidden="true"></i> Table View</button>
                            </div>
<div class = "row">
    <div class = "card-deck">
        <div class = "card">
            <img src = {this.state.history[0].thumb} class = "card-img-top"/>
            <div class = "card-body">
                <h4>{this.state.history[0].name}</h4>
                <p><b>Price: </b>{this.state.history[0].salePrice}</p>
            </div>
            <div class = "card-footer">
            <small class="text-muted">{day} | {time}</small>
            </div>
        </div>
        <div class = "card">
            <img src = {this.state.history[9].thumb} class = "card-img-top"/>
            <div class = "card-body">
                <h4>{this.state.history[0].name}</h4>
                <p><b>Price: </b>{this.state.history[0].salePrice}</p>
            </div>
            <div class = "card-footer">
            <small class="text-muted">{day} | {time}</small>
            </div>
        </div>
    </div>
</div>
 */

const DisplayCardView = (props) => {
    return (
        <div>
            <div class="row">
                <div class="card-deck">
                    <div class="card">
                        <img src={props.history[0].thumb} class="card-img-top" />
                        <div class="card-body">
                            <h4>{props.history[0].name}</h4>
                            <p><b>Price: </b>{props.history[0].salePrice}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Wed, Jan 20 | 11:59PM</small>
                        </div>
                    </div>
                    <div class="card">
                        <img src={props.history[9].thumb} class="card-img-top" />
                        <div class="card-body">
                            <h4>{props.history[0].name}</h4>
                            <p><b>Price: </b>{props.history[0].salePrice}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Wed, Jan 20 | 11:59PM</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const DisplayList = (props) => {
    if ( props.isLoaded) {
        return (
            <div>
                <table className="table table-striped">
                    <TableHeader />
                    <TableBody rrows={props.rrows} forceUpdate={props.forceUpdate} gamesList={props.gamesList} isLoaded={props.isLoaded} />
                </table>
            </div>
        )
    }
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Icon</th>
                <th>Game Title</th>
                <th>Current Price</th>
                <th></th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const [rrow, setRows] = useState(props.gamesList);
    console.log(props.gamesList.deals)
    const rows = rrow.map((item, index) => {
        console.log("ssssssssssssssss11111111")
        console.log(item.deals)
        if (item.gameId) {
            return (
                <TableRow item={item} index={index} />
            )
        }
    })
    
    return (
        <tbody>
            {rows}
        </tbody>
    )
}

const TableRow = (props) => {
    console.log(props.item.deals)
    console.log(props)
    return (
        <tr>
            <td><Link to={`/game-detail/${props.item.gameId}`}><img class="storeImg" src={props.item.thumb} alt="image" width={50} height={50} /></Link></td>
            <td><Link to={`/game-detail/${props.item.gameId}`}>{props.item.gameName}</Link></td>
            <td>${props.item.deals}</td>
        </tr>
    )
}
export default ViewList;