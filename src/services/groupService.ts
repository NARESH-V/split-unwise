import { response } from "express";
import { Group } from "../common/models";
import axios from "axios";
import { BASE_URL } from "../common/constants.tsx";
import { HttpWrapper } from "./httpWrapper.ts";

export class GroupService extends HttpWrapper {
    /**
     * Get group list by UserId
     * @param userId
     * @returns list of groups
     */
    public getGroupList(userId?: number): Group[]  {
        let groups: Group[] = [];

        this.http.GET(`${this.baseApiRoot}/group/get/2`)
        .then((response) => {
            groups = response.data;
            return groups;
        }).catch((error: any) => console.log(error));
        
        return groups;
    }


    /**
     * Create Group
     * @param payload
     * @returns response with status code
     */
    public createGroup(payload) {
        return this.http.POST(`${this.baseApiRoot}/group/create`, payload);
    }
}