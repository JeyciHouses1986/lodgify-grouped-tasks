import { useState } from 'react';
import { TaskCheckbox } from './TaskCheckbox';
import type { Task } from '../types';
import { isGroupComplete } from '../utils/progressCalculator';
import './TaskGroup.css';

interface TaskGroupProps {
  name: string;
  tasks: Task[];
  onTaskToggle: (taskIndex: number) => void;
}

export const TaskGroup = ({ name, tasks, onTaskToggle }: TaskGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isComplete = isGroupComplete(tasks);

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div className={`task-group ${isComplete ? 'task-group--complete' : ''}`}>
      <div
        className="task-group-header"
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`group-content-${name}`}
      >
        <div className="task-group-header-left">
          <svg
            className="task-group-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 2H14C15.1046 2 16 2.89543 16 4V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4C4 2.89543 4.89543 2 6 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M8 6H12M8 10H12M8 14H10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="task-group-name">{name}</span>
        </div>
        <div className="task-group-header-right">
          <span className="task-group-toggle">
            {isExpanded ? 'Hide' : 'Show'}
          </span>
          <svg
            className={`task-group-chevron ${isExpanded ? 'task-group-chevron--expanded' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {isExpanded && (
        <div
          className="task-group-content"
          id={`group-content-${name}`}
        >
          {tasks.map((task, index) => (
            <TaskCheckbox
              key={`${name}-task-${index}`}
              description={task.description}
              checked={task.checked}
              onChange={() => onTaskToggle(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
