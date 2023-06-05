import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmpCreate = () => {
  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [sex, sexchange] = useState("");
  const [dob, dobchange] = useState("");
  const [salary, salarychange] = useState("");
  const [department, departmentchange] = useState("Sales");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const empdata = { name, sex, dob, salary, department, active };
    await axios.post("http://localhost:8082/employee", empdata);
    alert("Saved successfully.");
    navigate("/employees");
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Create</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {/* {name.length == 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )} */}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group radio-div">
                      <label>Sex: </label>
                      <input
                        required
                        value="M"
                        type="radio"
                        onChange={(e) => sexchange(e.target.value)}
                        name="gender"
                        className="radio-btn"
                      />
                      Male
                      <input
                        required
                        value="F"
                        type="radio"
                        onChange={(e) => sexchange(e.target.value)}
                        name="gender"
                        className="radio-btn"
                      />
                      Female
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>DOB</label>
                      <input
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => dobchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group salary-div">
                      <label>Salary</label>
                      <input
                        required
                        value={salary}
                        type="number"
                        onChange={(e) => salarychange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="department">Department</label>
                      <select
                        name="department"
                        onChange={(e) => departmentchange(e.target.value)}
                        className="form-select"
                      >
                        <option value="Sales">Sales</option>
                        <option value="Hr">Hr</option>
                        <option value="Accounts">Accounts</option>
                      </select>
                    </div>
                  </div>

                  {/* <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        checked={active}
                        onChange={(e) => activechange(e.target.checked)}
                        type="checkbox"
                        className="form-check-input"
                      ></input>
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div> */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/employees" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpCreate;
