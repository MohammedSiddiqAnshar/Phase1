import { useState, useEffect, useRef } from "react";

const useIntersectionObserver = (callback, options) => {
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            callback();
        }
        }, options);

        if (targetRef.current) {
        observer.observe(targetRef.current);
        }

        return () => {
        if (targetRef.current) {
            observer.unobserve(targetRef.current);
        }
        };
    }, [callback, options]);

    return targetRef;
    };

    const IntersectionObserverComponent = () => {
    const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
    
    const loadMoreItems = () => {
        setItems((prevItems) => [...prevItems, ...Array.from({ length: 5 }, (_, i) => prevItems.length + i + 1)]);
    };
    
    const lastItemRef = useIntersectionObserver(loadMoreItems, { threshold: 1 });
    
    return (
        <div className="observer-container">
        <h1>Infinite Scroll</h1>
        <ul>
            {items.map((item, index) => (
            <li key={item} ref={index === items.length - 1 ? lastItemRef : null}>
                Item {item}
            </li>
            ))}
        </ul>
        </div>
    );
};

export default IntersectionObserverComponent;
