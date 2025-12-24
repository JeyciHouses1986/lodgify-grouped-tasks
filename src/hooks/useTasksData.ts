import { useState, useEffect } from 'react';
import type { GroupedTasksData } from '../types';

const API_URL = 'https://gist.githubusercontent.com/huvber/ba0d534f68e34f1be86d7fe7eff92c96/raw/98a91477905ea518222a6d88dd8b475328a632d3/mock-progress';

export const useTasksData = () => {
  const [data, setData] = useState<GroupedTasksData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch tasks data');
        }

        const jsonData: GroupedTasksData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleTask = (groupIndex: number, taskIndex: number) => {
    setData(prevData => {
      const newData = [...prevData];
      const group = { ...newData[groupIndex] };
      const tasks = [...group.tasks];
      tasks[taskIndex] = { ...tasks[taskIndex], checked: !tasks[taskIndex].checked };
      group.tasks = tasks;
      newData[groupIndex] = group;
      return newData;
    });
  };

  return { data, loading, error, toggleTask };
};
