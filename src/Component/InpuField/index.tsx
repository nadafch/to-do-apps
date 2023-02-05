import React, { useRef } from "react";
import "./index.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form className="input" onSubmit={(e) => handleAdd(e)}>
      <input
        type="input"
        ref={inputRef}
        value={todo}
        onChange={(_e) => setTodo(_e.target.value)}
        placeholder="Enter To-Do-List"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        OK
      </button>
    </form>
  );
};

export default InputField;
