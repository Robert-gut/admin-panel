import "./Nope.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nope = () => 
{
  const [disabled, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setDisable(true);
    navigate("/admin");
  };

  return (
    <div className='ebox'>
      <div className='eitem'>
        <p id='error'>
          E <span>r</span>ror
        </p>
        <p id='code'>
          4<span>0</span>
          <span>4</span>
        </p>
      </div>

      <button
        className='btn-from-error'
        disabled={disabled}
        onClick={handleClick}
      >
        turn back
      </button>
    </div>
  );
};

export default Nope