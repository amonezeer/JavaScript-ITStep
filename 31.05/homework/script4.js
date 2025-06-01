class Employee {
    constructor(name, position, department, salary) {
        this.name = name;
        this.position = position;
        this.department = department;
        this.salary = salary;
    }
}

class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        let html = `
            <table>
                <thead>
                    <tr>
                        <th>ПІБ</th>
                        <th>Посада</th>
                        <th>Відділ</th>
                        <th>Зарплата</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.employees.forEach(employee => {
            html += `
                <tr>
                    <td>${employee.name}</td>
                    <td>${employee.position}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary} грн</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        return html;
    }
}

class StyledEmpTable extends EmpTable {
    constructor(employees) {
        super(employees);
    }

    getStyles() {
        return `
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                th, td {
                    padding: 12px;
                    text-align: left;
                    border: 1px solid #ddd;
                }
                th {
                    background-color:rgb(17, 194, 147);
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
                tr:hover {
                    background-color: #e6f3ff;
                }
            </style>
        `;
    }

    getHtml() {
        return this.getStyles() + super.getHtml();
    }
}

const employees = [
    new Employee("Іванов Іван Іванович", "Менеджер", "Кредитний", 25000),
    new Employee("Петрова Анна Сергіївна", "Касир", "Операційний", 18000),
    new Employee("Сидоров Петро Олегович", "Аналітик", "Фінансовий", 30000),
    new Employee("Коваленко Марія Ігорівна", "Бухгалтер", "Бухгалтерія", 22000)
];

const styledEmpTable = new StyledEmpTable(employees);
document.getElementById('employeeTable').innerHTML = styledEmpTable.getHtml();