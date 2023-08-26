import { useEffect, useState } from 'react'
import { getThisDayEvents, getFormatedDay } from './functions'

function App() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    getEvents(new Date());
  }, []);

  const getEvents = (day) => {
    getThisDayEvents(getFormatedDay(day)).then((res) => {
      setEvents(res);
    });
  };

  console.log(events);
  return (
    <div>
    </div>
  )
}

export default App
