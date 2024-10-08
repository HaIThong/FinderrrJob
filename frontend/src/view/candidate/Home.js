import axios from "axios";
import { FaBriefcase, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BsCaretLeft,
  BsCaretRight,
  BsCurrencyDollar,
  BsGeoAlt,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleFindJobClick = () => {
    navigate("/login"); // Chuyển hướng đến trang login
  };
  const [hotJobs, setHotJobs] = useState([{ employer: {}, locations: [] }]);
  const [hotCompanies, setHotCompanies] = useState([]);
  const [page, setPage] = useState({ links: [] });
  const [curPage, setCurPage] = useState(1);

  const getHotJobs = async (apiURL) => {
    await axios
      .get(apiURL)
      .then((res) => {
        setHotJobs(res.data.data);
        delete res.data.data;
        setPage(res.data);
        setCurPage(res.data.current_page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getHotCompanies = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/companies/getHotList")
      .then((res) => {
        setHotCompanies(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHotJobs(`http://127.0.0.1:8000/api/jobs/getHotList`);
    getHotCompanies();
  }, []);

  return (
    <>
    <div>
  <div
    className="banner mx-4 mt-4 p-5"
    style={{
      background: "linear-gradient(135deg, #004080, #009933)",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      color: "#fff",
      position: "relative",
      fontFamily: '"Roboto", sans-serif',
    }}
  >
    <FaBriefcase
      style={{
        fontSize: "100px",
        position: "absolute",
        top: "20px",
        left: "20px",
        opacity: 0.1,
        color: "#fff",
      }}
    />
    <h1
      style={{
        fontWeight: "bold",
        fontSize: "4rem", // Chữ lớn nhất
        marginBottom: "10px",
        color: "#FFD700", // Màu vàng để nổi bật
        textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)", // Đổ bóng để nổi bật hơn
      }}
    >
      FIND YOUR DREAM JOB
    </h1>
    <h2
      style={{
        fontWeight: "bold",
        fontSize: "3rem", // Tiêu đề nhỏ hơn một chút
        marginBottom: "20px",
        color: "#ffffff",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
      }}
    >
      Chào mừng đến với nền tảng việc làm hàng đầu
    </h2>
    <p
      style={{
        fontSize: "1.5rem",
        marginBottom: "30px",
        lineHeight: "1.7",
        color: "#f0f8ff",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      Khám phá hàng ngàn cơ hội việc làm mới mỗi ngày. Hãy bắt đầu hành trình nghề nghiệp của bạn cùng chúng tôi!
    </p>
    <button
      className="btn btn-light mt-2 px-4 py-2"
      style={{
        color: "#0066cc",
        backgroundColor: "#ffffff",
        fontWeight: "bold",
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      onClick={handleFindJobClick}
    >
      Tìm việc ngay <FaArrowRight />
    </button>
  </div>
</div>
<div
  className="mt-5 mx-4 pb-3 "
  style={{
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    background: "linear-gradient(135deg, #004080, #009933)",
  }}
>
  <h2 className="pt-3 ps-4" style={{ fontSize: "24px", fontWeight: "bold",textAlign: "center",color: "#FFD700",textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", }}>
   OUTSTANDING WORK
  </h2>
  <hr />
  <div className="row" >
    {hotJobs.map((job) => (
      <div
        key={"job" + job.id}
        className="col-md-5 my-2 d-flex border-bottom bg-white"
        style={{
          marginLeft: "85px",
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
          
          
        }}
        
        
        
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)") // Hiệu ứng phóng to khi hover
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)") // Trở lại kích thước ban đầu
        }
      >
        <Link
          to={`/companies/${job.employer.id}`}
          className="border ms-1 mb-3 d-flex justify-content-center"
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "12px",
            overflow: "hidden", // Đảm bảo ảnh không tràn ra ngoài
          }}
        >
          <img
            className="align-self-center"
            style={{
              maxHeight: "90px",
              maxWidth: "90px",
              borderRadius: "10px",
              transition: "opacity 0.3s ease",
            }}
            src={job.employer.logo}
            alt={"hotjob" + job.id}
          />
        </Link>
        <div style={{ fontSize: "15.5px" }}>
          <div className="ms-4 mt-1 mb-2">
            <Link
              to={`/jobs/${job.id}`}
              className="nav-link fw-bold"
              style={{
                fontSize: "19px",
                color: "#00aaff",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#007acc")}
              onMouseLeave={(e) => (e.target.style.color = "#00aaff")}
            >
              {job.jname}
            </Link>
            <span className="text-secondary">{job.employer.name}</span>
            <div className="d-flex align-items-center">
              <BsCurrencyDollar />
              {job.min_salary ? (
                <span>
                  {job.min_salary} - {job.max_salary} triệu VND
                </span>
              ) : (
                "Theo thỏa thuận"
              )}
            </div>
            <div className="d-flex align-items-center">
              <BsGeoAlt />
              &nbsp;
              {job.locations.map((item, index) => (
                <span key={"job_location_" + job.id + "-" + item.id}>
                  {item.name}
                  {index !== job.locations.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  <div className="d-flex justify-content-center mt-3">
    {page.links.map((item) => (
      <button
        key={"page" + item.label}
        type="button"
        className="btn btn-sm border me-2"
        style={{
          backgroundColor: curPage.toString() === item.label && "#1E90FF",
          color: curPage.toString() === item.label ? "white" : "#1E90FF",
          borderRadius: "8px",
          transition: "background-color 0.3s ease, color 0.3s ease",
          fontWeight: "bold", // Nút đậm hơn
        }}
        onClick={() => getHotJobs(item.url)}
      >
        {item.label === "&laquo; Previous" && (
          <BsCaretLeft style={{ fontSize: "18px" }} />
        )}
        {item.label === "Next &raquo;" && (
          <BsCaretRight style={{ fontSize: "18px" }} />
        )}
        {item.label !== "&laquo; Previous" && item.label !== "Next &raquo;"
          ? item.label
          : null}
      </button>
    ))}
  </div>
</div>

<div
  className="mt-5 mx-4 bg-white"
  style={{
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Bóng đổ mạnh hơn
    background: "linear-gradient(135deg, #004080, #009933)",
  }}
>
<h2 className="pt-3 ps-4" style={{ fontSize: "24px", fontWeight: "bold",textAlign: "center",color: "#FFD700",textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", }}>
   COMPANIES
  </h2>
  <hr />
  <div className="row ms-4 pb-4">
    {hotCompanies.map((company) => (
      <div
        className="col-md-2 border rounded me-5 bg-white"
        key={"company" + company.id}
        style={{
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)", // Tăng bóng đổ
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer", // Thêm hiệu ứng con trỏ
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)") // Hiệu ứng phóng to khi hover
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)") // Trở lại kích thước ban đầu
        }
      >
        <Link
          to={`/companies/${company.id}`}
          className="d-flex justify-content-center mx-auto"
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <img
            className="align-self-center"
            style={{
              maxHeight: "90px",
              maxWidth: "90px",
              borderRadius: "10px",
              transition: "opacity 0.3s ease",
            }}
            src={company.logo}
            alt={"hot_company" + company.id}
          />
        </Link>
        <div className="text-center mb-2">
          <div className="fw-bold mb-1" style={{ fontSize: "16px" }}>
            {company.name}
          </div>
          <span
            className="border rounded px-1"
            style={{
              backgroundColor: "#e0f7ff",
              fontSize: "14px", // Tăng kích thước text một chút
              padding: "5px", // Thêm khoảng trống bên trong
            }}
          >
            {company.job_num} việc làm
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
<div
  className="mt-5 mx-4 pb-3 bg-white"
  style={{
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    background: "linear-gradient(135deg, #0066cc, #00cc99)",
  }}
>
  <h2 className="text-center" style={{ fontSize: "24px", fontWeight: "bold",color: "#FFD700",textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", }}>
    ENTERTAINMENT
  </h2>
  <iframe
    src="https://www.crazygames.com/embed/real-cars-in-city"
    style={{
      width: "100%",
      height: "600px",
      border: "none",
      borderRadius: "12px",
    }}
    title="Trò Chơi Giải Trí"
  ></iframe>
</div>


    </>
  );
}
export default Home;
