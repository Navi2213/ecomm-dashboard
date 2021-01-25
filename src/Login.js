import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useHistory } from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios'

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user_info')) {
            history.push('./add')
        }
    }, [])

    async function login() {
        // let item = { email, password }
        // let result = await fetch('http://127.0.0.1:8000/api/login',{
        //     method:'Post',
        //     headers:{
        //         "Content-Type":"application/json",
        //         "Accept":"application/json"
        //     },
        //     body:JSON.stringify(item)
        // });
        // result=await result.json();
        // console.log(result);

        // localStorage.setItem("user_info",JSON.stringify(result));
        // history.push("/add")
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/login/',
            data: {"email": email, "password":password}
        })
        .then(response => {
            localStorage.setItem("user_info",JSON.stringify(response.data));
            history.push("/add")
        }) 
        .catch(error => {
            NotificationManager.error(<b>Email or Password not match!</b>);
        })
            //  await axios.post('http://127.0.0.1:8000/api/login', {
            //     email,
            //     password
            // });
            // if (response.data.error) {
            //     console.log('catch error');
            //     NotificationManager.error(<b>Email or Password not match!</b>);
            //     // return toast.error(<b>Email or Password not match!</b>);

            // } else {
            //     NotificationManager.success( 'matched!');
            //     console.log(response.data);
            // }

    }

    return (
        <div>
            <Header />
            <div className="col-sm-4 offset-sm-4">
                <h1>Login page</h1>
                <br />
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                <br />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                <br />
                <br />
                <button onClick={login} className="btn btn-primary"> Login</button>
                <NotificationContainer />
            </div>
        </div>
    )
}
