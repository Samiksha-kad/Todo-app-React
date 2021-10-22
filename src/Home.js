import React, { Component } from 'react'
import {BrowserRouter as Router,Link,} from 'react-router-dom';
import './Home.css'
import Swal from "sweetalert2"; 
export class Home extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            todo:[
                {titleToBeAdded:"demo",PriorityToBeAdded:"1",completed: false,},
            ],
            newTodoTitle:[ 
                ''
            ],
            newPriority:[
                ''
            ],
            isloading:true,
            completed: false
       }
    }
    
    newValueTitle =(event) =>{
        this.setState({newTodoTitle:event.target.value});
        
    };
    
    handler = (event)=>{
        this.setState({handler:event.target.value});
    }

    handleDelete=(id) =>{
        console.log("delete",id)
        var newTodos1 =[...this.state.todo]
        var todo = newTodos1.filter((element,i) => {
            return i !== id
        })
        this.setState({todo:todo});
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Once Deleted,You can not recover it',
          
          })
    }
    handleEdit=(id)=> {
        var itemsToBeEdited =[...this.state.todo]
        var todo1 = itemsToBeEdited.filter((element,i) => {
            return i !== id
        }) 
        var selectedItems = this.state.todo.find((ele,i)=>i === id);
        
        this.setState({
            newTodoTitle:selectedItems.titleToBeAdded,
            newPriority:selectedItems.PriorityToBeAdded
            
        })
        this.handleDelete(id)

        
    }
    complete=(id)=>{ 
        var newTodos1 =[...this.state.todo]
            var todo = newTodos1.map((element,i) => {
                if(i === id){
                    if(newTodos1[i]["completed"]!==true){
                        newTodos1[i]["completed"]=true
                        localStorage.setItem("mycart",JSON.stringify(newTodos1)) ;
                        this.setState({todo:newTodos1})
                        Swal.fire(
                            'Good job!',
                            'You Have Completed The Task!',
                            'success'
                          ) 
                    }

                }
                return element
            })
      }
    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('mycart', JSON.stringify(nextState.arr));
    
    }
    componentWillMount(){
        localStorage.getItem('mycart') && this.setState({
            todo: JSON.parse(localStorage.getItem('mycart')),
            isloading:false,
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let arr = this.state.todo;
        if (localStorage.getItem('mycart') !== undefined) {
            localStorage.setItem('mycart', JSON.stringify(arr));
        }
        else{
            localStorage.setItem('mycart', JSON.stringify(arr));
        }
        
        this.setState({
            todo:[
                 ...this.state.todo,
                 {titleToBeAdded:this.state.newTodoTitle,
                PriorityToBeAdded:this.state.newPriority,
                completed: false,
                },
                
             ],
             newTodoTitle:'',
             newPriority:'',
             
             
            
         }) 
         console.log(this.state.todo);
       
    };
    handleChange = (event) => {
        var titleToBeAddedle = event.target.value;
        this.setState({ titleToBeAddedle: titleToBeAddedle});
    }
    handleNumber = (event) => {
        this.setState({
            newPriority: event.target.value
        }, () => {
            console.log(this.state.newPriority)
        })
        
    }
    sortBy(key){
            let arrayCopy = [...this.state.todo];
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
  componentDidMount(){
    let arr = this.state.todo;
    if (localStorage.getItem('mycart') !== undefined) {
        localStorage.setItem('mycart', JSON.stringify(arr));
    }
    else{
        localStorage.setItem('mycart', JSON.stringify(arr));
    }
  }
  componentDidUpdate(){
    let arr = this.state.todo;
    if (localStorage.getItem('mycart') !== undefined) {
        localStorage.setItem('mycart', JSON.stringify(arr));
    }
    else{
        localStorage.setItem('mycart', JSON.stringify(arr));
    }
  }
 

    render() {
        
        return (
            <div>
            <div id="home" 
            style={{background:` url('home_back.png') no-repeat center/cover`,
            content:"",
            position:"absolute",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px"}}>
                 <li className="li"> 
                <Link to="/login" className = "login">Log out</Link></li>
                <h2 id = "h2_heading">ToDo App</h2> 
               
                {/* <Link to="/table">Table</Link> */}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input onChange={this.newValueTitle} 
                    value={this.state.newTodoTitle} name = "titleToBeAddedlestate"
                    id="titleToBeAddedle"/>
                    <button class="btn_task">Add Task</button>
            <p className="priority">Priority</p>                                     
                    <select value={this.state.newPriority} 
                    onChange={this.handleNumber}>
                    <option value="default">Priority</option>
                    <option value="1-Lowest">1-Lowest</option>
                    <option value="2-Low">2-Low</option>
                    <option value="3-Average">3-Average</option>
                    <option value="4-High">4-High</option>
                    <option value="5-Highest">5-Highest</option>
                    </select>
                </form>
                <h3 className="todo">To-Do List</h3>
                
                <div className="d-flex align-items-center">
                <br/>
                    <table class="table table-bordered" id = "table">
                    <thead>
                        <tr>
                        <th scope="col" 
                        onClick={() => this.sortBy('id')}>SrNo</th>
                        <th scope="col"
                        onClick={() => this.sortBy('titleToBeAdded')}>Task</th>
                        <th scope="col"
                        onClick={() => this.sortBy('PriorityToBeAdded')}>Priority</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {this.state.todo.map((item,id)=>
                            <tr key={id}>
                <td className={item.completed ? 'line-through' : '' }>{id+1}</td>
                                <td className={ item.completed ? 'line-through' : '' } >{item.titleToBeAdded}</td>
                                <td  className={ item.completed ? 'line-through' : '' }>{item.PriorityToBeAdded}</td>
                                <td>
                                    <button onClick={() =>{this.handleDelete(id)}} className="btn btn-danger"><i class="fas fa-trash"></i></button> &nbsp;
                                    
                                    <button onClick={() =>{this.complete(id)}} className={"btn btn-success"}><i class="fa fa-check"></i></button>
                                        
                                </td>
                                
                                
                            </tr>

                            )}
                        
                    </tbody>
                    </table>
                    
                    
                   
                </div>
            </div>
            
            </div>
        )
    }
}

export default Home
