import React, { useState } from "react";

const Form = () => {
  //   const [gender, setGender] = useState("");

  //   const handleGenderChange = (event) => {
  //     setGender(event.target.value);
  //   };

  // const [selectedHobbies, setSelectedHobbies] = useState([]);

  // const handleCheckboxChange = (event) => {
  //   const hobby = event.target.value;
  //   if (event.target.checked) {
  //     setSelectedHobbies([...selectedHobbies, hobby]);
  //   } else {
  //     setSelectedHobbies(selectedHobbies.filter((item) => item !== hobby));
  //   }
  // };
  return (
    <>
      <section>
        <h2> User Registration</h2>
        <form>
          <div className="field-wrapper">
            <div className="label">
              <label htmlFor="name">Name</label>
            </div>
            <input
              className="input"
              type="text"
              placeholder="Your name"
              id="name"
            />
          </div>
          <div className="field-wrapper">
            <div className="label">
              <label htmlFor="password">Password</label>
            </div>
            <input
              className="input"
              type="password"
              placeholder="Your Password"
              id="password"
            />
          </div>
          <div className="field-wrapper">
            <div className="label">
              <label htmlFor="cPassword">Confirm Password</label>
            </div>
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              id="cPassword"
            />
          </div>
          <div className="field-wrapper wrapper">
            <div className="label">
              <label htmlFor="gender">Gender</label>
            </div>
            <div>
              {/* <fieldset id="gender"> */}
              <label htmlFor="male">Male</label>
              <input
                className="second-input"
                type="radio"
                value="Male"
                name="gender"
                id="male"
                // checked={gender === 'Male'}
                // onChange={handleGenderChange}
              />

              <label htmlFor="female">Female</label>
              <input
                className="second-input"
                type="radio"
                value="Female"
                name="gender"
                id="female"
                //   checked={gender === "Female"}
                //   onChange={handleGenderChange}
              />
              {/* </fieldset> */}
            </div>
          </div>
          <div className="field-wrapper">
            <div className="label">
              <label htmlFor="occupation">Occupation</label>
            </div>
            <select className="select">
              <option value="Company employee">Company employee</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>

          <div className="field-wrapper">
            <div className="label">
              <label htmlFor="phone">Phone Number</label>
            </div>
            <input
              className="input"
              type="tel"
              //   value="Female"
              placeholder="Phone number"
              name="phone"
              id="phone"
            />
          </div>
          <div className="field-wrapper">
            <div className="label">
              <label htmlFor="email">Email</label>
            </div>
            <input
              className="input"
              type="email"
              //   value="Female"
              placeholder="Your Email"
              name="Email"
              id="male"
            />
          </div>

          <div className="field-wrapper wrapper">
            <div className="label">
              <label htmlFor="cPassword">Interest and Hobbies</label>
            </div>
            <div>
              <label htmlFor="sport">Sport</label>
              <input
                className="second-input"
                type="checkbox"
                value="Sport"
                id="sport"
                name="hobbies"
              />
              <label htmlFor="reading">Reading</label>
              <input
                className="second-input"
                type="checkbox"
                value="Reading"
                id="reading"
                name="hobbies"
              />
              <label htmlFor="traveling">Traveling</label>
              <input
                className="second-input"
                type="checkbox"
                value="Traveling"
                id="traveling"
                name="hobbies"
                //         onChange={handleCheckboxChange}
                //   checked={selectedHobbies.includes('Traveling')}
              />
              <label htmlFor="food">Delicious Food</label>
              <input
                className="second-input"
                type="checkbox"
                value="DeliciousFood"
                id="food"
                name="hobbies"
                //         onChange={handleCheckboxChange}
                //   checked={selectedHobbies.includes('DeliciousFood')}
              />
            </div>
          </div>

          <div className="field-wrapper">
            <div className="label">
              <label htmlFor="intro">Self Introduction</label>
            </div>
            <textarea
              cols="50"
              rows="5"
              placeholder="Self introduction"
            ></textarea>
          </div>

          <button className="btn" type="submit">
            Register
          </button>
        </form>
      </section>
    </>
  );
};

export default Form;
