const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let courses = [
    { id: 1, name: 'MikroTik Networking', price: 50000 },
    { id: 2, name: 'Cloud Computing', price: 75000 },
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    const { name, price } = req.body;
    const newCourse = { id: courses.length + 1, name, price };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
    const { id } = req.params;
    const { name, price} = req.body;
    const course = courses.find(c => c.id === parseInt(id));

    if (!course) return res.status(404).json({ message: 'Course Not Found Yaa Gess Yaa' });

    course.name = name || course.name;
    course.price = price || course.price;

    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    courses = courses.filter(c => c.id !== parseInt(id));
    res.json({ message: 'Course Deleted broooooo'});
});

app.listen(PORT, () => {
    console.log(`Server zahran is Running on http://localhost:${PORT}`);
});