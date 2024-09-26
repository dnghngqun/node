import React, { useRef } from "react";
// Import Swiper React components
// import required modules
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import "swiper/css";
import Navbar from "./Navbar";
import "./css/Course.css";
const Course = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://coursemanagement-be.onrender.com/courses/")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); 
        console.log("Fetched products: ", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // Hàm xử lý đăng ký khóa học
  const handleRegister = async (courseId) => {
    try {
      const token = localStorage.getItem("idToken");
      const expriresAt = localStorage.getItem("expiresAt");

      if (!token && !expriresAt) {
        navigate("/login");
        return;
      }
      if (token)
        await axios.post(
          `https://coursemanagement-be.onrender.com/courses/${courseId}/register`,
          {
            uid: uid, 
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

      alert("Đăng ký khóa học thành công!");
    } catch (error) {
      console.error("Error registering for course:", error);
      alert("Đăng ký khóa học thất bại!");
    }
  };

  useEffect(() => {
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("input", filterProducts);

    return () => {
      searchInput.removeEventListener("input", filterProducts);
    };
  }, [products]);

  const filterProducts = () => {
    const searchInputValue = document
      .querySelector(".search-input")
      .value.toUpperCase();

    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toUpperCase()
        .includes(searchInputValue);
      return matchesSearch;
    });

    setFilteredProducts(filtered);
    setCurrentPage(0); // Reset lại trang hiện tại khi lọc
  };
  // Tính toán vị trí bắt đầu của các sản phẩm hiện tại
  const offset = currentPage * productsPerPage;

  // Lấy danh sách các sản phẩm hiện tại dựa trên vị trí bắt đầu và số lượng sản phẩm mỗi trang
  const currentProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );

  // Tính toán số lượng trang dựa trên tổng số sản phẩm đã lọc
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const productListRef = useRef(null); // Ref cho danh sách sản phẩm

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    // Cuộn lên đầu danh sách sản phẩm khi chuyển trang
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    // Khởi tạo ScrollReveal và cấu hình các hiệu ứng cuộn
    ScrollReveal().reveal(".reveal", {
      distance: "40px",
      duration: 400,
      easing: "ease-in-out",
      origin: "bottom",
      interval: 100,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div id="coursePage">
        <section className="slide">
          <Swiper
            className="swiper"
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            modules={[Autoplay, Navigation]}>
            <SwiperSlide className="swiperSlide swiperSlide1">
              {" "}
              <div className="text-title">
                <h3 style={{ color: "#fff" }}>
                  Unlock your potential and open doors to new opportunities with
                  our comprehensive English language course!
                </h3>
              </div>
              <div className="img-title">
                <img src="/assets/img/imgCourseSlidePage.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperSlide swiperSlide2">
              {" "}
              <div className="text-title">
                <h3 style={{ color: "#fff" }}>
                  Unlock your potential and open doors to new opportunities with
                  our comprehensive English language course!
                </h3>
              </div>
              <div className="img-title">
                <img src="/assets/img/anhnguzim.png" alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiperSlide swiperSlide3">
              <div className="text-title">
                <h3 style={{ color: "#fff" }}>
                  Unlock your potential and open doors to new opportunities with
                  our comprehensive English language course!
                </h3>
              </div>
              <div className="img-title">
                <img src="/assets/img/ielts1.png" alt="" />
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="custom-navi custom-prev"></div>
          <div className="custom-navi custom-next"></div>
        </section>
        <div className="course-center">
          <div className="course-container ">
            <div ref={productListRef} className="search-course reveal">
              <input
                type="text"
                className="search-input form-control"
                placeholder="Search courses..."
              />
            </div>
            <div className="course-card container-fluid reveal">
              <div className="row gy-3">
                {currentProducts.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className={`card  col-xxl-2 col-xl-3 col-md-4`}>
                      <div className="card-join">
                        <button
                          className="btn-join"
                          onClick={() => handleRegister(product.id)}>
                          Join Class
                        </button>
                      </div>
                      <Link
                        to={`/course/${product.id}`}
                        className="link-to-view-page">
                        <img
                          src={product.imageLink}
                          className="card-img-top"
                          alt={product.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.description}</p>
                          <div className="card-bottom">
                            <div className="studyTime">{product.studyTime}</div>
                            <div className="course-price">
                              ${product.price}/course
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination_course"}
          previousLinkClassName={"pagination__link pagination_previous"}
          nextLinkClassName={"pagination__link pagination_next"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </>
  );
};

export default Course;
