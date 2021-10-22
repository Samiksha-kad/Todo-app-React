import React, { Component } from 'react';
import './Register.css'
import { BrowserRouter as Router,Link } from 'react-router-dom'
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
var mobileFormat = /^(0|91)?[7-9][0-9]{9}$/;
var ageFormat = /^1[8-9]|[2-4][0-9]/;
var usernameRegex =  /^[a-z0-9_\.]+$/;
export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : null,
            lname:null,
            username:null,
            email :null,
            password :null,
            confirm_password :null,
            mobile:null,
            age:null,
            address :null,
            userdetails:[],
            errors:{
                name:'',
                lname:'',
                username:'',
                email :'',
                password :'',
                confirm_password:'',
                mobile:'',
                age:'',
                address:'',

            }
        }
    }
    handler = (event) =>{
       
        const{name, value} = event.target;
        let errors = this.state.errors;
        // eslint-disable-next-line default-case
        switch(name){
            case 'name':
                errors.name=value.length>3 ?'':'Name Should be greater than 3 letters';
            break;
            case 'lname':
                errors.lname=value.length>2 ?'':'Last Name Should be greater than 2 letters';
            break;
            case 'username':
                errors.username = usernameRegex.test(value)?'':'User Name should consist of capital letters,small letters and digits';
            break;
            case 'email':
                errors.email = mailformat.test(value)?'':'Email is not valid';
            break;
            case 'password':
                errors.password = passFormat.test(value)?'':'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:';
            break;
            case 'confirm_password':
                errors.confirm_password = this.state.password === value?'':'Password And Confirm Password Should Be Same';
            break;
            case 'mobile':
                errors.mobile = mobileFormat.test(value)?'':'Begins with 0 or 9,Then contains 7 or 8 or 9,Then contains 9 digits';
            break;
            case 'age':
                errors.age = ageFormat.test(value)?'':'Age Should be greater than 18 and less then 49';
            break;
            case 'address':
                errors.address = value.length>5?'':'Address Should be greater than 5 letters' ;
            break;
            
            
                
        }
        this.setState({errors,[name]:value},()=>{
            console.log(errors)
        })
    }
    formSubmit = (event)=>{
        event.preventDefault();
        if(this.validate(this.state.errors))
        {
            alert("Form Submitted SuccesFully");
            if(this.state.password===this.state.confirm_password){
                const URL="http://localhost:3001/userdetails";
                    let formData={password: this.state.password,email:this.state.email,name:this.state.name,lname:this.state.lname,username:this.state.username,age:this.state.age,};
                    fetch(URL,{
                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: {
                            "content-type": "application/json",
                            'Accept': 'application/json'
                        }
                    })
                    .then(res=> res.json())
                    .then(data=>{
                        fetch(URL)
                        .then(res=>res.json())
                        .then(data=>{
                            console.log(data)
                        })
                        .catch(err =>
                            console.log(err)
                        )
                    })
                    
                    this.props.history.push('/login');       
        }
        else{
            alert('Password and confirm password are not same')
        }
        } 
    }
    validate=(errors)=>{
        let valid = true;
        Object.values(errors).forEach((val)=>
            val.length>0 && (valid = false));
        return valid;

    }

    render() {
        const {errors} = this.state;
        return (
            <section className="container-fluid Forms">
                <div className="imgBx">
                    <img src="bg1.jpeg" alt = "bg"></img> 
                </div>
                <div className="contentBx">
                <div className="formBx">
                <h2>Sign Up</h2>
                <form>
                    <div className="inputBx">
                        <span htmlFor="inputName" className="form-label">Name</span>
                        <input type="text" name="name" className="form-control" id="inputName" 
                        onChange={this.handler}/>
                        {errors.name.length>0 && <span style = {{color:'red'}}>{errors.name}</span>}
                    
                    </div>
                    <div className="inputBx">
                        <span htmlFor="inputLastName" className="form-label">Last Name</span>
                        <input type="text" name="lname" className="form-control" id="inputLastName" 
                        onChange={this.handler}/>
                        {errors.lname.length>0 && <span style = {{color:'red'}}>{errors.lname}</span>}
                    
                    </div>

                    <div className="inputBx">
                        <span htmlFor="inputUserName" className="form-label">User Name</span>
                        <input type="text" name="username" className="form-control" id="inputUserName" 
                        onChange={this.handler}/>
                        {errors.username.length>0 && <span style = {{color:'red'}}>{errors.username}</span>}
                    
                    </div>
                    <div className="inputBx">
                        <span htmlFor="inputEmail4" className="form-label">Email</span>
                        <input type="email" name="email" className="form-control" id="inputEmail4" onChange={this.handler}/>
                        {errors.email.length>0 && <span style = {{color:'red'}}>{errors.email}</span>}
                    </div>
                <div className="inputBx">
                    <span htmlFor="inputPassword4"  className="form-label">Password</span>
                    <input type="password" name="password" onChange={this.handler} className="form-control" id="inputPassword4"/>
                    {errors.password.length>0 && 
                    <span style = {{color:'red'}}>{errors.password}</span>}
                </div>
                <div className="inputBx">
                    <span htmlFor="Cpass" className="form-label">Confirm Password</span>
                    <input type="password" name="confirm_password" onChange={this.handler} className="form-control" id="Cpass"/>
                    {errors.confirm_password.length>0 && 
                    <span style = {{color:'red'}}>{errors.confirm_password}</span>}
                </div>
             
               
                <div className="remember"> 
                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                    <span htmlFor="gridCheck">
                        I agree with all Terms and Conditions.
                    </span>
                    </div>
              
                <div className="inputBx">
            
                    <Link to='/login' style={{textDecoration:'none',color:'black'}} ><button type="submit" value="submit" 
                    id = "submit" onClick={this.formSubmit}>Sign up</button></Link>
                    <br></br>
                    Already Register?
                    
                   <p> <Link to='/login' style={{color:'#c91e63'}} >Log in</Link></p>
                  
                </div>
                </form>
                </div>
                </div>
            </section>
            
        
        )
    }
}

export default Register
