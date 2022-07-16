//yarn add express
//yarn add nodemon -D
//yarn add typescript ts-node @types/express @types/node -D

//Run
//Terminal-1
//yarn tsc -ws
//Terminal-2
//yarn nodemon ./dist/index.js
//or
//yarn nodemon --inspect ./dist/index.js


import express from 'express';

const app = express()
const port = 3000

const jsonBodyParser = express.json()
app.use(jsonBodyParser)

const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    NOT_FOUND_404: 404,
    INTERNAL_SERVER_ERROR_500: 500,
}

const db = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'full-stack'},
        {id: 4, title: 'mobile'},
        {id: 5, title: 'devops'}
    ]
}

/*
fetch('http://localhost:3000', {method: 'GET'})
.then(res => res.json())
.then(json => console.log(json))
 */
app.get('/', (req, res) => {
    res.send({message: 'Hello World!'});
});

/*
fetch('http://localhost:3000/courses', {method: 'GET'})
.then(res => res.json())
.then(json => console.log(json))

fetch('http://localhost:3000/courses?title=Back', {method: 'GET'})
.then(res => res.json())
.then(json => console.log(json))
 */
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if(req.query.title) {
        foundCourses = foundCourses.filter(course => course.title.includes(req.query.title as string))
    }
    res.json(foundCourses);
});

/*
fetch('http://localhost:3000/courses/2', {method: 'GET'})
.then(res => res.json())
.then(json => console.log(json))
 */
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(course => course.id === parseInt(req.params.id));
    if (!foundCourse) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json('Course not found');
        return;
    }
    res.json(foundCourse);
});

/*
fetch('http://localhost:3000/courses', {
method: 'POST',
body: JSON.stringify({title: 'dba'}),
headers: {
    'Content-Type': 'application/json'}
})

.then(res => res.json())
.then(json => console.log(json))
*/
app.post('/courses', (req, res) => {
    if(!req.body.title) {
        res
            .status(HTTP_STATUSES.BAD_REQUEST_400)
            .json('Title is required');
        return;
    }

    const newCourse = {
        id: db.courses.length + 1,
        title: req.body.title
    };
    db.courses.push(newCourse);
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(newCourse);
});

/*
fetch('http://localhost:3000/courses/1', {method: 'DELETE'})
    .then(res => res.json())
    .then(json => console.log(json))
*/
app.delete('/courses/:id', (req, res) => {
    const courseIndex = db.courses.findIndex(course => course.id === parseInt(req.params.id));
    if (courseIndex === -1) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json('Course not found');
        return;
    }
    db.courses = db.courses.filter(course => course.id !== parseInt(req.params.id));
    res.status(HTTP_STATUSES.NO_CONTENT_204).end();
});

/*
fetch('http://localhost:3000/courses/5', {
method: 'PUT',
body: JSON.stringify({title: 'dba'}),
headers: {
    'Content-Type': 'application/json'}
})

.then(res => res.json())
.then(json => console.log(json))
*/
app.put('/courses/:id', (req, res) => {
    const courseIndex = db.courses.findIndex(course => course.id === parseInt(req.params.id));
    if (courseIndex === -1) {
        res
            .status(HTTP_STATUSES.NOT_FOUND_404)
            .json('Course not found');
        return;
    }
    const course = db.courses[courseIndex];
    course.title = req.body.title;
    res.json(course);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});