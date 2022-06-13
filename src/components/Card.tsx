import React, { useRef, useState } from "react";
import styled from "styled-components";
import { TaskList } from "../App";
import Task from "./Task";

interface ICardProps {
  id: number;
  title: string;
  taskList?: TaskList[];
  onDeleteCard?: (id: number) => void;
}
const CardWrapper = styled.div`
  background: #d9dee8;
  border-radius: 5px;
  padding: 10px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
`;
const CardHeader = styled.header`
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
`;
const AddTaskWrapper = styled.div`
  display: flex;
  margin: 0 0 10px 0;
  input {
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 1px solid;
  }
  button {
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
  }
`;
const TaskDragWrapper = styled.div`
  width: 95%;
  margin: 4px 0 8px 0;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgb(9 45 66 / 25%);
  background: #fff;
  padding: 6px;
`;

const Card = (props: ICardProps) => {
  const { id, title, taskList, onDeleteCard } = props;
  const [tasks, setTasks] = useState<TaskList[]>(taskList);
  const [newTask, setNewTask] = useState<string>("");
  const currItemDragged = useRef(null);
  const currDragOverItem = useRef(null);
  const onAddTask = () => {
    const currtasks = taskList ? [...tasks] : [];
    currtasks.push({
      id: currtasks.length + 1,
      taskTitle: newTask
    });
    setNewTask("");
    setTasks(currtasks);
  };

  const onDeleteTask = (id: number) => {
    const currtasks = [...tasks].filter((task) => task.id !== id);

    setTasks(currtasks);
  };

  const onDragStart = (idx: number) => {
    currItemDragged.current = idx;
  };

  const onDragEnter = (idx: number) => {
    currDragOverItem.current = idx;
    const currtasks = [...tasks];

    const draggingItemContent = currtasks[currItemDragged.current];

    currtasks.splice(currItemDragged.current, 1);
    currtasks.splice(currDragOverItem.current, 0, draggingItemContent);

    currItemDragged.current = currDragOverItem.current;
    currDragOverItem.current = null;

    setTasks(currtasks);
  };

  const onEditTask = (id: number, updatedTaskTitle: string) => {
    const currtasks = [...tasks].map((task) => {
      if (task.id === id)
        return {
          ...task,
          taskTitle: updatedTaskTitle
        };
      return { ...task };
    });

    setTasks(currtasks);
  };

  return (
    <CardWrapper>
      <CardHeader className="cardTitle">{title}</CardHeader>
      {tasks?.length > 0 &&
        tasks.map((task, idx) => (
          <TaskDragWrapper
            key={task.id}
            draggable
            onDragOver={(e) => e.preventDefault()}
            onDragStart={(e) => onDragStart(idx)}
            onDragEnter={(e) => onDragEnter(idx)}
          >
            <Task
              id={task.id}
              title={task.taskTitle}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          </TaskDragWrapper>
        ))}
      <AddTaskWrapper>
        <input
          type="text"
          placeholder="Add Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={onAddTask}>+</button>
      </AddTaskWrapper>
      <button onClick={() => onDeleteCard(id)}>Delete</button>
    </CardWrapper>
  );
};

export default Card;
