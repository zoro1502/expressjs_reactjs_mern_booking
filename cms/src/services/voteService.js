import axiosClient from "./axiosClient";
import { buildFilter } from "../services/common";

const voteService = {

	async getLists(params) {
        try {
            let filters = buildFilter(params);
		    return await axiosClient.get(`admin/vote`, {params: filters});
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async findById(id) {
        try {
            return await axiosClient.get(`admin/vote/${id}`);
        } catch (error) {
            return {
                status: 'error'
            }
        }
    },

    async create(data) {
        try {
		    return await axiosClient.post(`admin/vote/store`, data);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async update(id, data) {
        try {
		    return await axiosClient.put(`admin/vote/update/${id}`, data);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async delete(id) {
        try {
		    return await axiosClient.delete(`admin/vote/${id}`);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

}

export default voteService;
