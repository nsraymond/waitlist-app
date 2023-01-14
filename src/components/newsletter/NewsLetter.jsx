import style from "./NewsLetter.module.css";
import {useState, useEffect} from "react"
import axios from "axios";
import PersonCard from "./PersonCard";
import Register from "../register/register";

const NewsLetter=()=>{

    // initializing the states
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);

    // fetching users from the database
    const url = 'http://localhost:5000/users';
    const getAllUsers = () => {
    axios.get(`${url}`)
    .then((response) => {
      const allUsers = response.data.User;
      console.log(allUsers)
      setUsers(allUsers);
    })
    .catch(error => console.error(`Error: ${error}`));
    }

    useEffect(() => {
      getAllUsers();
    }, [message]);

//    handling modal
    const handleModal=(value)=>{
        setModal(value);
    }

    // handling message
    const handleMessage=(value)=>{
        setMessage(value)
    }


    return (
        <main className={style.main}>
            <div>
                <button onClick={()=>{handleModal(true)}} className={style.main__btn}>Join Our Waitlist</button>
            </div>
            <hr></hr>
            <div className={style.list}>

                {users.map((user)=>(
                    <PersonCard person={user} key={user.id}/>
                ))}
            </div>

            <Register modal={modal} onhandleModal={handleModal} onhandleMessage={handleMessage} />
        </main>
        )
}

export default NewsLetter;