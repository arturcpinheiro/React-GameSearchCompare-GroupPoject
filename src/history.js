import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import './App.css';

class History extends React.Component {
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
            history: []
        }
    }

    componentDidMount() {
        console.log("in componentdidmount");
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/user",
          }).then((res) => {
            if (res.data._id) {
                console.log("has ID");
                this.setState({ loggedIn: true });
                this.setState({ userId: res.data._id });
                this.setState({ history: res.data.searchHistory });
                this.setState({ isLoaded: true });
            }
            else {
                console.log("no ID");
                this.setState({ loggedIn: false });
            }
            console.log(res.data);
          });
    }

    render() {
        const forceUpdate = () => {
            this.setState(this.state);
            this.forceUpdate();
        }
        var { isLoaded, items } = this.state;
        console.log(this.state)

        if (!isLoaded) {
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
            if (!isLoaded) {
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
                if (this.state.history.length == 0) {
                    return (
                        <div>
                            <h3>Empty history</h3>
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
                    return (
                        <div>
                            <h3>Recent History</h3>
                            <div class="btn-group float-right" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-primary" onClick={() => setCardView(this.state)}><i class="fa fa-th-large" aria-hidden="true"></i> Card View</button>
                                <button type="button" class="btn btn-danger" onClick={() => setTableView(this.state.tableView)}><i class="fa fa-table" aria-hidden="true"></i> Table View</button>
                            </div>
                            {this.state.tableView == true && <DisplayHistory userId = {this.state.userId} rrows={this.state.rrows} forceUpdate={forceUpdate} history={this.state.history} loggedIn={this.state.loggedIn}/> }
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
            <div class = "row">
                <div class = "card-deck">
                    <div class = "card">
                        <img src = {props.history[0].thumb} class = "card-img-top"/>
                        <div class = "card-body">
                            <h4>{props.history[0].name}</h4>
                            <p><b>Price: </b>{props.history[0].salePrice}</p>
                        </div>
                        <div class = "card-footer">
                        <small class="text-muted">Wed, Jan 20 | 11:59PM</small>
                        </div>
                    </div>
                    <div class = "card">
                        <img src = {props.history[9].thumb} class = "card-img-top"/>
                        <div class = "card-body">
                            <h4>{props.history[0].name}</h4>
                            <p><b>Price: </b>{props.history[0].salePrice}</p>
                        </div>
                        <div class = "card-footer">
                        <small class="text-muted">Wed, Jan 20 | 11:59PM</small>
                        </div>
                    </div>
                </div>
            </div>
         </div>
     )
 }
const DisplayHistory = (props) => {
    if (props.history.length > 0 && props.loggedIn) {
        return (
            <div>
                <table className="table table-striped">
                    <TableHeader/>
                    <TableBody userId = {props.userId} rrows={props.rrows} forceUpdate={props.forceUpdate} history={props.history} loggedIn={props.loggedIn}/>
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
                <th>Date of Visit</th>
                <th></th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const [rrow, setRows] = useState(props.history);
    console.log("ssssssssssssssss11111111")
    console.log(rrow)
    const removeRow = (obj) =>{
        let temp = rrow;
        //temp.pop();

        let idx = null;
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].gameID == obj.gameID) {
                idx = i;
                break;
            }
        }

        temp.splice(idx, 1);
        setRows(rrow=>temp);
        console.log(rrow);
        props.forceUpdate();
    }
        const removeGame = (props, userId) => {
                            fetch(`http://localhost:8080/api/history/pop/${userId}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(props)
                            })
                                .then(async data => await data.json())
                                .then(removeRow(props))

                        }

    const rows = rrow.map((item, index) => {       
        if (item.gameID) {
            return (
                <TableRow userId = {props.userId} removeGame={removeGame} item={item} index={index}/>
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
    let date = new Date(props.item.date);
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let day = date.toLocaleString('en-US', {weekday: 'short', month: 'long', day: '2-digit'})

    return (
        <tr>
            <td><Link to={`/game-detail/${props.item.gameID}`}><img class="storeImg" src={props.item.thumb} alt="Responsive image" width={50} height={50} /></Link></td>
            <td><Link to={`/game-detail/${props.item.gameID}`}>{props.item.name}</Link></td>
            <td>${props.item.salePrice}</td>
            <td>{day}<br/>{time}</td>

        <td><badge type="button" onClick={() => props.removeGame(props.item, props.userId)} class="badge badge-danger" href="#collapseExample">X</badge></td>
    </tr>
    )
}
export default History;