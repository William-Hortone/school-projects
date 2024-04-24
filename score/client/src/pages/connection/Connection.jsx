import React from "react";
import { Outlet } from "react-router-dom";
import "./connection.css";

const Connection = () => {
  return (
    <div className="app__connection">
      <img
        src="https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient.jpg"
        loading="lazy"
        sizes="100vw"
        srcset="https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-500.jpg 500w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-800.jpg 800w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-1080.jpg 1080w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-1600.jpg 1600w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient-p-2000.jpg 2000w, https://assets-global.website-files.com/6471ddcb5282041b072c6552/64a6d9e3b3affa8513290f40_account-gradient.jpg 2563w"
        alt=""
        class="absolute-image"
      ></img>
      {/* <h2>Connection</h2> */}
      <div className="app__connection-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Connection;
