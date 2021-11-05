import React, { useState } from "react";
import 'components/Appointment/styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


 

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR";

  

  console.log( "Props +++>++++>>>", props.id)
  

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
    const {interview} = props;
    console.log("Mode ----------",mode)
    const student = interview && interview.student;

    const interviewerId = interview && interview.interviewer &&interview.interviewer.id;

    
  function save(name, interviewer) {
    // console.log("name",name,"Interviewer",interviewer)
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id,interview)
    .then(result => transition(SHOW))
    .catch((err) => transition(ERROR_SAVE,true));
    // console.log(interview)
  }

  function confirm() {
    
    transition(CONFIRM, true);
  } 

  function remove() {
    
    transition(DELETING);

    props.deleteInterview(props.id)
    .then((result) => {
      transition(EMPTY)
    })
    .catch((err) => {
     console.log("inside catch block !!!!!!!!!!!!!!!!!")
     
      transition(ERROR_DELETE, true)
    });
    
  }

  function edit() {
    transition(EDIT);
  }
  return (
    
    <article className="appointment">
      
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (

      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={confirm}
        onEdit={edit}
      />
      )}

      {(mode === CREATE || mode === EDIT) && (
        <Form 
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        student={student}
        interviewer={interviewerId}
        />
      ) }
      {mode === SAVING && 
      <Status
      message="Saving"
      />}

      {mode === DELETING && 
      <Status 
      message="DELETING"
      />
      }

      {mode === CONFIRM && 
      <Confirm
      message="Are you sure you would like to proceed"
      onCancel={() => back()}
      onConfirm={remove}
      />
      }

      {mode === ERROR_DELETE && 
      <Error 
      message="Error deleting"
      onClose={back}
      />
      }

      {mode === ERROR_SAVE && 
      <Error 
      message="error saving"
      onClose={back}
      />
      }
      
      
      
      
      
      
      </article>
  );
}