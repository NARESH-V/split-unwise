import React from "react";

export interface Friend {
    name: string;
    userId: number;
    email: string;
}

export interface Group {
    name: string;
    groupId?: number;
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