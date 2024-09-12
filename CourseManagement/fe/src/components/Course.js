import React from "react";
// Import Swiper React components
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Navbar from "./Navbar";
import "./css/Course.css";
const Course = () => {
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
      </div>
    </>
  );
};

export default Course;
