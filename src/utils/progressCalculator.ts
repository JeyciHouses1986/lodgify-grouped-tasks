import type { GroupedTasksData } from '../types';

export const calculateProgress = (data: GroupedTasksData): number => {
  if (!data || data.length === 0) return 0;

  const totalValue = data.reduce((groupSum, group) => {
    return groupSum + group.tasks.reduce((taskSum, task) => taskSum + task.value, 0);
  }, 0);

  if (totalValue === 0) return 0;

  const checkedValue = data.reduce((groupSum, group) => {
    return groupSum + group.tasks.reduce((taskSum, task) => {
      return task.checked ? taskSum + task.value : taskSum;
    }, 0);
  }, 0);

  const progress = (checkedValue * 100) / totalValue;
  return Math.round(progress);
};

export const isGroupComplete = (tasks: { checked: boolean }[]): boolean => {
  return tasks.length > 0 && tasks.every(task => task.checked);
};
