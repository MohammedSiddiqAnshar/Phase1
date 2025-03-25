import React from 'react'
import { useEffect } from 'react'


const Task6 = () => {
    useEffect(() => {
        const interval = setInterval(() => {
        console.log("Message logged every second");
        }, 1000);

        return () => {
        clearInterval(interval);
        console.log("Cleanup: Timer cleared");
        };
    }, []);

    return <div>Check the console for messages.</div>;
    };


export default Task6