
export class Storage {
    static saveStudents(students: any) {
        localStorage.setItem('Students', JSON.stringify(students));
    }
    static getStudents() {
        const students: any = localStorage.getItem('Students');
        return JSON.parse(students)
    }
    static makeId(){
        const studentsLen = this.getStudents().length;
        return studentsLen + 1;
    }
    static deleteStudent(studentsId: any) {
        let students = this.getStudents().filter((student: any) => student.id !== studentsId)
        this.saveStudents(students)
    }
    static addStudent(student: any) {
        student.id = this.makeId();
        let students = this.getStudents();
        students.push(student)
        this.saveStudents(students)
        return 1;
    }
    static updateStudent(studentUpdate: any) {
        let students = this.getStudents().map(
            (student: any) => (student.id == studentUpdate.id) ? studentUpdate : student)
        this.saveStudents(students)
        return 1;
    }
}


