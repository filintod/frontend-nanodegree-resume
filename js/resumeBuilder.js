var bio = {
    "name": "Filinto Duran",
    "role": "Network Fullstack Automation Engineer",
    "contacts": {
        "mobile": "555-123-4567",
        "email": "filinto_duran@labs.att.com",
        "location": "Austin, TX",
        "github": "filintod",
        "twitter": "@delicatocafe",
        "blog": "buzz.blogger.com"
    },
    "biopic": "images/fry.jpg",
    "welcomeMessage": "Say Hi my resume ",
    "skills": ["JavaScript", "HTML", "GO", "Python", "SDN", "CSS", "Networking", "TCP/IP", "IP Multicast"]
};

var work = {
    "jobs": [
        {
            "employer": "AT&T",
            "title": "Principal Member of Technical Staff",
            "dates": "01/01/2012",
            "location": "Austin, TX",
            "description": "Development of automation solutions for continuous testing of new systems for our Video and Security Services"
        },
        {
            "employer": "KForce",
            "title": "Network Test Engineer",
            "dates": "01/01/2010-01/01/2012",
            "location": "Austin, TX",
            "description": "Development of automation solutions for continuous testing of new systems for our Video Services"
        },
        {
            "employer": "Intelsat",
            "title": "Principal Network Engineer",
            "dates": "01/01/2000-01/01/2005",
            "location": "Washington, DC",
            "description": "Network testing and design."
        }
    ]
};

var projects = {
    "projects": [
        {
            "title": "My first project with kittens",
            "dates": "2012/01/01-2013/01/01",
            "description" : "My first projects where I try to pet a cat",
            "images": ["http://placekitten.com/g/200/300", "http://placekitten.com/g/200/400"]
        },
        {
            "title": "My most recent project with kittens (very long)",
            "dates": "2013/01/01-2015/01/01",
            "description" : "My recent projects where I did pet a cat",
            "images": ["http://placekitten.com/g/210/300", "http://placekitten.com/g/210/400"]
        }
    ]
};

var education = {
    "schools": [
        {   "name": "Universidad Simon Bolivar",
            "majors": ["Electronic Engineering"],
            "dates": 1995,
            "degree": "BS",
            "url": "www.usb.ve",
            "location": "Caracas, Venezuela"
        },
        {   "name": "Universidad Simon Bolivar",
            "majors": ["Electronic Engineering"],
            "degree": "MS",
            "dates": 1997,
            "url": "www.usb.ve",
            "location": "Caracas, Venezuela"
        }
    ],
    "onlineCourses": [
        {
            "title": "Into to HTML and CSS",
            "school": "Udacity",
            "date": 2015,
            "url": "https://www.udacity.com/course/ud304"
        },
        {
            "title": "Full Stack Web Developer Nanodegree",
            "school": "Udacity",
            "date": 2015,
            "url": "https://www.udacity.com/course/nd004"
        }
    ]
};

function sanitizeString(suspicious) {
    if (suspicious && !(typeof suspicious === 'undefined'))
        return suspicious.replace(/[\<\>]/, "");
    return "";
}

function template(htmlobject, value, sanitizeFunction){
    var sanitize = (typeof sanitizeFunction == 'undefined') ? sanitizeString: sanitizeFunction;
    return htmlobject.replace("%data%", sanitize(value));
}

/*
Display function for bio object
 */
bio.display = function(){
    var formatedName = template(HTMLheaderName, this.name);
    var formatedRole = template(HTMLheaderRole, this.role);
    var formatedMobile = template(HTMLmobile, this.contacts.mobile);
    var formatedEmail = template(HTMLemail, this.contacts.email);
    var formatedLocation = template(HTMLlocation, this.contacts.location);
    var formatedPic = template(HTMLbioPic, this.biopic);
    var formatedBlog = template(HTMLblog, this.contacts.blog);
    var formatedGithub = template(HTMLgithub, this.contacts.github );
    var formatedTwitter = template(HTMLtwitter, this.contacts.twitter);

    $("#header").prepend(formatedRole).prepend(formatedName).append(formatedPic);
    $("#topContacts").append(formatedMobile).append(formatedEmail).append(formatedGithub).append(formatedTwitter).append(formatedLocation).append(formatedBlog);
    $("#footerContacts").append(formatedMobile).append(formatedEmail).append(formatedGithub).append(formatedTwitter).append(formatedLocation).append(formatedBlog);
    if (this.skills && this.skills.length) {
        $("#header").append(HTMLskillsStart);
        var formatedSkills = template(HTMLskills, this.skills.join(", "));
        $("#my_skills").append(formatedSkills);
    }
};


work.display = function() {
    for (var job in this.jobs) {
        var formatedEmployer = template(HTMLworkEmployer, this.jobs[job].employer);
        var formatedTitle = template(HTMLworkTitle, this.jobs[job].title);
        var formatedDates = template(HTMLworkDates, (!this.jobs[job].end_date) ? "Current Job" : this.jobs[job].start_date + " - " + this.jobs[job].end_date);
        var formatedDescription = template(HTMLworkDescription, this.jobs[job].description);
        var formatedLocation = template(HTMLworkLocation, this.jobs[job].location);

        $("#workExperience").append(HTMLworkStart);
        $(".work-entry:last").append(formatedEmployer + formatedTitle).append(formatedDates).append(formatedLocation).append(formatedDescription);
    }
};

projects.display = function(){
    for (var project in this.projects) {
        var fTitle = template(HTMLprojectTitle, this.projects[project].title);
        var fDates = template(HTMLprojectDates, this.projects[project].dates);
        var fDescription = template(HTMLprojectDescription, this.projects[project].description);
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(fTitle + fDates).append(fDescription);
        for(var image in this.projects[project].images){
            $(".project-entry:last").append(template(HTMLprojectImage, this.projects[project].images[image]))
        }
    }
};

education.display = function(){
    /*
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

     */
    for (var school in this.schools) {
        school = this.schools[school];
        $("#education").append(HTMLschoolStart);
        $("#education:last").
            append(template(HTMLschoolName, school.name) + template(HTMLschoolDegree, school.degree)).
            append(template(HTMLschoolDates, school.dates, parseInt)).
            append(template(HTMLschoolLocation, school.location)).
            append(template(HTMLschoolMajor, school.majors.join(", ")));
    }

    $("#education").append(HTMLonlineClasses);

    for (var school in this.onlineCourses) {
        school = this.onlineCourses[school];
        $("#education").append(HTMLschoolStart);
        $("#education:last").
            append(template(HTMLonlineTitle, school.title) + template(HTMLonlineSchool, school.school)).
            append(template(HTMLonlineDates, school.date, parseInt)).
            append(template(HTMLonlineURL, school.url));
    }

};

function displayData(){
    bio.display();
    work.display();
    projects.display();
    education.display();
}

displayData();

function locationizer(work_obj){
    location = [];
    for(work in work_obj.jobs){
        location.push(work_obj.jobs[work].location)
    }
  return location;
}

function inName(){
    var names = bio.name.split(" ");
    names[0] = names[0].charAt(0).toUpperCase() + names[0].slice(1);
    names[1] = names[1].toUpperCase();
    return names.join(" ");
}

$("#mapDiv").append(googleMap);