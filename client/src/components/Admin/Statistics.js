import React, { Fragment, useState, useEffect } from "react";
import SimpleChart from "./charts/SimpleChart";
import AdminDataService from "../../services/AdminService";

export default function AdminStatistics() {
  const [userCount, setUserCount] = useState({});

  useEffect(() => {
    retrieveUserCount();
  }, []);

  const retrieveUserCount = () => {
    debugger;
    AdminDataService.getTotalUser()
      .then((response) => {
        setUserCount(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Fragment>
      <div className="container bg-white">
        <div className="py-4">
          <h1 className="text-center">Statistics</h1>
        </div>

        <div className="form-group row mx-auto my-5" style={{ width: "40%" }}>
          <h2 className="col-sm-10">Total amount of users:</h2>
          <h2 className="col-sm-2">{userCount.count}</h2>
        </div>
        <div>
          <SimpleChart />
        </div>
      </div>
    </Fragment>
  );
}
