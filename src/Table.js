import React, { Component } from 'react'
import {BrowserRouter as Router,Link,} from 'react-router-dom';
export class Table extends Component {
    sortBy(key){
        let arrayCopy = JSON.parse(localStorage.getItem('mycart'));
        arrayCopy.sort(this.compareBy(key));
        this.setState({todo: arrayCopy});
    }
    compareBy(key)
    {
        return function (a, b) {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
            };
    }
    render() {
        const localData = JSON.parse(localStorage.getItem('mycart'));
        const tableData =  localData.map((item,id)=>
        <tr key={id}>
        <td>{id + 1}</td>
        <td>{item.titleToBeAdded}</td>
        <td>{item.PriorityToBeAdded}</td>
        <td>
        
        </td>
        </tr>
        )
        return (
            <div>
                
                <Link to="/login">Logout</Link>&nbsp;&nbsp;&nbsp;
                <Link to="/">Register</Link>&nbsp;&nbsp;&nbsp;
                <Link to="/home">Home</Link>&nbsp;&nbsp;&nbsp;
                <h2>Table</h2>
                <div className="d-flex align-items-center">
                    <table className="table table-bordered" id = "table">
                    <thead>
                        <tr>
                        <th scope="col" 
                        onClick={() => this.sortBy('id')}>SrNo</th>
                        <th scope="col"
                        onClick={() => this.sortBy('titleToBeAdded')}>Task</th>
                        <th scope="col"
                        onClick={() => this.sortBy('PriorityToBeAdded')}>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {tableData}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Table
