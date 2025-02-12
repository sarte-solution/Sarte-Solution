"use client"

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import Slider from "react-slick";
import { testimonialsData } from "@/src/utils/data";
import {motion} from "framer-motion"
import { containerVariants } from "@/src/utils/animation";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/Firebase";
const SlickSlider = () => {
  const [comments, setComments] = useState([]);
    const settings = {
        dots:true,
        infinite:true,
        speed:1000,
        slidesToShow:3,
        slidesToScroll:1,
        initialSlide:0,
        touchMove:true,
        useCSS:true,
        responsive:[
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow:2,
                    slidesToScroll:2,
                    dots:true,
                    infinite:true,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow:2,
                    slidesToScroll:2,
                    initialSlide:2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow:1,
                    slidesToScroll:1,
                },
            },
        ],
    }

    useEffect(() => {
      const fetchComments = async () => {
        const projectsCollection = collection(db, 'Testimonials');
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsList = projectsSnapshot.docs.map(doc => doc.data());
        setComments(projectsList);
      };
  
      fetchComments();
    }, []);

  return (
    <motion.div  variants={containerVariants(0.05)}
    initial="offscreen"
    whileInView={"onscreen"}>
      <Slider {...settings}>
        {comments.map((comment, i) => (
          <div key={i} className="comment">
            <div className="c-content">
              <img
                src={"/apos.svg"}
                className="apos-slider"
                alt="apos"
                width={40}
                height={30}
              />
              <span>{comment.comment}</span>
            </div>
            <div className="c-info">
                <div className="c-avatar">
                    {comment.name[0]}
                </div>
                <div className="c-person">
                    <span>{comment.name}</span>
                </div>
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
};

export default SlickSlider;
