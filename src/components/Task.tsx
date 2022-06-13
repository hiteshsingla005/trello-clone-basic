import React, { useState } from "react";
import styled from "styled-components";

interface ITaskProps {
  id: number;
  title: string;
  onEdit?: (id: number, updatedTaskTitle: string) => void;
  onDelete?: (id: number) => void;
}

const TaskWrapper = styled.div`
  display: flex;
  span {
    flex-basis: 75%;
    overflow-wrap: wrap;
    font-size: 14px;
    word-wrap: break-word;
    max-width: 68%;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 1px solid;
    max-width: 82%;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  margin-left: 5px;
  justify-content: space-between;
  cursor: pointer;
  button {
    border: none;
    background: transparent;
    cursor: pointer;
    &.delete {
      color: #ff0000;
    }
  }
`;

const Task = (props: ITaskProps) => {
  const { id, title, onEdit, onDelete } = props;
  const [taskText, setTaskText] = useState<string>(title);
  const [isEditEnabled, setEditEnabled] = useState<boolean>(false);

  const onFinishEditClick = (id: number) => {
    setEditEnabled(false);
    onEdit(id, taskText);
  };
  return (
    <TaskWrapper>
      {!isEditEnabled && <span>{title}</span>}
      {isEditEnabled && (
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      )}
      <ButtonContainer>
        {!isEditEnabled && (
          <>
            <button onClick={() => setEditEnabled(true)}>Edit</button>
            <button className="delete" onClick={() => onDelete(id)}>
              X
            </button>
          </>
        )}
        {isEditEnabled && (
          <button onClick={() => onFinishEditClick(id)}>Ok</button>
        )}
      </ButtonContainer>
    </TaskWrapper>
  );
};

export default Task;
