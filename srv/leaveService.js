const cds = require('@sap/cds');

module.exports = cds.service.impl(async srv => {

  srv.on('READ', 'LoggedInUser', async (req) => {
    console.log('LoggedInUser read:', req.data);
const role = '';
if(req.user.is("Employee")){
  role = 'Employee'
}else if (req.user.is("Manager")){
  role = 'Manager'
}else if (req.user.is("HR")){
  role = 'HR'
}
    return {
      id: req.user.id,
      userRole : role
    }; 
  });

});