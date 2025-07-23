import HelloWorld from "./HelloWorld";

function Course() {
    const Courses = [
        { name: "HTML", price: 400, rating: 5},
        { name: "CSS", price: 300, rating: 5 },
        { name: "JavaScript", price: 800, rating: 5 },
    ];

    Courses.sort((x,y)=>y.price-x.price)

    const affordCourses = Courses.filter((course)=>course.price>200)

    const CoursesList = affordCourses.map((course, index) => (
        <HelloWorld key={index} name={course.name} price={course.price} rating={course.rating} />
    ));

    return (
        <div>
        {CoursesList}
        </div>
    );
    }

    export default Course;
