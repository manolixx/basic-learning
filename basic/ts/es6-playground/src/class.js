class Person {
  constructor(name) {
    this.name = name
  }
  printName() {
    console.log(this.name)
  }
}

class Teacher extends Person {
  constructor(name, course) {
    super(name)
    this.course = course
  }
  printCourse() {
    console.log(this.course)
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name)
    this.grade = grade
  }
  printGrade() {
    console.log(this.grade)
  }
}

const teacher = new Teacher("张三", "C++")

console.log(teacher)
teacher.printName()
teacher.printCourse()
