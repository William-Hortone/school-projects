import React from "react";
import "./scheduling.css";
import { Input, Select } from "../../../components";

const Scheduling = () => {
  const doctorIdOptions = [
    { value: "Man", label: "M" },
    { value: "Woman", label: "F" },
  ];
  return (
    <div className="app__scheduling">
      <div className="app__scheduling-container">
        <h2>Doctor Scheduling Appointment</h2>

        <form>
          <div className="form-left-box">
            <div className="details-title">
              <h4> Personal Detail</h4>
              <div className="divider" />
            </div>
            <div className="input-field">
              <label form="schedulingId"> Scheduling ID:</label>
              <Input
                placeholder="Scheduling ID"
                name="schedulingID"
                // value={input.serviceID}
                // onChange={handleOnChange}
                // disabled={!isInputEnabled}
              />
            </div>
            <div className="input-field">
              <label form="schedulingId"> Scheduling ID:</label>
              <input type="date" name="" id="" />
            </div>
            <div className="input-field">
              <label form="doctorType"> Doctor Type</label>
              <div>
                {/* <Select
                //   name="doctorType"
                //   label="doctorType"
                //   value={input.doctorType}
                //   options={doctorIdOptions}
                //   handleOnChange={handleOnChange}
                /> */}
                <button>See all</button>
              </div>
            </div>

            <div className="input-field">
              <label form="availableDays"> Available Days:</label>
              <Input
                placeholder="Available Days"
                name="availableDays"
                // value={input.serviceID}
                // onChange={handleOnChange}
                // disabled={!isInputEnabled}
              />
            </div>

            <div className="input-field">
              <label form="schedulingNotes"> Schedule Notes:</label>
              <Input
                placeholder="Schedule Notes"
                name="schedulingNotes"
                // value={input.serviceID}
                // onChange={handleOnChange}
                // disabled={!isInputEnabled}
              />
            </div>
          </div>
          <aside>
            <div className="details-title">
              <h4> Available Days</h4>
              <div className="divider" />
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default Scheduling;
