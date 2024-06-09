import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import AddGolfCourse from './Components/AddGolfCourse';  

function App() {
  const [golfCourses, setGolfCourses] = useState([]);

  useEffect(() => {
    axios.get('/api/golf-courses')
      .then(response => setGolfCourses(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Golf Courses</h1>
        <AddGolfCourse />  {/* Include the form for adding new golf courses */}
        <ul>
          {golfCourses.map(course => (
            <li key={course._id}>{course.name} - {course.location} ({course.holes} holes)</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
