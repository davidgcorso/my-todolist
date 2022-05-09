import React, { useState, useEffect } from "react";
import { TaskBanner } from "./components/TaskBanner";
import { TaskRow } from "./components/TaskRow";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";


function App() {
  const [taskItems, setTaskItems] = useState([
    { name: "Task One Pending Example", done: false },
    { name: "Task Two Done Example", done: true },
  ]);
  const [showCompleted, setshowCompleted] = useState(true);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  };

  const toggleTask = task =>
    setTaskItems(
      taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const taskTableRows = doneValue =>
    taskItems
      .filter(task => task.done === doneValue)
      .map(task => (
        <TaskRow key={task.name} task={task} toggleTask={toggleTask} />
      ));

  return (
    <div>
      <TaskBanner />
      <div>
        <TaskCreator callback={createNewTask} />
        <table className="taskBox">
          <tbody>{taskTableRows(false)}</tbody>
        </table>
        <div className="taskBox square">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={checked => setshowCompleted(checked)}
          />
        </div>
        {showCompleted && (
          <table className="taskBox">
            <tbody>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
