fetch('quizB2BS1.json')
    .then(response => response.json())
    .then(quizB2BS1 => {
        const urlParams = new URLSearchParams(window.location.search);
        const quizTitle = urlParams.get('title');

        const currentSection = quizB2BS1.sections.find(section => section.title === quizTitle);
        
        if (currentSection) {
            document.getElementById("title").innerText = currentSection.title;

            const quizForm = document.getElementById("quizForm");
            let paragraphHTML = currentSection.paragraph;

            // Replace placeholders with dropdowns
            for (const [key, value] of Object.entries(currentSection.questions)) {
                const select = document.createElement("select");
                select.dataset.correctAnswer = value.correctAnswer;  
                select.innerHTML = `
                    <option value="">Select...</option>
                    <option value="A">${value.optionA}</option>
                    <option value="B">${value.optionB}</option>
                    <option value="C">${value.optionC}</option>
                `;
                paragraphHTML = paragraphHTML.replace(`(${key})`, select.outerHTML);
            }

            document.getElementById("paragraph").innerHTML = paragraphHTML;

            // Event listener for submit button
            document.getElementById("submitBtn").addEventListener("click", function(event) {
                event.preventDefault();  
                let score = 0;
                const selects = document.querySelectorAll('select'); 
                
                selects.forEach(select => {
                    if (select.value === select.dataset.correctAnswer) {
                        select.classList.remove('highlight-wrong');
                        select.classList.add('highlight-correct');
                        score++; 
                    } else if (select.value !== '' && select.value !== select.dataset.correctAnswer) {
                        select.classList.remove('highlight-correct');
                        select.classList.add('highlight-wrong'); // Optional: Highlight incorrect answers
                    }
                });

                document.getElementById("score").innerText = `Your score: ${score}/${Object.keys(currentSection.questions).length}`;
                document.getElementById("score").style.display = 'block';
            });
        } else {
            document.getElementById("title").innerText = "Quiz Not Found";
        }
    })
    .catch(error => console.error('Error fetching quiz data:', error));