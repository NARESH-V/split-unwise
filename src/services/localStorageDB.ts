import { Group, Expense, Activity, User } from '../common/models';

/**
 * Local Storage Database Service
 * Simulates a database using browser's localStorage
 */

class LocalStorageDB {
  private static instance: LocalStorageDB;

  private constructor() {
    this.initializeDB();
  }

  public static getInstance(): LocalStorageDB {
    if (!LocalStorageDB.instance) {
      LocalStorageDB.instance = new LocalStorageDB();
    }
    return LocalStorageDB.instance;
  }

  private initializeDB() {
    // Initialize storage if empty
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('groups')) {
      localStorage.setItem('groups', JSON.stringify([]));
    }
    if (!localStorage.getItem('expenses')) {
      localStorage.setItem('expenses', JSON.stringify([]));
    }
    if (!localStorage.getItem('activities')) {
      localStorage.setItem('activities', JSON.stringify([]));
    }
    if (!localStorage.getItem('nextGroupId')) {
      localStorage.setItem('nextGroupId', '1');
    }
    if (!localStorage.getItem('nextExpenseId')) {
      localStorage.setItem('nextExpenseId', '1');
    }
    if (!localStorage.getItem('nextActivityId')) {
      localStorage.setItem('nextActivityId', '1');
    }
  }

  // User Operations
  public getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  public getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.email === email) || null;
  }

  public addUser(user: User): User {
    const users = this.getUsers();
    const existingUser = this.getUserByEmail(user.email);
    if (existingUser) {
      return existingUser;
    }
    
    const newUser = {
      ...user,
      id: user.id || String(Date.now())
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  }

  // Group Operations
  public getGroups(): Group[] {
    return JSON.parse(localStorage.getItem('groups') || '[]');
  }

  public getGroupsByUserId(userId: number | string): Group[] {
    const groups = this.getGroups();
    // For now, return all groups since we don't have user-group mapping
    // In a real app, you'd filter by userId
    return groups;
  }

  public addGroup(group: Omit<Group, 'groupId'>): Group {
    const groups = this.getGroups();
    const nextId = parseInt(localStorage.getItem('nextGroupId') || '1');
    
    const newGroup: Group = {
      ...group,
      groupId: nextId
    };
    
    groups.push(newGroup);
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('nextGroupId', String(nextId + 1));
    
    // Add activity
    this.addActivity({
      activityType: 'group_created',
      description: `Group "${group.name}" created`,
      amount: 0,
      createdBy: 0,
      createdByName: 'You',
      groupId: newGroup.groupId,
      groupName: newGroup.name
    });
    
    return newGroup;
  }

  public updateGroup(groupId: number, updates: Partial<Group>): Group | null {
    const groups = this.getGroups();
    const index = groups.findIndex(g => g.groupId === groupId);
    
    if (index === -1) return null;
    
    groups[index] = { ...groups[index], ...updates };
    localStorage.setItem('groups', JSON.stringify(groups));
    
    return groups[index];
  }

  public addMemberToGroup(groupId: number, member: { userId: number; userName: string; email: string }): boolean {
    const groups = this.getGroups();
    const group = groups.find(g => g.groupId === groupId);
    
    if (!group) return false;
    
    if (!group.members) {
      group.members = [];
    }
    
    // Check if member already exists
    const exists = group.members.some(m => m.userId === member.userId);
    if (exists) return false;
    
    group.members.push({
      ...member,
      role: 'member'
    });
    
    localStorage.setItem('groups', JSON.stringify(groups));
    return true;
  }

  public removeMemberFromGroup(groupId: number, userId: number): boolean {
    const groups = this.getGroups();
    const group = groups.find(g => g.groupId === groupId);
    
    if (!group || !group.members) return false;
    
    group.members = group.members.filter(m => m.userId !== userId);
    localStorage.setItem('groups', JSON.stringify(groups));
    return true;
  }

  public deleteGroup(groupId: number): boolean {
    const groups = this.getGroups();
    const filtered = groups.filter(g => g.groupId !== groupId);
    localStorage.setItem('groups', JSON.stringify(filtered));
    
    // Also delete related expenses
    const expenses = this.getExpenses();
    const filteredExpenses = expenses.filter(e => e.groupId !== groupId);
    localStorage.setItem('expenses', JSON.stringify(filteredExpenses));
    
    return true;
  }

  // Expense Operations
  public getExpenses(): Expense[] {
    return JSON.parse(localStorage.getItem('expenses') || '[]');
  }

  public getExpensesByGroupId(groupId: number): Expense[] {
    const expenses = this.getExpenses();
    return expenses.filter(e => e.groupId === groupId);
  }

  public addExpense(expense: Omit<Expense, 'expenseId'>): Expense {
    const expenses = this.getExpenses();
    const nextId = parseInt(localStorage.getItem('nextExpenseId') || '1');
    
    const newExpense: Expense = {
      ...expense,
      expenseId: nextId,
      createdAt: new Date().toISOString()
    };
    
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('nextExpenseId', String(nextId + 1));
    
    // Add activity
    const groups = this.getGroups();
    const group = groups.find(g => g.groupId === expense.groupId);
    
    this.addActivity({
      activityType: 'expense_added',
      description: expense.description,
      amount: expense.amount,
      createdBy: expense.paidBy,
      createdByName: expense.paidByName || 'Someone',
      groupId: expense.groupId,
      groupName: group?.name,
      expenseId: newExpense.expenseId
    });
    
    return newExpense;
  }

  public deleteExpense(expenseId: number): boolean {
    const expenses = this.getExpenses();
    const expense = expenses.find(e => e.expenseId === expenseId);
    const filtered = expenses.filter(e => e.expenseId !== expenseId);
    localStorage.setItem('expenses', JSON.stringify(filtered));
    
    if (expense) {
      const groups = this.getGroups();
      const group = groups.find(g => g.groupId === expense.groupId);
      
      this.addActivity({
        activityType: 'expense_deleted',
        description: expense.description,
        amount: expense.amount,
        createdBy: expense.paidBy,
        createdByName: expense.paidByName || 'Someone',
        groupId: expense.groupId,
        groupName: group?.name
      });
    }
    
    return true;
  }

  // Activity Operations
  public getActivities(): Activity[] {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    // Sort by newest first
    return activities.sort((a: Activity, b: Activity) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public addActivity(activity: Omit<Activity, 'activityId' | 'createdAt'>): Activity {
    const activities = this.getActivities();
    const nextId = parseInt(localStorage.getItem('nextActivityId') || '1');
    
    const newActivity: Activity = {
      ...activity,
      activityId: nextId,
      createdAt: new Date().toISOString()
    };
    
    activities.push(newActivity);
    localStorage.setItem('activities', JSON.stringify(activities));
    localStorage.setItem('nextActivityId', String(nextId + 1));
    
    return newActivity;
  }

  // Utility Operations
  public clearAll(): void {
    localStorage.removeItem('users');
    localStorage.removeItem('groups');
    localStorage.removeItem('expenses');
    localStorage.removeItem('activities');
    localStorage.removeItem('nextGroupId');
    localStorage.removeItem('nextExpenseId');
    localStorage.removeItem('nextActivityId');
    this.initializeDB();
  }

  public seedData(): void {
    // Add sample data for testing
    const groups = this.getGroups();
    if (groups.length === 0) {
      this.addGroup({
        name: 'Weekend Trip',
        description: 'Beach vacation with friends'
      });
      
      this.addGroup({
        name: 'Home Expenses',
        description: 'Monthly household costs'
      });
      
      this.addGroup({
        name: 'Office Party',
        description: 'Team celebration dinner'
      });
    }
  }
}

export default LocalStorageDB.getInstance();

