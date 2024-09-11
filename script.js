// Existing recruiters and jobs data
let recruiters = [
    { email: "recruiter1@example.com", password: "pass123", isNew: false },
    { email: "recruiter2@example.com", password: "pass123", isNew: false },
    { email: "recruiter3@example.com", password: "pass123", isNew: false },
    { email: "recruiter4@example.com", password: "pass123", isNew: false }
];

let jobs = [
    { title: "Software Engineer", salary: 80000, description: "Develop web applications", experience: "3 years", incentive: 5000, isNew: false, postedBy: "recruiter1@example.com" },
    { title: "Marketing Manager", salary: 70000, description: "Handle marketing campaigns", experience: "5 years", incentive: 3000, isNew: false, postedBy: "recruiter2@example.com" },
    { title: "Data Analyst", salary: 75000, description: "Analyze data trends", experience: "4 years", incentive: 4000, isNew: false, postedBy: "recruiter3@example.com" }
];

// Function to load recruiters into the admin panel
function loadRecruiters() {
    const recruiterList = document.getElementById('recruiter-list');
    recruiterList.innerHTML = '';

    recruiters.forEach((recruiter, index) => {
        const li = document.createElement('li');
        li.className = recruiter.isNew ? 'green' : '';
        li.innerHTML = `${recruiter.email} <button onclick="removeRecruiter(${index})">Remove</button>`;
        recruiterList.appendChild(li);
    });
}

// Function to remove a recruiter
function removeRecruiter(index) {
    recruiters.splice(index, 1);
    loadRecruiters();
}

// Sign-up function for new recruiters
function signUpRecruiter() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    recruiters.push({ email, password, isNew: true });
    alert('Your account has been registered.');
    loadRecruiters();
}

// Function to post a new job
function postJob() {
    const jobTitle = document.getElementById('job-title').value;
    const jobSalary = document.getElementById('job-salary').value;
    const jobDescription = document.getElementById('job-description').value;
    const jobExperience = document.getElementById('job-experience').value;
    const jobIncentive = document.getElementById('job-incentive').value;
    const currentRecruiter = recruiters[recruiters.length - 1].email; // Assuming last recruiter is logged in

    jobs.push({
        title: jobTitle,
        salary: jobSalary,
        description: jobDescription,
        experience: jobExperience,
        incentive: jobIncentive,
        isNew: true,
        postedBy: currentRecruiter
    });

    alert("Job posted successfully!");
    clearForm();
    viewPostedJobs();
}

// Function to clear the job posting form
function clearForm() {
    document.getElementById('post-job-form').reset();
}

// Function to display posted jobs with 'Apply' button
function viewPostedJobs() {
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';

    jobs.forEach((job, index) => {
        const jobItem = document.createElement('li');
        jobItem.className = job.isNew ? 'green' : '';
        jobItem.innerHTML = `<strong>Title:</strong> ${job.title}<br>
                             <strong>Salary:</strong> PKR ${job.salary}<br>
                             <strong>Description:</strong> ${job.description}<br>
                             <strong>Experience:</strong> ${job.experience}<br>
                             <strong>Incentive:</strong> PKR ${job.incentive} <br>
                             <strong>Posted by:</strong> ${job.postedBy}
                             <button onclick="applyToJob(${index})">Apply</button>`;
        jobList.appendChild(jobItem);
    });
}

// Function for recruiters to apply to jobs
function applyToJob(jobIndex) {
    const job = jobs[jobIndex];
    const currentRecruiter = recruiters[recruiters.length - 1].email; // Assuming last recruiter is logged in

    // Calculate incentives
    const totalIncentive = job.incentive;
    const adminIncentive = totalIncentive * 0.20;
    const postingRecruiterIncentive = totalIncentive * 0.40;
    const applyingRecruiterIncentive = totalIncentive * 0.40;

    alert(`Incentive Distribution:
    Admin: PKR ${adminIncentive} (20% is for admin)
    Posting Recruiter: PKR ${postingRecruiterIncentive} (40% is for posting recruiter)
    Applying Recruiter (You): PKR ${applyingRecruiterIncentive} (40% is for working recruiter)`);

    // Update the job status
    jobs[jobIndex].isNew = false;
    viewPostedJobs(); // Refresh the job list
}

// Load initial recruiters and jobs on page load
window.onload = function () {
    loadRecruiters();
    viewPostedJobs();
}
