fetch('quizB2BS1.json')
    .then(response => response.json())
    .then(quizB2BS1 => {
        const quizList = document.getElementById("quizList");

        quizB2BS1.sections.forEach(section => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.innerText = section.Page + " " + section.title;
            link.href = `quiz.html?title=${encodeURIComponent(section.title)}`; // Direct link to quiz page with title
            listItem.appendChild(link);
            quizList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching quiz data:', error));