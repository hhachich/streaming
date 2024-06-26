import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MovieSection.css";
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const MovieSection = ({ title, items }) => {
    console.log(items)
    console.log(title)

    return (
        <div className="parent">                  
        <h2>{title}</h2>

            <Carousel
                responsive={responsive}
                autoPlay={false}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
            >
                {items.results.length > 0 &&
                    items.results.map((item, key) => (
                        <div className="slider" key={key}>
                            <img
                                alt={item.original_title}
                                src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                            />
                        </div>
                    ))}


            </Carousel>
        </div>
    );
};
export default MovieSection;
