export const columns = [
    { uid: "name", name: "Name", sortable: true },
    { uid: "username", name: "Username", sortable: true },
    { uid: "number", name: "Number", sortable: true },
    { uid: "actions", name: "Actions", sortable: false },
  ];
  
  export const users = [
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      status: "active",
      team: "Team A",
      email: "john@example.com",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "User",
      status: "paused",
      team: "Team B",
      email: "jane@example.com",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Bob Johnson",
      role: "Manager",
      status: "vacation",
      team: "Team C",
      email: "bob@example.com",
      avatar: "https://via.placeholder.com/150",
    },
  ];
  
  export const statusOptions = [
    { uid: "active", name: "Active" },
    { uid: "paused", name: "Paused" },
    { uid: "vacation", name: "Vacation" },
  ];
  
  export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  