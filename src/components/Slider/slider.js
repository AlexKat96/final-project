import React from 'react';
import Carousel from "react-elastic-carousel";
import css from "./slider.module.css"
import sliderDate from "./slider-mock.json"

const Slider = props => {

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 3 },
    ];
    const carouselRef = React.useRef(null);
    const onNextStart = (currentItem, nextItem) => {
        if (currentItem.index === nextItem.index) {
        
            carouselRef.current.goTo(0);
        }
    };

    const onPrevStart = (currentItem, nextItem) => {
        if (currentItem.index === nextItem.index) {
            carouselRef.current.goTo(sliderDate.length);
        }
    };

    return (
        <div>

            <Carousel breakPoints={breakPoints}
                
                ref={carouselRef}
                onPrevStart={onPrevStart}
                onNextStart={onNextStart}
                disableArrowsOnEnd={false}
            >
                {sliderDate.map(elem => {
                    return (
                        <div key={elem.id} className={css.slider_item}>

                            <div className={css.scan}></div>

                            <p className={css.box_text}>{elem.date}</p>
                        </div>
                    )
                })}
            </Carousel>
        </div>

    );
}

export default Slider;