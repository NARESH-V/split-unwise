import { Group, Expense, GroupMember } from "../common/models";
import { HttpWrapper } from "./httpWrapper.ts";
import localStorageDB from "./localStorageDB.ts";

export class GroupService extends HttpWrapper {
    /**
     * Get group list by UserId
     * @param userId
     * @returns list of groups
     */
    public async getGroupList(userId: number): Promise<Group[]>  {
        try {
            // Use local storage DB
            const groups = localStorageDB.getGroupsByUserId(userId);
            // Simulate async behavior
            return new Promise((resolve) => {
                setTimeout(() => resolve(groups), 100);
            });
        } catch (error: any) {
            console.error('Error fetching groups:', error);
            return [];
        }
    }

    /**
     * Create Group
     * @param payload
     * @param members - optional members to add to the group
     * @returns response with created group
     */
    public async createGroup(payload: any, members?: GroupMember[]): Promise<Group> {
        try {
            // Use local storage DB
            const newGroup = localStorageDB.addGroup({
                name: payload.group_name,
                description: payload.description,
                members: members || [],
                createdBy: payload.user_id
            });
            
            // Simulate async behavior
            return new Promise((resolve) => {
                setTimeout(() => resolve(newGroup), 100);
            });
        } catch (error: any) {
            console.error('Error creating group:', error);
            throw error;
        }
    }

    /**
     * getGroupExpense
     * @param groupId 
     * @returns list of expenses in a group
     */
    public async getGroupExpense(groupId: number): Promise<Expense[]> {
        try {
            // Use local storage DB
            const expenses = localStorageDB.getExpensesByGroupId(groupId);
            // Simulate async behavior
            return new Promise((resolve) => {
                setTimeout(() => resolve(expenses), 100);
            });
        } catch (error: any) {
            console.error('Error fetching group expenses:', error);
            return [];
        }
    }

    /**
     * Add expense to group
     * @param payload expense data
     * @returns response with created expense
     */
    public async addExpense(payload: any): Promise<Expense> {
        try {
            // Use local storage DB
            const newExpense = localStorageDB.addExpense({
                groupId: payload.groupId,
                description: payload.description,
                amount: payload.amount,
                paidBy: payload.paidBy,
                paidByName: payload.paidByName,
                splitMethod: payload.splitMethod,
                splitDetails: payload.splitDetails,
                category: payload.category
            });
            
            // Simulate async behavior
            return new Promise((resolve) => {
                setTimeout(() => resolve(newExpense), 100);
            });
        } catch (error: any) {
            console.error('Error adding expense:', error);
            throw error;
        }
    }

    /**
     * Delete expense
     * @param expenseId 
     * @returns response
     */
    public async deleteExpense(expenseId: number): Promise<boolean> {
        try {
            // Use local storage DB
            const success = localStorageDB.deleteExpense(expenseId);
            // Simulate async behavior
            return new Promise((resolve) => {
                setTimeout(() => resolve(success), 100);
            });
        } catch (error: any) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    }
}