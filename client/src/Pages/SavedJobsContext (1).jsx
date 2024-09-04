// SavedJobsContext.jsx
import React, { createContext, useState, useContext } from 'react';

const SavedJobsContext = createContext();

export const useSavedJobs = () => useContext(SavedJobsContext);

export const SavedJobsProvider = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState([]);

  const saveJob = (job) => {
    setSavedJobs((prevJobs) => [...prevJobs, job]);
  };

  return (
    <SavedJobsContext.Provider value={{ savedJobs, saveJob }}>
      {children}
    </SavedJobsContext.Provider>
  );
};
