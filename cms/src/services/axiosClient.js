import axios from 'axios';
import { timeDelay } from './common';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_URL_API,
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(),
})

if (localStorage.getItem('access_token')) {
	console.log('================= TOKEN LOGIN : => ', localStorage.getItem('access_token'));
	axiosClient.defaults.headers.common['x_authorization'] = localStorage.getItem('access_token');
}

axiosClient.interceptors.response.use(
     async (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
		let data = response.data;
        if ((data && data?.code === '401')) {
            localStorage.clear();
			 window.location.href = `/auth/login`;
			 return{
				status: 401,
				message: 'error'
			 };
        } else if(data?.code === '403') {
			window.location.href = `/403`;
			return{
				status: 403,
				message: 'error'
			 };
		}
		return response.data;
    },
     async (error) => {
		console.log('error--------> ', error);
		// await timeDelay( 1000 );

        if (error?.response?.status === 403) {
			window.location.href = `/403`;
			return;
        }
		 if (error?.response?.status === 401) {
			 localStorage.clear();
			 window.location.href = `/auth/login`;
			 return{
				status: 401,
				message: 'error'
			 };
		 }

		let dataError = error.response?.data || null;
		if ((dataError && dataError?.code === '401')) {
            localStorage.clear();
			 window.location.href = `/auth/login`;
			 return {
				status: 401,
				message: 'error'
			 };
        } else if(dataError?.code === '403') {
			window.location.href = `/403`;
			return{
				status: 403,
				message: 'error'
			 };
		}
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
       return  Promise.reject(error.response?.data)
    }
)

export default axiosClient;
