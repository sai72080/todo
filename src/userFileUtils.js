export const readUsersFromFile = async () => {
    try {
      const response = await fetch('/users.json');
      if (response.ok) {
        return response.json();
      } else {
        console.error('Error fetching users:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  
  export const saveUserToFile = async (user) => {
    try {
      const users = await readUsersFromFile();
      users.push(user);
      const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  