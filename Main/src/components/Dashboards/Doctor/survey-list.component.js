import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import userContext from '../../../context/UserContext';

const Survey = (props) => (
  <tr>
    <td>{props.survey.paID}</td>
    <td>{JSON.parse(props.survey.result).name}</td>
    <td>{Date(JSON.parse(props.survey.result).birthdate)}</td>
    <td>{JSON.parse(props.survey.result).symptom}</td>
    <td>
      <Link to={"/viewEdit/"+props.survey._id}> View </Link>|
      <a href="#" onClick={() => { props.deleteSurvey(props.survey._id) }}> Delete </a>
    </td>
  </tr>
)

export default class SurveyList extends Component {
  constructor(props) {
    super(props);
    
    this.deleteSurvey = this.deleteSurvey.bind(this);

    this.state = {surveys: []};
  }

  async componentDidMount() {
    // axios.get('http://localhost:5000/API/survey/')
    const response = await axios.get('/API/survey/')
    this.setState({ surveys: response.data })
  }

  async deleteSurvey(id) {
    // axios.delete('http://localhost:5000/API/survey/'+id)
    await axios.delete('/API/survey/'+id)

    this.setState({
      surveys: this.state.surveys.filter(el => el._id !== id)
    })
  }

  surveyList() {
    return this.state.surveys.map(currentSurvey => {
      return <Survey survey={currentSurvey} deleteSurvey={this.deleteSurvey} key={currentSurvey._id}/>;
    })
  }

  render() {
    return (
      <div>
        <br/>
        <h4>Logged Survey Result</h4>
        <table className="table" style = {{tableLayout: "fixed", wordWrap: "break-word"}}>
          <thead className="thead-dark">
            <tr >
              <th>Patient ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>symptom(s)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.surveyList() }
          </tbody>
        </table>
      </div>
    )
  }
}
