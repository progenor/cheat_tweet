import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modalAtom";
const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);

  return (
    <div>
      <h1>Comment Modal</h1>
      {open ? <p>Modal is open</p> : <p>Modal is closed</p>}
    </div>
  );
};

export default CommentModal;
