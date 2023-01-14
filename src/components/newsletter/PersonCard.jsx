import style from "./NewsLetter.module.css"

const PersonCard=({person})=>{

    return (
        // rendering the list of persons
        <div className={style.person} key={person.id}>
            <p>{person.firstName[0].toLocaleUpperCase()}</p>
            <div>
                <h3 className={style.fullname}>{`${person.firstName} ${person.lastName}`}</h3>
                <h6 className={style.email}>{person.email}</h6>
            </div>
        </div>
    )
}

export default PersonCard;