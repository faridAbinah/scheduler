import axios from "axios";
import { useState, useEffect } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      1: {
        id: 1,
        time: "12pm",
        interview: null,
      },
    },
    interviewer: null,
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({
        ...state,
        appointments,
        days: updatedDaySpots(state.days, appointments),
      });
    });
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        days: updatedDaySpots(state.days, appointments),
      });
      return res;
    });
  }
  const remainingDaySpots = (toDay, appointments) => {
    let availSpots = 0;

    for (const item of toDay.appointments) {
      if (!appointments[item].interview) {
        availSpots++;
      }
    }
    return availSpots;
  };

  const updatedDaySpots = (toDay, appointments) => {
    const updatedDays = toDay.map((day) => ({
      ...day,
      spots: remainingDaySpots(day, appointments),
    }));

    return updatedDays;
  };

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
};

export default useApplicationData;
