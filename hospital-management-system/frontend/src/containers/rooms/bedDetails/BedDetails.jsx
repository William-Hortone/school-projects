import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectDocAppointment } from "../../../redux/slice/doctorSlice";
import { Input, ButtonAction, ButtonSkip } from "../../../components";
import { BedMoreDetails } from "../..";
import axios from "axios";

const BedDetails = () => {
  const [openScheduling, setOpenScheduling] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [openScheduleDelete, setOpenScheduleDelete] = useState(false);
  const [addOnSubmit, setAddOnSubmit] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [allBeds, setAllBeds] = useState([]);

  const docAppointmentDetails = useSelector(selectDocAppointment);
  const [usersLength, setUsersLength] = useState(
    docAppointmentDetails.length - 1
  );
  const [lastElement, setLastElement] = useState(allBeds[usersLength]);

  // To Get all the available beds
  const API_URL = "http://localhost:3001/getBedsDetails";

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    setAllBeds(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setUsersLength(allBeds.length - 1);
  }, [allBeds.length]);

  useEffect(() => {
    setLastElement(allBeds[usersLength]);
  }, [usersLength, allBeds]);

  const navigate = useNavigate();

  // const lastElement = docAppointmentDetails[docAppointmentDetails.length - 1];

  const handleShowScheduling = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(true);
  };

  const showSchedulingToEdit = () => {
    setOpenScheduling(true);
    setOpenPage(true);
    setAddOnSubmit(false);
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleClose = () => {
    navigate("/adminDashboard/dashboard");
  };
  const handleViewAll = () => {
    navigate("/VizAllBed");
  };
  const showSchedulingToDelete = () => {
    setOpenScheduleDelete(true);
    setOpenPage(true);
    setAddOnSubmit(false);
  };

  // Display the infos of the preview element
  const handleShowPrev = () => {
    if (usersLength > 0) {
      setUsersLength(usersLength - 1);
      if (usersLength == 0) {
        return;
      }
    }
  };
  const handleShowFirstEl = () => {
    setUsersLength(0);
  };

  // Display the infos of the next element
  const handleShowNext = () => {
    if (usersLength < allBeds.length - 1) {
      setUsersLength(usersLength + 1);
      if (usersLength == allBeds.length - 1) {
        return;
      }
    }
  };
  const handleShowLastEl = () => {
    setUsersLength(allBeds.length - 1);
  };

  return (
    <div className="appScheduling">
      <h2 className="page-title">BED DETAILS</h2>
      <div className="appScheduling-container">
        <div className="details-title">
          <h4>Bed infos</h4>
          <div className="divider" />
        </div>
        <form>
          <div className="input-field">
            <label form="schedulingId">Bed ID:</label>
            <Input
              inputDisabled="true"
              placeholder="Scheduling ID"
              name="schedulingID"
              value={lastElement ? lastElement.bedID : ""}
            />
          </div>
          <div className="input-field">
            <label form="doctorId"> Room / Ward ID:</label>
            <Input
              placeholder="Doctor ID"
              name="doctorID"
              inputDisabled="true"
              value={lastElement ? lastElement.bedPlace : ""}
            />
          </div>
          <div className="input-field">
            <label form="doctorId"> Bed Description :</label>
            <textarea
              name=""
              id=""
              cols="39"
              rows="10"
              value={lastElement ? lastElement.bedDesc : ""}
              // disabled
            ></textarea>
          </div>
        </form>
      </div>

      <div className="appScheduling-table">
        <table>
          <thead>
            <tr>
              <th>Bed ID </th>
              <th>Bed Place </th>
              <th>Bed Description</th>
            </tr>
          </thead>
          <tbody>
            {allBeds.map((bed, index) => {
              return (
                <tr className="doctor-infos" key={index}>
                  <td>{bed.bedID}</td>
                  <td>{bed.bedPlace}</td>
                  <td>{bed.bedDesc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Container buttons */}
      <div className="appScheduling-container-menus">
        <div className="appSchedule-container-menu-header">
          <ButtonSkip
            handleOnClick={handleShowFirstEl}
            iconName="doubleLeft"
            color="green"
          />
          <ButtonSkip
            handleOnClick={handleShowPrev}
            iconName="arrowLeft"
            color="blue"
          />
          <input type="text" placeholder="Record No" />
          <ButtonSkip
            handleOnClick={handleShowNext}
            iconName="arrowRight"
            color="blue"
          />
          <ButtonSkip
            handleOnClick={handleShowLastEl}
            iconName="doubleRight"
            color="green"
          />
        </div>
        <div className="container-menu-btn">
          <ButtonAction
            iconName="add"
            btnName="Add"
            color="green"
            buttonType="submit"
            onClick={handleShowScheduling}
          />
          <ButtonAction
            iconName="edit"
            btnName="Edit"
            color="green"
            onClick={showSchedulingToEdit}
            buttonType="submit"
          />
          <ButtonAction
            iconName="delete"
            btnName="Delete"
            buttonType="button"
            color="red"
            onClick={showSchedulingToDelete}
          />
          <ButtonAction
            iconName="refresh"
            btnName="Refresh"
            color="blue"
            buttonType="button"
            onClick={handleRefresh}
          />

          <ButtonAction
            iconName="close"
            btnName="Close"
            color="red"
            buttonType="button"
            onClick={handleClose}
          />
          <ButtonAction
            iconName="all"
            btnName="View All"
            color="blue"
            buttonType="button"
            onClick={handleViewAll}
          />
        </div>
      </div>

      {/* Open the scheduling component  */}
      {/* <div
        className={
          openScheduling || openScheduleDelete
            ? "appScheduling-wrapper ActiveScheduling"
            : "appScheduling-wrapper"
        }
      > */}

      {openPage && (
        <div className="popup-wrapper">
          <div className="popup">
            <BedMoreDetails
              setOpenScheduling={setOpenScheduling}
              setOpenScheduleDelete={setOpenScheduleDelete}
              openScheduleDelete={openScheduleDelete}
              addOnSubmit={addOnSubmit}
              setOpenPage={setOpenPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BedDetails;
