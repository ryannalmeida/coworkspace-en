
// Utility functions for localStorage management

// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  password: string; 
  phone?: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'canceled';

export interface Reservation {
  id: string;
  userId: string;
  date: string; 
  startTime: string;
  endTime: string;
  space: string; 
  status: ReservationStatus;
  createdAt: string;
}


export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const getUsers = (): User[] => {
  const users = localStorage.getItem('coworkspace_users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User[]): void => {
  localStorage.setItem('coworkspace_users', JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const currentUser = localStorage.getItem('coworkspace_currentUser');
  return currentUser ? JSON.parse(currentUser) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('coworkspace_currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('coworkspace_currentUser');
  }
};

export const registerUser = (email: string, name: string, password: string): User => {
  const users = getUsers();
  
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists with this email');
  }
  
  const newUser = {
    id: crypto.randomUUID(),
    email,
    name,
    password, 
  };
  
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const loginUser = (email: string, password: string): User => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  setCurrentUser(user);
  return user;
};

export const logoutUser = (): void => {
  setCurrentUser(null);
};

export const updateUserProfile = (userId: string, updates: Partial<User>): User => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser = {
    ...users[userIndex],
    ...updates,
    id: users[userIndex].id,
    email: users[userIndex].email,
  };
  
  users[userIndex] = updatedUser;
  saveUsers(users);
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(updatedUser);
  }
  
  return updatedUser;
};

export const deleteUser = (userId: string): void => {
  let users = getUsers();
  users = users.filter(u => u.id !== userId);
  saveUsers(users);
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    logoutUser();
  }
  
  deleteUserReservations(userId);
  deleteUserNotifications(userId);
};

export const getReservations = (): Reservation[] => {
  const reservations = localStorage.getItem('coworkspace_reservations');
  return reservations ? JSON.parse(reservations) : [];
};

export const saveReservations = (reservations: Reservation[]): void => {
  localStorage.setItem('coworkspace_reservations', JSON.stringify(reservations));
};

export const getUserReservations = (userId: string): Reservation[] => {
  const reservations = getReservations();
  return reservations.filter(r => r.userId === userId);
};

export const createReservation = (
  userId: string,
  date: string,
  startTime: string,
  endTime: string,
  space: string
): Reservation => {
  const reservations = getReservations();
  
  const newReservation: Reservation = {
    id: crypto.randomUUID(),
    userId,
    date,
    startTime,
    endTime,
    space,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  reservations.push(newReservation);
  saveReservations(reservations);
  
  createNotification(
  userId,
  'Reservation Created',
  `Your reservation for ${space} on ${new Date(date).toLocaleDateString()} has been created and is pending confirmation.`
);
  
  return newReservation;
};

export const updateReservationStatus = (id: string, status: ReservationStatus): Reservation => {
  const reservations = getReservations();
  const index = reservations.findIndex(r => r.id === id);
  
  if (index === -1) {
    throw new Error('Reservation not found');
  }
  
  reservations[index].status = status;
  saveReservations(reservations);
  
  // Tradução dos status
const statusTitulo =
  status === 'confirmed' ? 'Reservation Confirmed' :
  status === 'pending' ? 'Reservation Pending' :
  status === 'canceled' ? 'Reservation Canceled' : 'Unknown Status';

const statusDescricao =
  status === 'confirmed' ? 'confirmed' :
  status === 'pending' ? 'pending' :
  status === 'canceled' ? 'canceled' : status;

createNotification(
  reservations[index].userId,
  statusTitulo,
  `Your reservation for ${reservations[index].space} on ${new Date(reservations[index].date).toLocaleDateString()} has been ${statusDescricao}.`
);

  
  return reservations[index];
};

export const deleteReservation = (id: string): void => {
  let reservations = getReservations();
  const reservation = reservations.find(r => r.id === id);
  
  if (!reservation) {
    throw new Error('Reservation not found');
  }
  
  reservations = reservations.filter(r => r.id !== id);
  saveReservations(reservations);
  
  createNotification(
    reservation.userId,
    'Reservation Canceled',
    `Your reservation for ${reservation.space} on ${new Date(reservation.date).toLocaleDateString()} has been canceled.`
  );
};

export const deleteUserReservations = (userId: string): void => {
  let reservations = getReservations();
  reservations = reservations.filter(r => r.userId !== userId);
  saveReservations(reservations);
};

export const getNotifications = (): Notification[] => {
  const notifications = localStorage.getItem('coworkspace_notifications');
  return notifications ? JSON.parse(notifications) : [];
};

export const saveNotifications = (notifications: Notification[]): void => {
  localStorage.setItem('coworkspace_notifications', JSON.stringify(notifications));
};

export const getUserNotifications = (userId: string): Notification[] => {
  const notifications = getNotifications();
  return notifications.filter(n => n.userId === userId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const createNotification = (userId: string, title: string, message: string): Notification => {
  const notifications = getNotifications();
  
  const newNotification: Notification = {
    id: crypto.randomUUID(),
    userId,
    title,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };
  
  notifications.push(newNotification);
  saveNotifications(notifications);
  return newNotification;
};

export const markNotificationAsRead = (id: string): Notification => {
  const notifications = getNotifications();
  const index = notifications.findIndex(n => n.id === id);
  
  if (index === -1) {
    throw new Error('Notification not found');
  }
  
  notifications[index].read = true;
  saveNotifications(notifications);
  return notifications[index];
};

export const deleteNotification = (id: string): void => {
  let notifications = getNotifications();
  notifications = notifications.filter(n => n.id !== id);
  saveNotifications(notifications);
};

export const deleteUserNotifications = (userId: string): void => {
  let notifications = getNotifications();
  notifications = notifications.filter(n => n.userId !== userId);
  saveNotifications(notifications);
};

export const initializeData = (): void => {
  if (getUsers().length === 0) {
    // Sample user
    const user = {
      id: crypto.randomUUID(),
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'password',
      phone: '(555) 123-4567',
    };
    
    saveUsers([user]);
    
    const userId = user.id;
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const reservations: Reservation[] = [
      {
        id: crypto.randomUUID(),
        userId,
        date: yesterday.toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '12:00',
        space: 'Meeting Room A',
        status: 'confirmed',
        createdAt: new Date(yesterday.getTime() - 86400000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        userId,
        date: now.toISOString().split('T')[0],
        startTime: '14:00',
        endTime: '16:00',
        space: 'Desk 5',
        status: 'confirmed',
        createdAt: new Date(now.getTime() - 86400000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        userId,
        date: tomorrow.toISOString().split('T')[0],
        startTime: '10:00',
        endTime: '15:00',
        space: 'Meeting Room B',
        status: 'pending',
        createdAt: now.toISOString(),
      },
      {
        id: crypto.randomUUID(),
        userId,
        date: nextWeek.toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '17:00',
        space: 'Private Office 3',
        status: 'pending',
        createdAt: now.toISOString(),
      },
    ];
    
    saveReservations(reservations);
    
    const notifications: Notification[] = [
      {
        id: crypto.randomUUID(),
        userId,
        title: 'Welcome to CoworkSpace',
        message: 'Thank you for creating an account. Start by making your first reservation!',
        read: false,
        createdAt: new Date(now.getTime() - 86400000 * 2).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        userId,
        title: 'Reservation Confirmed',
        message: `Your reservation for Meeting Room A on ${yesterday.toLocaleDateString()} has been confirmed.`,
        read: true,
        createdAt: new Date(yesterday.getTime() - 43200000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        userId,
        title: 'Reservation Reminder',
        message: `Reminder: you have a desk reserved in 1 hour.`,
        read: false,
        createdAt: new Date().toISOString(),
      },
    ];
    
    saveNotifications(notifications);
  }
};
