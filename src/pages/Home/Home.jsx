import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Arrowicon from "../../assets/images/Arrow-icon.png";
import lightning from "../../assets/images/lightning.png";
import stepicn from "../../assets/images/step-icn.png";
import catelogbtn from "../../assets/images/catelog-btn.png";
import Cloudservicesbtn from "../../assets/images/Cloudservices-btn.png";
import Settinghomebtn from "../../assets/images/Setting-home-btn.png";
import Userbtn from "../../assets/images/Users-btn.png";

const Home = () => {
  const navigate = useNavigate();
  const familyName = localStorage.getItem("family_name");

  const FamilyId = localStorage.getItem("family_id");
  const UserOrgId = localStorage.getItem("user_org_id");

  const openClodeOption = JSON.parse(localStorage.getItem("openCloudOption"));
  const openUser = JSON.parse(localStorage.getItem("openUser"));

  // const token = localStorage.getItem("user-signup-token") || localStorage.getItem("user-signin-token");

  const handleLogout = async () => {
    localStorage.removeItem("user-signup-token");
    localStorage.removeItem("user-signin-token");
    navigate("/signin");
  };

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Total User",
        data: [
          1000, 3500, 2600, 2400, 1200, 6800, 4500, 2800, 5000, 2900, 2600,
          4900,
        ],
      },
      {
        name: "Total Group",
        data: [
          2500, 3500, 2700, 2900, 5000, 2600, 4500, 2900, 3600, 4500, 2800,
          2000,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      colors: ["#4C70FF", "#FF339C"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Total Usage",
        align: "left",
        style: {
          color: "#FFFFFF",
          fontFamily: "Poppins, serif",
          fontWeight: 500,
          fontSize: "18px",
        },
      },
      grid: {
        // row: {
        //     // colors: ['#f3f3f3', 'transparent'],
        //     opacity: 0.5
        // },
        show: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#AEB9E1",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#AEB9E1",
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -48,
        offsetX: -5,
        labels: {
          colors: "#AEB9E1",
        },
      },
    },
  });

  const BackToMainHome = () => {
    navigate("/dashboard/home");

    localStorage.setItem("openCloudOption", false);
    localStorage.setItem("openUser", false);

    localStorage.removeItem("family_name");
    localStorage.removeItem("family_id");
    localStorage.removeItem("user_org_id");
  };

  return (
    <>
      <div className="mt-4 pd">
        <div className="home-main-view">
          <div className="row text-center">
            <div className="col-lg-4 col-md-12 welcome-box">
              <span className="welcome-title">
                Welcome to {familyName || ""}
              </span>
              <span className="welcome-desc">
                Organize your work and improve your <br /> perfomance with us
                here.
              </span>
              <button type="button" className="journy-btn ">
                Start your journey <img src={Arrowicon} alt="" />
              </button>
            </div>
            <div className="col-lg-8 col-md-12 welcome-card justify-content-end">
              <div className="row g-3">
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="card-one cursor-pointer"
                    onClick={() => navigate("/vpc")}
                  >
                    <div className="card-main">
                      <div>
                        <p className="card-title">01</p>
                      </div>
                      <div>
                        <img src={stepicn} alt="" height={70} />
                      </div>
                    </div>
                    <div className="dummy-box"></div>
                    <div className="card-tecnical">
                      <button type="button" className="technical-btn w-100">
                        <img src={lightning} alt="" className="me-2" />{" "}
                        <p>1 Min-non technical</p>
                      </button>
                      <span className="tec-title">Setup Cloud Resources</span>
                      <span className="tec-description">
                        Deploy the Pathsdata cluster to your account using
                        cross-account access. This setup requires configuring
                        VPC, subnets, EC2 instances, and IAM profiles in your
                        account to ensure a secure and scalable cluster
                        environment. These resources will also be set up in the
                        Pathsdata account for proper integration and
                        functionality.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="card-two cursor-pointer"
                    onClick={() => navigate("/cluster")}
                  >
                    <div className="card-main">
                      <div>
                        <p className="card-title">02</p>
                      </div>
                      <div>
                        <img src={stepicn} alt="" height={70} />
                      </div>
                    </div>
                    <div className="dummy-box"></div>
                    <div className="card-tecnical">
                      <button type="button" className="technical-btn w-100">
                        <img src={lightning} alt="" className="me-2" />{" "}
                        <p>1 Min-non technical</p>
                      </button>
                      <span className="tec-title">Setup a Cluster</span>
                      <span className="tec-description">
                        Create and manage clusters to organize resources and
                        tasks more efficiently, ensuring a streamlined and
                        scalable environment.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div
                    className="card-three cursor-pointer"
                    onClick={() => navigate("/data-catalog")}
                  >
                    <div className="card-main">
                      <div>
                        <p className="card-title">03</p>
                      </div>
                      <div>
                        <img src={stepicn} alt="" height={70} />
                      </div>
                    </div>
                    <div className="dummy-box"></div>
                    <div className="card-tecnical">
                      <button type="button" className="technical-btn w-100">
                        <img src={lightning} alt="" className="me-2" />{" "}
                        <p>1 Min-non technical</p>
                      </button>
                      <span className="tec-title">Setup Data Sources</span>
                      <span className="tec-description">
                        Connect and configure your data sources for seamless
                        integration. Easily store and access family data,
                        ensuring consistency and security.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="digital-ecosystem">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 mt-4 mb-4">
              <span className="second-view-title">Manage Your </span>
              <p className="second-view-desc">
                All the tools you need to manage your services, users, and
                billing in one place.
              </p>
            </div>

            <div className="col-lg-6 mt-4 mb-4 d-lg-flex justify-content-lg-end">
              <button
                className="back-home-btn boreder-0"
                type="button"
                onClick={BackToMainHome}
              >
                Back to Main Home
              </button>
            </div>
          </div>

          <div className="row mt-4">
            <div
              className={`${
                openUser === false ? "col-lg-4" : "col-lg-3"
              } mb-4 mb-lg-5`}
            >
              <div
                className="home-card-view"
                onClick={() => navigate("/data-catalog")}
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={catelogbtn}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title">Data Source</span>
                    <p className="digital-desc">
                      Explore and manage your available products.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className='col-lg-3 mb-4 mb-lg-5'>
                            <div className="home-card-view">
                                <div className="d-flex flex-column justify-content-between">
                                    <img src={Bilingbtn} alt="" height={50} width={50} className='mb-3' />
                                    <div>
                                        <span className="digital-title"> Biling</span>
                                        <p className="digital-desc">View invoices, track payments, and manage subscriptions. </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}

            {FamilyId ? (
              ""
            ) : (
              <div
                className={`${
                  openUser === false ? "col-lg-4" : "col-lg-3"
                } mb-4 mb-lg-5`}
              >
                <div
                  className="home-card-view"
                  onClick={() => navigate("/user-management")}
                >
                  <div className="d-flex flex-column justify-content-between">
                    <img
                      src={Userbtn}
                      alt=""
                      height={50}
                      width={50}
                      className="mb-3"
                    />
                    <div>
                      <span className="digital-title"> Users</span>
                      <p className="digital-desc">
                        Control user access, permissions, and team.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {openClodeOption === true ? (
              openUser === true ? (
                <div
                  className={`${
                    openUser === false ? "col-lg-4" : "col-lg-3"
                  } mb-4 mb-lg-5`}
                >
                  <div
                    className="home-card-view"
                    onClick={() => navigate("/user-management")}
                  >
                    <div className="d-flex flex-column justify-content-between">
                      <img
                        src={Userbtn}
                        alt=""
                        height={50}
                        width={50}
                        className="mb-3"
                      />
                      <div>
                        <span className="digital-title"> Users</span>
                        <p className="digital-desc">
                          Control user access, permissions, and team.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}

            <div
              className={`${
                openUser === false ? "col-lg-4" : "col-lg-3"
              } mb-4 mb-lg-5`}
            >
              <div className="home-card-view">
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={Cloudservicesbtn}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title"> Cloud Services</span>
                    <p className="digital-desc">
                      Monitor and configure your cloud-based resources.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${
                openUser === false ? "col-lg-4" : "col-lg-3"
              } mb-4 mb-lg-5`}
            >
              <div
                className="home-card-view"
                onClick={() => navigate("/setting")}
              >
                <div className="d-flex flex-column justify-content-between">
                  <img
                    src={Settinghomebtn}
                    alt=""
                    height={50}
                    width={50}
                    className="mb-3"
                  />
                  <div>
                    <span className="digital-title"> Settings</span>
                    <p className="digital-desc">
                      Customize preferences and optimize your platform.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
