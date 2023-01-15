import React from "react";
import {FaTimes} from 'react-icons/fa';
import { useState } from "react";
import style from './register.module.css';
import modals from './Modal.module.css';

// handling the modal
const Register = ({modal, onhandleModal, onhandleMessage}) => {
    const [newUser, setNewUser] = useState({firstName:null, lastName:null, email:null});

    const handleChange=(event)=>{
        const {name, value} = event.target;
        setNewUser((prevState)=>{
            return{
            ...prevState, [name]: value
            }})
    }

    // handling the form and making the post request
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newUser)
        fetch("http://localhost:5000/register", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(newUser),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            onhandleMessage(JSON.stringify(data));
            onhandleModal(false);
        });
    }

    if(modal === true){
        return (
            <div className={modals.modal}>
                <div className={modals.overlay} onClick={()=>{onhandleModal(false)}}></div>
                <div className={modals.modal__content}>
                    <div className={style.register__card}>

                    <div className={style.formhead}>
                        <p>Get a Lovly App Link</p> <FaTimes onClick={()=>{onhandleModal(false)}} className={style.cancle}/>
                    </div>
                    <p className={style.p}>Subscribe and recieve our newsletters to follow the news about our fresh.</p>

                    <form onSubmit={handleSubmit} method="POST">
                    <div className={style.names} id='name-input'>
                        <input type="text" name="firstName" onChange={handleChange} placeholder="Type your first name" required/>
                        <input type="text" name="lastName" onChange={handleChange} placeholder="Type your last name" required/>
                    </div>

                    <div className={style.joint}>
                    <input className={style.jointInput} id='email-input' type="email" name="email" onChange={handleChange} placeholder="Type your email" required/>
                    <button type="submit" className={style.label}>Subscribe</button>
                    </div>
                    
                    </form>


                    </div>
                </div>
            </div>

        )
    }else {
        return (
        <div></div>
        );
    }
    
}

export default Register;