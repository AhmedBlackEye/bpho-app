import React from "react";

interface TaskProps {
  title: string;
  tasks: string[];
  children: React.ReactNode;
}

function Task({ title, tasks, children }: TaskProps) {
  return (
    <div>
      <h2 className="center">{title}</h2>
      {children}
    </div>
  );
}

export default Task;
