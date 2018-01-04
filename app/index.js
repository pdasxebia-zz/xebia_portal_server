module.exports = function (app, passport, Employee, Address, EmpSalary, Project, Accounts, Locations, Project, EmpProjectMap) {
    // routes ======================================================================
    require('./routes.js')(app, passport);
    require('./empApi.js')(app, passport, Employee);
    require('./empAdd.js')(app, passport, Employee, Address);
    require('./empSalaryApi.js')(app, passport, Employee, EmpSalary);
    require('./locationApi.js')(app, passport, Locations);
    require('./monthlyprojectdetails.js')(app, passport, Employee);
    require('./projApi.js')(app, passport, Project);
    require('./projEmpMapApi.js')(app, passport, Employee, Project, EmpProjectMap);
    require('./accountsApi.js')(app, passport, Employee, Accounts);

}