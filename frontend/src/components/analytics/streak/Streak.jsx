
export default function Streak(){
    return(
        <div className="streak-container">
            <div className="streak-title">Current Streak</div>
            <div className="days-container">
                <div className="day-box" style={{backgroundColor:"#21c45d",color:"white"}}>M</div>
                <div className="day-box" style={{backgroundColor:"#21c45d",color:"white"}}>T</div>
                <div className="day-box" style={{backgroundColor:"#21c45d",color:"white"}}>W</div>
                <div className="day-box">T</div>
                <div className="day-box">F</div>
                <div className="day-box">S</div>
                <div className="day-box">S</div>
            </div>
        </div>
    )
}