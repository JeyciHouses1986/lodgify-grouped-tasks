import { ProgressBar } from './components/ProgressBar';
import { TaskGroup } from './components/TaskGroup';
import { useTasksData } from './hooks/useTasksData';
import { calculateProgress } from './utils/progressCalculator';
import './App.css';

function App() {
  const { data, loading, error, toggleTask } = useTasksData();

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  const progress = calculateProgress(data);

  return (
    <div className="app-container">
      <main className="app-content">
        <h1 className="app-title">Lodgify Grouped Tasks</h1>
        <ProgressBar progress={progress} />
        <div className="task-groups-container">
          {data.map((group, groupIndex) => (
            <TaskGroup
              key={`group-${groupIndex}`}
              name={group.name}
              tasks={group.tasks}
              onTaskToggle={(taskIndex) => toggleTask(groupIndex, taskIndex)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
