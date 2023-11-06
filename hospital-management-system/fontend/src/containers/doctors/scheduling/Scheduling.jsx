import React from "react";
import "./scheduling.css";
import { ButtonAction, ButtonSkip, Input, Select } from "../../../components";

const Scheduling = ({ setOpenScheduling }) => {
  const doctorIdOptions = [
    { value: "Man", label: "M" },
    { value: "Woman", label: "F" },
  ];
  const handleCloseScheduling = () => {
    setOpenScheduling(false);
  };
  return (
    <div className="app__scheduling">
      <div className="app__scheduling-container">
        <h2>Doctor Scheduling Appointment</h2>

        <form>
          <div className="form-left-box">
            <div className="details-title">
              <h4> Doctor Detail</h4>
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
              <label htmlFor="doctorType"> Doctor Type</label>
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
              <label htmlFor="timeIn"> Time In:</label>
              <div>
                <input type="time" id="timeIn" />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="timeOut"> time Out:</label>
              <div>
                <input type="time" id="timeOut" />
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="availableDays"> Available Days:</label>
              <Input
                placeholder="Available Days"
                name="availableDays"
                // value={input.serviceID}
                // onChange={handleOnChange}
                // disabled={!isInputEnabled}
              />
            </div>

            <div className="input-field">
              <label htmlFor="schedulingNotes"> Schedule Notes:</label>
              <Input
                placeholder="Schedule Notes"
                name="schedulingNotes"
                // value={input.serviceID}
                // onChange={handleOnChange}
                // disabled={!isInputEnabled}
              />
            </div>
            <button className="submit-btn">Submit</button>
          </div>
          <aside>
            <div className="details-title">
              <h4> Available Days</h4>
              <div className="days-divider" />
            </div>
            <div className="input-field">
              <label htmlFor="monday">Monday:</label>
              <div>
                <input type="checkbox" id="monday" />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="tuesday">Tuesday:</label>
              <div>
                <input type="checkbox" id="tuesday" />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="monday">Wenesday:</label>
              <div>
                <input type="checkbox" id="monday" />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="thursday">Thursday:</label>
              <div>
                <input type="checkbox" id="thursday" />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="friday">Friday:</label>
              <div>
                <input type="checkbox" id="friday" />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="saturday">Saturday:</label>
              <div>
                <input type="checkbox" id="saturday" />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="sunday">Sunday:</label>
              <div>
                <input type="checkbox" id="sunday" />
              </div>
            </div>
          </aside>
        </form>

        <div className="appScheduling-table">
          <table>
            <thead>
              <tr>
                <th>Schedule ID </th>
                <th>Doctor ID </th>
                <th>Doctor In</th>
                <th>Doctor Out</th>
                <th>Doctor Available</th>
                <th>Schedule Notes</th>
              </tr>
            </thead>
            <tbody>
              {/* {!hideData &&
                  medicalSDetail.map((medicalService, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{medicalService.serviceID}</td>
                        <td>{medicalService.serviceName}</td>
                        <td>{medicalService.amount}</td>
                        <td>{medicalService.duration}</td>
                        <td>{medicalService.additionalNotes}</td>
                      </tr>
                    );
                  })} */}
              {/* {hideDataSearched &&
                  searchResult.map((medicalService, index) => {
                    return (
                      <tr className="doctor-infos" key={index}>
                        <td>{medicalService.serviceID}</td>
                        <td>{medicalService.serviceName}</td>
                        <td>{medicalService.amount}</td>
                        <td>{medicalService.duration}</td>
                        <td>{medicalService.additionalNotes}</td>
                      </tr>
                    );
                  })} */}
            </tbody>
          </table>
        </div>

        <div className="container-menu">
          <div className="container-menu-header">
            <ButtonSkip iconName="doubleLeft" color="green" />
            <ButtonSkip iconName="arrowLeft" color="blue" />
            <input type="text" placeholder="Record No" />
            <ButtonSkip iconName="arrowRight" color="blue" />
            <ButtonSkip iconName="doubleRight" color="green" />
          </div>
          <div className="container-menu-btn">
            <ButtonAction
              iconName="add"
              btnName="Add"
              color="green"
              buttonType="submit"
              // onClick={handleAddMedicalS}
            />

            <ButtonAction
              iconName="close"
              btnName="Cancel"
              color="red"
              buttonType="button"
              onClick={handleCloseScheduling}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
