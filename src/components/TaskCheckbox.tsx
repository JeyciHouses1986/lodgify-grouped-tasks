import './TaskCheckbox.css';

interface TaskCheckboxProps {
  description: string;
  checked: boolean;
  onChange: () => void;
}

export const TaskCheckbox = ({ description, checked, onChange }: TaskCheckboxProps) => {
  return (
    <label className="task-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="task-checkbox-input"
        aria-label={description}
      />
      <span className="task-checkbox-custom"></span>
      <span className="task-checkbox-label">{description}</span>
    </label>
  );
};
