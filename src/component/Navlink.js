import React from "react"
import {  Link } from "react-router-dom";

class Navlink extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <div className="navlink" >
                <div>
                    <Link className="addNew" to="/addQuestion">Start New Discussion</Link>
                    <div className="flex3">
                        <img className="commentPicture" src="./images/message.png" alt="discussion"></img>
                        <p >All Discussion</p>
                    </div>
                    <div className="flex3">
                        <img className="commentPicture" src="./images/star.png" alt="star"></img>
                        <p>Following</p>
                    </div>
                </div>
                {/* <div>
                    <ul>
                        <li>
                            FAQ'S
                        </li>
                        <li>
                            Off-Topic Chhater
                        </li>
                        <li>
                            Feedback
                        </li>
                        <li>
                            Memeber Spotlight
                        </li>
                        <li>
                            Introductions
                        </li>
                        <li>
                            Announcements
                        </li>
                        <li>
                            Showcase
                        </li>
                        <li>
                            Jobs
                        </li>
                    </ul>
                </div> */}
            </div>
        )
    }
}
export default Navlink;