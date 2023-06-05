import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();

  const [id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [sex, sexchange] = useState("");
  const [dob, dobchange] = useState("");
  const [salary, salarychange] = useState("");
  const [department, departmentchange] = useState("");
  const [active, activechange] = useState(true);
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.get(`http://localhost:8082/employee/${empid}`);
    idchange(res.data.id);
    namechange(res.data.name);
    sexchange(res.data.sex);
    dobchange(res.data.dob);
    salarychange(res.data.salary);
    departmentchange(res.data.department);

    console.log(res.data.dob);
  };

  const isRadio = (val) => {
    if (val == sex) {
      return true;
    }
    return false;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const empdata = { id, name, sex, dob, salary, department, active };

    await axios.put(`http://localhost:8082/editemployee/${empid}`, empdata);
    alert("Saved successfully.");
    navigate("/employees");
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card edit-card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
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
                    </div>
                  </div>
                  <div className="form-group radio-div">
                    <label>Sex: </label>
                    <input
                      required
                      value="M"
                      type="radio"
                      onChange={(e) => sexchange(e.target.value)}
                      name="gender"
                      className="radio-btn"
                      checked={isRadio("M")}
                    />
                    Male
                    <input
                      required
                      value="F"
                      type="radio"
                      onChange={(e) => sexchange(e.target.value)}
                      name="gender"
                      className="radio-btn"
                      checked={isRadio("F")}
                    />
                    Female
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>DOB</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => dobchange(e.target.value)}
                        className="form-control"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        required
                        type="number"
                        value={salary}
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
                        value={department}
                      >
                        <option value="Sales">Sales</option>
                        <option value="Hr">Hr</option>
                        <option value="Accounts">Accounts</option>
                      </select>
                    </div>
                  </div>
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

export default EmpEdit;
