import { Friend, Group, GroupFriend, GroupFriendOption, GroupType } from "./models";
import CardTravelIcon from '@mui/icons-material/CardTravel';
import GiteIcon from '@mui/icons-material/Gite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";

export const GROUP_TYPES: GroupType[] =[
    {label: 'Trip', icon: <CardTravelIcon/>},
    {label: 'Home', icon: <GiteIcon/>},
    {label: 'Couple', icon: <FavoriteBorderIcon/>},
]

// Temp data
const FRIENDS: Friend[] = [
    {name: 'Naresh', email: 'xyz@gmail.com', userId: 1},
    {name: 'karthi', email: 'kar@gmail.com', userId: 2},
    {name: 'balaji', email: 'bal@gmail.com', userId: 3},
    {name: 'Vasanth', email: 'vash@gmail.com', userId: 4}
  ];

export const GROUPS: Group[] = [
    {groupId: 123, name : 'Naresh Venkat', description: 'random'},
    {groupId: 112, name : 'Karthic Kumar', description: 'Random'},
    {groupId: 123, name : 'Vasanth S', description: 'random'},
    {groupId: 145, name : 'Balaji S', description: 'Random'},
    {groupId: 155, name : 'Naresh Vegfgfvnkat 2', description: 'random'},
    {groupId: 144, name : 'Balaji S', description: 'Random'},
    {groupId: 167, name : 'Karthic Kumar 3', description: 'Random'},
    {groupId: 166, name : 'Balaji S', description: 'Random'},
    {groupId: 177, name : 'Karthic Kumar 3', description: 'Random'},
    {groupId: 18, name : 'Balaji S', description: 'Random'},
    { groupId: 39, name : 'Karthic Kumar 3', description: 'Random'},
];

export const GROUP_FRIENDS_OPTIONS: GroupFriendOption[] = [...FRIENDS, ...GROUPS].map((option: GroupFriend) => {
    return {
        category: !!option.groupId ? 'Groups' : 'Friends',
        label: option.name,
        value: option
    }
});