const allRoles = {
  student: [],
  faculty: [],
  staff: [],
  vendor: [],
  projectAssitant: [],
  adminPor: [],
  superadmin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
