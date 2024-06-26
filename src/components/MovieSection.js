import React, { useRef, useState } from 'react';
import "./MovieSection.css"

const MovieSection = ({ title, items }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const containerRef = useRef()

  // Function to handle scrolling when the button is clicked
const handleScroll = (scrollAmount) => {
  // Calculate the new scroll position
  const newScrollPosition = scrollPosition + scrollAmount;

  // Update the state with the new scroll position
  setScrollPosition(newScrollPosition);

  // Access the container element and set its scrollLeft property
  containerRef.current.scrollLeft = newScrollPosition;
};
    return (
        <div className="movieRow">
        <h2>{title}</h2>
        <div className="movieRow--left">
        <button onClick={() => handleScroll(-200)}>Scroll Left</button>
        
      </div>
      <div className="movieRow--right">
        <button onClick={() => handleScroll(200)}>Scroll rigt</button>
        
      </div>

        {/* <div className="movieRow--left">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      <div className="movieRow--right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div> */}

        <div className="movieRow--listarea">
          <div className="movieRow--list" ref={containerRef}>
            {items.results.length > 0 &&
              items.results.map((item, key) => (
                <div className="movieRow--item" key={key}>
                  <img
                    alt={item.original_title}
                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
};

export default MovieSection;