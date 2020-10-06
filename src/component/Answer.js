import React from "react";
import {withRouter} from "react-router-dom"


class Answer extends React.Component{
    constructor(){
        super();
        this.state={
            text:'',
        }
    }
    handleInput=({target:{name, value}})=>{
        this.setState({[name]:value})
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        fetch(`http://localhost:3000/api/questions/${this.props.question._id}/answers`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": localStorage.authTokenFrontendForum
            },
            body: JSON.stringify({answer:this.state}),
        })
        .then(res=>res.json())
        .then(newAddedAnswer=>{
            this.setState({text:""})
            this.props.updateAnswer(newAddedAnswer)
        })
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h2>Please provide answer</h2>
                <textarea className="addDescription" name="text" onChange={this.handleInput}/>
                <button className="submit" type="submit" >Submit</button>
            </form>
        )
    }
}
export default withRouter(Answer);