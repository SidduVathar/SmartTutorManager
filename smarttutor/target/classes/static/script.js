// javascript for opening login pop up
    let globalProfessorId = null; 
    // Function to show the login form
    function showLoginForm() {
        document.getElementById('login-container').style.display = 'flex'; // Make the form visible
    }
    function loginbuttonclicked() {
        console.log('Login button clicked');
    }
    // JavaScript to close the popover (hides the login container)
    function closeLoginForm() {
        document.getElementById('login-container').style.display = 'none';
    }
   // Cancel button logic
   const cancelButton = document.getElementById('cancel');
   cancelButton.addEventListener('click', closeLoginForm());
// Event Listener for Login Form Submission
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value.trim();

// Validate input fields
if (!email || !password) {
    alert('Please fill in all fields.');
    return;
    
}
// Configure AJAX settings
const settings = {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({ email, password }), // Convert the input data to JSON
};

// Send AJAX request using fetch
fetch('http://localhost:8080/professors/login', settings)
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Invalid credentials');
    }
})
.then(data => {
    console.log('Login response:', data);
    const professorId = data.professorId;
    if (professorId) {
        globalProfessorId = professorId;
        alert('Login successful!');
        fetchCourses(globalProfessorId);

        
        document.getElementById('page-header').style.display = 'block';
        setActiveMenu("courses-link"); 
        document.getElementById('courses-section').style.display = 'block';
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('content').style.display = 'none';


    } else {
        alert('Error: professorId not found in response');
    }
})
.catch(error => {
    alert(error.message);
});
   

    
});

    const addCourseCard = document.querySelector('.add-course-card');
    if (addCourseCard) {
        addCourseCard.addEventListener('click', function () {
            // Hide the courses section and show the course creation section
            document.getElementById('courses-section').style.display = 'none';
            document.getElementById('create-course-section').style.display = 'block';

        });
    }

    // for course creation
    const form = document.getElementById('create-course-form');
    const course_cancelButton = document.getElementById('cancel-course-creation');


    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Gather form data
        const courseId = document.getElementById('course-id').value.trim();
        const courseName = document.getElementById('course-name').value.trim();
        const courseDescription = document.getElementById('course-description').value.trim();
        const courseECTS = document.getElementById('course-ects').value.trim();
        const programName = document.getElementById('program-name').value.trim();
        const startDate = document.getElementById('schedule-date-beginning').value;
        const endDate = document.getElementById('schedule-date-ending').value;
        const frequency = document.getElementById('schedule-frequency').value;

        // Validate required fields
        if (!courseId ||!courseName || !courseDescription || !courseECTS || !programName || !startDate || !endDate || !frequency) {
            alert('Please fill in all fields.');
            return;
        }

        // Create course object
        const course = {
            courseId,
            courseName,
            courseDescription,
            courseEcts: parseInt(courseECTS, 10), // Backend expects ECTS as integer
            courseProgramName: programName,
            courseStartDate: startDate,
            courseEndDate: endDate,
            courseFrequency: frequency
        };

        // Send course data to backend
        
        fetch(`http://localhost:8080/courses/${globalProfessorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        })
        .then(response => {
            if (response.ok) {
                alert('Course created successfully!');
                form.reset();
                document.getElementById('create-course-section').style.display = 'none'; // Hide course creation section
                document.getElementById('courses-section').style.display = 'block'; // Show courses section
                // refresh the course list
                fetchCourses(globalProfessorId);
            } else {
                throw new Error('Failed to create course.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the course.');
        });
    });

    // Handle cancel button
    course_cancelButton.addEventListener('click', function () {
        if (confirm('Are you sure you want to cancel?')) {
            form.reset();
            document.getElementById('create-course-section').style.display = 'none'; // Hide course creation section
            document.getElementById('courses-section').style.display = 'block'; // Show courses section
        }
    });

// funtion for highlighting the active menu bar
const navItems = document.querySelectorAll(".menu-item");
// Function to set the active menu
function setActiveMenu(clickedId) {
    // Remove the 'active' class from all menu items
    navItems.forEach((item) => item.classList.remove("active"));

    // Add the 'active' class to the clicked menu item
    const clickedItem = document.getElementById(clickedId);
    if (clickedItem) {
        clickedItem.classList.add("active");
    }
}

// Attach event listeners (optional if 'onclick' is already added in HTML)
navItems.forEach((item) => {
    item.addEventListener("click", function () {
        setActiveMenu(this.id);
    });

//setActiveMenu("courses-link"); 


// Function to switch between courses and TBA
document.getElementById("courses-link").addEventListener("click", function() {
document.getElementById("courses-section").style.display = "block";
document.getElementById("tba-section").style.display = "none";
document.getElementById("content-container").style.display = "none";
document.getElementById('create-course-section').style.display = 'none';
});

function showTBA() {
document.getElementById("courses-section").style.display = "none";   // Hide the Courses section
document.getElementById("tba-section").style.display = "block"; // Show the TBA section
document.getElementById("content-container").style.display = "none"; 
document.getElementById('create-course-section').style.display = 'none';   
            }

// Event listeners for the other links (Dashboard, Calendar, Statistics, Chat AI)
document.getElementById("dashboard-link").addEventListener("click", showTBA);
document.getElementById("calendar-link").addEventListener("click", showTBA);
document.getElementById("statistics-link").addEventListener("click", showTBA);
document.getElementById("chat-ai-link").addEventListener("click", showTBA);


// Function for logging out
document.getElementById('logout-link').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default anchor tag behavior if any

        // Hide all sections
        document.getElementById('page-header').style.display = 'none';
        setActiveMenu(); 
        document.getElementById('courses-section').style.display = 'none';
        document.getElementById('tba-section').style.display = 'none';
        document.getElementById('content').style.display = 'block';

// Hide any other sections (add additional elements to hide if needed)
document.getElementById('create-course-section').style.display = 'none';

// Show the login form
document.getElementById('login-container').style.display = 'none';

// Reset global state (optional)
if (typeof globalProfessorId !== 'undefined') {
    globalProfessorId = null;
}

});            
});     
});

    // Function to display courses
    function displayCourses(courses) {
        // const coursesContainer = document.getElementById('courses-section');
        const coursesContainer = document.querySelector('.courses');
        coursesContainer.innerHTML = ''; // Clear any existing courses

        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';

            // Ensure courseId is properly retrieved
            console.log('Course ID:', course.courseId);

            courseCard.innerHTML = `
                <div class="course-info">
                    <h3>${course.courseName}</h3>
                    <p>${course.courseDescription}</p>
                 <button class="edit-course-btn" data-id="${course.id}">Edit</button>
                 <button class="delete-course-btn" data-id="${course.id}">Delete</button>
                 </div>
            `;
               // Add click event listener to each course card
               courseCard.querySelector('.course-info').addEventListener('click', () => {
                showCourseDetails(course);
            });
            // Add click event listener for the edit button
            const editButton = courseCard.querySelector('.edit-course-btn');
            editButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent the click event from propagating to the course card
                const courseId = this.getAttribute('data-id');
                if (courseId) {
                    populateEditForm(courseId);
                } else {
                    console.error('Course ID is missing or invalid:', courseId);
                }
            });
            // Add click event listener for the delete button
            const deleteButton = courseCard.querySelector('.delete-course-btn');
            deleteButton.addEventListener('click', function (event) {
                event.stopPropagation(); // Prevent the event from bubbling up to the parent
                const courseId = this.getAttribute('data-id');
                    // Show a confirmation dialog before proceeding
                    const confirmDelete = confirm('Do you want to delete the course?');
                    if (!confirmDelete) {
                        return; // Exit the function if the user clicks "No"
                    }
                if (courseId) {
                    deleteCourse(courseId);
                } else {
                    console.error('Course ID is missing or invalid:', courseId);
                }
            });
            coursesContainer.appendChild(courseCard);
        });
    }
            // to delete a course
            function deleteCourse(courseId) {
                fetch(`http://localhost:8080/courses/${courseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        alert('Course deleted successfully!');
                       // fetchCourses(globalProfessorId); // Refresh the course list
                       if (globalProfessorId) {
                        fetchCourses(globalProfessorId);
                    } else {
                        console.error('globalProfessorId is not set.');
                    }
                    } else {
                        throw new Error(`Failed to delete course with ID: ${courseId}`);
                    }
                })
                .catch(error => {
                    console.error('Error deleting course:', error);
                });
            }

            // Function to fetch courses for a professor
            function fetchCourses(professorId) {
                fetch(`http://localhost:8080/courses/professor/${professorId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch courses: ${response.status}`);
                    }
                    return response.json();
                })
                .then(courses => {
                    displayCourses(courses);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });
                }

            
            
           function populateEditForm(courseID) {
    // Fill in the form fields with the course details
    // Fetch course details from the backend
    fetch(`http://localhost:8080/courses/${courseID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch course details: ${response.status}`);
        }
        return response.json();
    })
    .then(course => {
        // Fill in the form fields with the course details
        document.getElementById('edit-course-id').value = course.courseId;
        document.getElementById('edit-course-name').value = course.courseName;
        document.getElementById('edit-course-description').value = course.courseDescription;
        document.getElementById('edit-course-ects').value = course.courseEcts;
        document.getElementById('edit-program-name').value = course.courseProgramName;
        document.getElementById('edit-schedule-date-beginning').value = course.courseStartDate;
        document.getElementById('edit-schedule-date-ending').value = course.courseEndDate;
        document.getElementById('edit-schedule-frequency').value = course.courseFrequency;

        // Reset the scroll position of the form container
        const scrollableContainer = document.getElementById('scrollable-edit-form-container');
        scrollableContainer.scrollTop = 0;

        // Show the edit form and hide other sections
        document.getElementById('courses-section').style.display = 'none';
        document.getElementById('edit-course-section').style.display = 'block';

        // Save changes on form submission
        const editForm = document.getElementById('edit-course-form');
        editForm.onsubmit = function (event) {
            event.preventDefault();
            saveCourseChanges(course.id);
        };

        // Handle cancel button
        document.getElementById('cancel-edit-button').addEventListener('click', function () {
            editForm.reset();
            document.getElementById('edit-course-section').style.display = 'none';
            document.getElementById('courses-section').style.display = 'block';
        });
    })
    .catch(error => {
        console.error('Error fetching course details:', error);
    });
}

// Save Changes to the Backend
function saveCourseChanges(courseID) {
    // Gather data from the edit form
    const updatedCourse = {
        courseId: document.getElementById('edit-course-id').value.trim(),
        courseName: document.getElementById('edit-course-name').value.trim(),
        courseDescription: document.getElementById('edit-course-description').value.trim(),
        courseEcts: parseInt(document.getElementById('edit-course-ects').value, 10),
        courseProgramName: document.getElementById('edit-program-name').value.trim(),
        courseStartDate: document.getElementById('edit-schedule-date-beginning').value,
        courseEndDate: document.getElementById('edit-schedule-date-ending').value,
        courseFrequency: document.getElementById('edit-schedule-frequency').value
    };

    // Send the updated course to the backend
    fetch(`http://localhost:8080/courses/${courseID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCourse),
    })
        .then(response => {
            if (response.ok) {
                alert('Course updated successfully!');
                document.getElementById('edit-course-form').reset();
                document.getElementById('edit-course-section').style.display = 'none';
                document.getElementById('courses-section').style.display = 'block';
                fetchCourses(globalProfessorId); // Refresh the course list
            } else {
                throw new Error('Failed to update the course.');
            }
        })
        .catch(error => {
            console.error('Error updating course:', error);
            alert('An error occurred while updating the course.');
        });
}
            

     
         // Function to display course details in content-container
        function showCourseDetails(course) {
            // Populate the content-container with course details
            document.getElementById('course-title').textContent = course.courseName;
            document.getElementById('course-description1').textContent = course.courseDescription;

            // Hide courses-section and show content-container
            document.getElementById('courses-section').style.display = 'none';
            document.querySelector('.content-container').style.display = 'block';
        }
            