class ITSchool {
    constructor(name, description, maxGroupCount, maxStudentsCountPerGroup) {
        this.name = name;
        this.description = description;
        this.maxGroupCount = maxGroupCount;
        this.maxStudentsCountPerGroup = maxStudentsCountPerGroup;
    }

    availableCourses = []

    startedGroups = []

    registerCourse(courseName, totalLessons, availableTeachersAmount) {
        if (!this.availableCourses.find((course) => course.name === courseName)) {
            let course = new Course (courseName, totalLessons, availableTeachersAmount);
            this.availableCourses.push(course);
        }
    }

    startLearningGroup(courseName, teacherName, amountOfStudents) {
        if (this.availableCourses.find((course) => (course.name === courseName) && (course.availableTeachersAmount))) {
            let group = new LearningGroup(courseName, teacherName, amountOfStudents);
            this.startedGroups.push(group);
            this.availableCourses.find((course) => course.name === courseName).availableTeachersAmount -=1;
        }
    }

    endLearningGroup(courseName, teacherName) {
        if (this.startedGroups.some((startedGroup) => (startedGroup.courseName === courseName) && (startedGroup.teacherName === teacherName))) {
            this.startedGroups = this.startedGroups.filter((startedGroup) => (startedGroup.teacherName !== teacherName));
            this.availableCourses.find((course) => course.name === courseName).availableTeachersAmount +=1;
        }
    }

    getLearningGroups(courseName) {
        let searchedGroups = this.startedGroups.filter((startedGroup) => startedGroup.courseName === courseName);
        console.log(searchedGroups);
    }
}

class Course {
    constructor(name, totalLessons, availableTeachersAmount) {
        this.name = name;
        this.totalLessons = totalLessons;
        this.availableTeachersAmount = availableTeachersAmount;
    }
}

class Lesson {
    constructor(title, topics) {
        this.title = title;
        this.topics = topics;
    }
}

class LearningGroup {
    passedLessons = []

    constructor(courseName, teacherName, amountOfStudents) {
        this.courseName = courseName;
        this.teacherName = teacherName;
        this.amountOfStudents = amountOfStudents;
    }

    addLesson(title, topics) {
        if (!(this.passedLessons.includes(title) && this.passedLessons.includes(topics))) {
            let lesson = new Lesson(title, topics);
            this.passedLessons.push(lesson);
        }
    }
}