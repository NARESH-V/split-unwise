import React from "react";

export interface Friend {
    name: string;
    userId: number;
    email: string;
}

export interface Group {
    name: string;
    groupId: number;
    description?: string;
    members?: GroupMember[];
    createdBy?: number;
}

export interface GroupMember {
    userId: number;
    userName: string;
    email: string;
    role?: 'admin' | 'member';
}

export interface GroupFriend {
    name: string;
    groupId?: number;
    userId?: number;
    email?: string
}

export interface GroupFriendOption {
    label: string;
    value: GroupFriend;
    category: string;
}

export interface GroupType {
    label: string;
    icon: React.JSX.Element;
}

export interface CreateGroupRequest {
    group_name: string;
    user_id_list?: number[]
    group_type: string;
    user_id: number;
    description?: string;
}

export interface User {
    name: string;
    email: string;
    picture?: any;
    id?: string;
}

export interface OAuthUser {
    access_token: string;
}

export interface Expense {
    expenseId: number;
    groupId: number;
    description: string;
    amount: number;
    paidBy: number;
    paidByName?: string;
    splitMethod: string;
    splitDetails: SplitDetail[];
    createdAt?: string;
    date?: string;
    category?: string;
}

export interface SplitDetail {
    userId: number;
    userName?: string;
    amount: number;
    percentage?: number;
    isPaid?: boolean;
}

export interface Activity {
    activityId: number;
    groupId?: number;
    groupName?: string;
    expenseId?: number;
    description: string;
    amount: number;
    activityType: 'expense_added' | 'expense_deleted' | 'payment_made' | 'group_created';
    createdBy: number;
    createdByName?: string;
    createdAt: string;
}