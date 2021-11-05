import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
 const {value,onChange} = props;
  console.log("props", props);
  const ParsedInterviewers = props.interviewers.map((interviewer) =>
    <InterviewerListItem
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === value}
    setInterviewer={() => onChange(interviewer.id)}
  
    />);

  
  return (
    <>
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {ParsedInterviewers}
  </ul>
</section>
    </>
  )
}


//Validates interviewers is an array that IS required
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};