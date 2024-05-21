import React from "react";
import { Button } from "../components";
import "./welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="app__welcome">
      <img
        src="https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient.jpg"
        loading="lazy"
        sizes="100vw"
        srcset="https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-500.jpg 500w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-800.jpg 800w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-1080.jpg 1080w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-1600.jpg 1600w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-2000.jpg 2000w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient.jpg 2563w"
        alt=""
        class="absolute-image"
      ></img>
      <h2>Score management system</h2>

      <Button
        text="Let's started"
        onClick={() => navigate("/connection/login")}
      />

      {/* <span className="blur"></span> */}
    </div>
  );
};

export default Welcome;
