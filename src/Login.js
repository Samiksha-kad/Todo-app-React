import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userdetails: [],
            data:[]
        }
        this.handler = this.handler.bind(this);
    }
    componentDidMount() {
        const URL = "http://localhost:3001/userdetails";
        fetch(URL)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({userdetails:data})
        })
    }
    handler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        })
        // console.log(this.state)
    }
    submit = (event)=>{
        event.preventDefault();
        var data = false;
        
        this.state.userdetails.forEach(user => {
                if(user.email===this.state.email&&user.password===this.state.password){
                        let arr=user
                        alert('login succesfully');
                        this.props.history.push('/home');
                        data= true;
                        return
                }
         
        });
        if(data!==true){
            alert('Email id or password is incorrect');
            this.props.history.push('/login');
        }
        
        
    }
    render() {
        return (
            <div className="section">
                <div className="contentBx1">
                    <div className="formBx1">
                        <h2>Login</h2>
                        <form >
                        <div className="inputBx1">
                            <span>Email</span>
                            <input type="text" className="form-control" name="email" onChange={this.handler}/>
                        </div>
                        <div className="inputBx1">
                            <span>Password</span>
                            <input type="password" className="form-control" name="password" onChange={this.handler}/>
                        </div>
                    
                        <div className="inputBx1">
                            <Link to='/home' style={{textDecoration:'none',color:'black'}} ><button type="submit" value="submit" 
                            id = "submit" onClick={this.submit}>Log in</button></Link>
                             <br></br>               
               
                        </div>

                        <div className="inputBx">
                        Don't have account?
                       <Link to='/'  style={{color:'#c91e63'}} >Sign up</Link>
                        </div>
                        
                        </form>
                        <h3 className="heading12">Login with social media</h3>
                        <ul class="sci">
                            <li><img src="face.png" alt = "facebook"
                            className="facebook"/></li>
                            <li><img src="twitter.png" alt = "twitter" className="twitter"/></li>
                            <li><img src="instagram.png" alt = "instagram" className="instagram"/></li>
                        </ul>
                        </div>
                 </div>
                 <div className="imgBx1">
                    <img src="bg.jpg" alt = "bg"></img>
                </div>
            </div>
        )
    }
}

export default Login
