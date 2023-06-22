import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmpListing = () => {
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };
  const Removefunction = async (id) => {
    if (window.confirm("Do you want to remove?")) {
      await axios.delete(`http://localhost:8082/deleteemployee/${id}`);

      window.location.reload();
      alert("Removed successfully.");
    }
  };

  const logOut = () => {
    navigate("/");
  };

  useEffect(() => {
    loadUsers();
    console.log(empdata);
  }, []);

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:8082/employees");
    empdatachange(res.data);
  };

  const renderUserImage = (item) => {
    if (item.image && typeof item.image === 'string') {
      const blobData = atob(item.image);
      const arrayBuffer = new ArrayBuffer(blobData.length);
      const uintArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < blobData.length; i++) {
        uintArray[i] = blobData.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  
      const base64String = URL.createObjectURL(blob);
      return (
        <img
          src={base64String}
          alt="User"
          className="user-image"
        //   alt="User" 
          style={{height:60, width:60,borderRadius:"50%"}}
        />
      );
    } else if (item.image && Array.isArray(item.image)) {
      const base64String = btoa(String.fromCharCode.apply(null, item.image));
      return (
        <img
          src={`data:image/jpeg;base64,${base64String}`}
          alt="User"
          className="user-image custom-image-style"
          style={{height:60, width:60,borderRadius:"50%"}}
        />
      );
    }
    return null;
  };
  return (
    <div>
    <nav style={{marginLeft:"-1100px",backgroundColor:"black"}} >
          <Link to = "/employees"style={{color:"yellow"}} >Home</Link>
          <Link to = "/employees/employee/create" style={{margin:"20px",color:"yellow"}}>Add</Link>
        </nav>
      
    <div className="container">
       
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="logout-add-btn">
            <div className="divbtn">
              <Link to="/employees/employee/create" className="btn btn-primary">
                Add New (+)
              </Link>
            </div>
            <div>
              <button className="btn btn-primary" onClick={logOut}>
                Logout
              </button>
            </div>
          </div>

          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Image</td>
                <td>Sex</td>
                <td>DOB</td>
                <td>Salary</td>
                <td>Department</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((item,index) => (
                  <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{renderUserImage(item)}</td>
                    <td>{item.sex}</td>
                    <td>{item.dob}</td>
                    <td>{item.salary}</td>
                    <td>{item.department}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-primary"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                        className="btn btn-primary"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmpListing;
