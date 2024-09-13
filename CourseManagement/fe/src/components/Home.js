import React from "react";
import "swiper/css";
import { Autoplay, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "./Navbar";
import "./css/admin/AdminFw.css";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Swiper
        className="container-fluid p-0 mb-5"
        grabCursor={true}
        effect={"creative"}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Autoplay]}>
        <SwiperSlide>
          {" "}
          <div class="owl-carousel-item position-relative">
            <img class="img-fluid" src="/assets/img/carousel-1.jpg" alt="" />
            <div
              class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "rgba(24, 29, 56, .7)" }}>
              <div class="container">
                <div class="row justify-content-start">
                  <div class="col-sm-10 col-lg-8">
                    <h5
                      class=" text-uppercase mb-3 animated slideInDown"
                      style={{ color: "#127c71" }}>
                      Best Online Courses
                    </h5>
                    <h1 class="display-3 text-white animated slideInDown">
                      The Best Online Learning Platform
                    </h1>
                    <p class="fs-5 text-white mb-4 pb-2">
                      Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                      diam no. Kasd rebum ipsum et diam justo clita et kasd
                      rebum sea sanctus eirmod elitr.
                    </p>
                    <a
                      href=""
                      class="btn  py-md-3 px-md-5 me-3 animated slideInLeft"
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      Read More
                    </a>
                    <a
                      href=""
                      class="btn btn-light py-md-3 px-md-5 animated slideInRight">
                      Join Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="owl-carousel-item position-relative">
            <img class="img-fluid" src="/assets/img/carousel-2.jpg" alt="" />
            <div
              class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "rgba(24, 29, 56, .7)" }}>
              <div class="container">
                <div class="row justify-content-start">
                  <div class="col-sm-10 col-lg-8">
                    <h5
                      class=" text-uppercase mb-3 animated slideInDown"
                      style={{ color: "#127c71" }}>
                      Best Online Courses
                    </h5>
                    <h1 class="display-3 text-white animated slideInDown">
                      Get Educated Online From Your Home
                    </h1>
                    <p class="fs-5 text-white mb-4 pb-2">
                      Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                      diam no. Kasd rebum ipsum et diam justo clita et kasd
                      rebum sea sanctus eirmod elitr.
                    </p>
                    <a
                      href=""
                      class="btn  py-md-3 px-md-5 me-3 animated slideInLeft"
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      Read More
                    </a>
                    <a
                      href=""
                      class="btn btn-light py-md-3 px-md-5 animated slideInRight">
                      Join Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="container-fluid p-0 mb-5">
        <div class="owl-carousel header-carousel position-relative"></div>
      </div>
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="service-item text-center pt-3">
                <div class="p-4">
                  <i
                    class="fa fa-3x fa-graduation-cap  mb-4"
                    style={{ color: "#127c71" }}></i>
                  <h5 class="mb-3">Skilled Instructors</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div class="service-item text-center pt-3">
                <div class="p-4">
                  <i
                    class="fa fa-3x fa-globe mb-4"
                    style={{ color: "#127c71" }}></i>
                  <h5 class="mb-3">Online Classes</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div class="service-item text-center pt-3">
                <div class="p-4">
                  <i
                    class="fa fa-3x fa-home mb-4"
                    style={{ color: "#127c71" }}></i>
                  <h5 class="mb-3">Home Projects</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div class="service-item text-center pt-3">
                <div class="p-4">
                  <i
                    class="fa fa-3x fa-book-open mb-4"
                    style={{ color: "#127c71" }}></i>
                  <h5 class="mb-3">Book Library</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-xxl py-5">
        <div class="container">
          <div class="row g-5">
            <div
              class="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: "400px" }}>
              <div class="position-relative h-100">
                <img
                  class="img-fluid position-absolute w-100 h-100"
                  src="/assets/img/about.jpg"
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h6
                class="section-title bg-white text-start  pe-3"
                style={{ color: "#127c71" }}>
                About Us
              </h6>
              <h1 class="mb-4">Welcome to eLEARNING</h1>
              <p class="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
              <p class="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <div class="row gy-2 gx-4 mb-4">
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i
                      class="fa fa-arrow-right  me-2"
                      style={{ color: "#127c71" }}></i>
                    Skilled Instructors
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i
                      class="fa fa-arrow-right  me-2"
                      style={{ color: "#127c71" }}></i>
                    Online Classes
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i
                      class="fa fa-arrow-right  me-2"
                      style={{ color: "#127c71" }}></i>
                    International Certificate
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i
                      class="fa fa-arrow-right me-2"
                      style={{ color: "#127c71" }}></i>
                    Skilled Instructors
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i
                      class="fa fa-arrow-right me-2"
                      style={{ color: "#127c71" }}></i>
                    Online Classes
                  </p>
                </div>
                <div class="col-sm-6">
                  <p class="mb-0">
                    <i
                      class="fa fa-arrow-right me-2"
                      style={{ color: "#127c71" }}></i>
                    International Certificate
                  </p>
                </div>
              </div>
              <a
                class="btn  py-3 px-5 mt-2"
                href=""
                style={{ backgroundColor: "#127c71", color:"#fff" }}>
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="container-xxl py-5">
        <div class="container">
          <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6
              class="section-title bg-white text-center  px-3"
              style={{ color: "#127c71" }}>
              Instructors
            </h6>
            <h1 class="mb-5">Expert Instructors</h1>
          </div>
          <div class="row g-4">
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="team-item bg-light">
                <div class="overflow-hidden">
                  <img class="img-fluid" src="/assets/img/team-1.jpg" alt="" />
                </div>
                <div
                  class="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-23px" }}>
                  <div class="bg-light d-flex justify-content-center pt-2 px-1">
                    <a
                      class="btn btn-sm-square mx-1"
                      style={{ backgroundColor: "#127c71", color:"#fff" }}
                      href="">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-sm-square mx-1"
                      style={{ backgroundColor: "#127c71", color:"#fff" }}
                      href="">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-sm-square mx-1"
                      style={{ backgroundColor: "#127c71", color:"#fff" }}
                      href="">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div class="text-center p-4">
                  <h5 class="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <div class="team-item bg-light">
                <div class="overflow-hidden">
                  <img class="img-fluid" src="/assets/img/team-2.jpg" alt="" />
                </div>
                <div
                  class="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-23px" }}>
                  <div class="bg-light d-flex justify-content-center pt-2 px-1">
                    <a
                      class="btn btn-sm-square  mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-sm-square  mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-sm-square  mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div class="text-center p-4">
                  <h5 class="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
              <div class="team-item bg-light">
                <div class="overflow-hidden">
                  <img class="img-fluid" src="/assets/img/team-3.jpg" alt="" />
                </div>
                <div
                  class="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-23px" }}>
                  <div class="bg-light d-flex justify-content-center pt-2 px-1">
                    <a
                      class="btn btn-sm-square mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-sm-square  mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-sm-square  mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div class="text-center p-4">
                  <h5 class="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
              <div class="team-item bg-light">
                <div class="overflow-hidden">
                  <img class="img-fluid" src="/assets/img/team-4.jpg" alt="" />
                </div>
                <div
                  class="position-relative d-flex justify-content-center"
                  style={{ marginTop: "-23px" }}>
                  <div class="bg-light d-flex justify-content-center pt-2 px-1">
                    <a
                      class="btn btn-sm-square mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a
                      class="btn btn-sm-square  mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a
                      class="btn btn-sm-square  mx-1"
                      href=""
                      style={{ backgroundColor: "#127c71", color:"#fff" }}>
                      <i class="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
                <div class="text-center p-4">
                  <h5 class="mb-0">Instructor Name</h5>
                  <small>Designation</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
