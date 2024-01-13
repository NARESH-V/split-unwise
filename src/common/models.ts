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