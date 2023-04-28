import { useNavigate } from "react-router-dom";

function Header({ title }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        {title ? title : " POS Tagger"}
      </h1>
    </div>
  );
}

export default Header;
