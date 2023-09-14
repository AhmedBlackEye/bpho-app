interface TaskProps {
  title: string;
  tasks: string[];
  children: React.ReactNode;
}

function Task({ children }: TaskProps) {
  return <div className="">{children}</div>;
}

export default Task;
