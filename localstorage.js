class Storage {
    static saveStudents(students) {
        localStorage.setItem('Students', JSON.stringify(students));
    }
    static getStudents() {
        return JSON.parse(localStorage.getItem('Students'))
    }
    static deleteStudent(studentsId) {
        let students = this.getStudents().filter(student => student.id == studentsId)
        this.saveStudents(students)
    }
    static addStudent(student) {
        let students = (this.getStudents()).push(student)
        this.saveStudents(students)
    }
    static updateStudent(studentUpdate) {
        let students = this.getStudents().map(
            student => (student.id == studentUpdate.id) ? studentUpdate : student)
        this.saveStudents(students)
    }
}