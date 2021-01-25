import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'
import {NotificationContainer, NotificationManager} from 'react-notifications';

export default function Register() {
    useEffect(() => {
        if (localStorage.getItem('user_info')) {
            history.push('./add')
        }
    }, [])
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const history=useHistory();
    async function signUp()
    {
        // let item = {name, password, email}
        // let result = await fetch("http://127.0.0.1:8000/api/register",{
        //     method:'Post',
        //     headers:{
        //         "Content-Type":"application/json",
        //         "Accept":"application/json"
        //     },
        //     body:JSON.stringify(item)
        // })
        // result=await result.json();
        // localStorage.setItem("user_info",JSON.stringify(result));
        // history.push("/add")

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/register/',
            data: {"name": name,"email": email, "password":password}
        })
        .then(response => {
            // console.log(response, 'm in')
            localStorage.setItem("user_info",JSON.stringify(response.data));
            history.push("/add")
        }) 
        .catch(error => {
            NotificationManager.error(<b>{error}</b>);
        })
    }
    return (
        <>
        <Header />

        <div className="col-sm-6 offset-sm-3">
            <h1>User Sign Up</h1>
            <br />
            <input type="text" value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)} className="form-control" />
            <br />
            <input type="text" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="form-control" />
            <br />
            <input type="text" value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} className="form-control" />
            <br />
            <button onClick={signUp} className="btn btn-primary"> Sign up</button>
            <NotificationContainer />

        </div>
        </>
    )
}
