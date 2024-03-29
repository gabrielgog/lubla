/** @format */

const client_id = "170734b02ff544e2ad34d6d376f6b474";
const client_secret = "b8dd36c734994cdeab9f066e20f6a9a6";

export default {
	data() {
		return {
			client_id,
			client_secret,
			loadingPage: false,
		};
	},
	created() {
		this.getAccessToken();
	},
	methods: {
		async getAccessToken() {
			this.loadingPage = true;
			const config = {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
			};
			try {
				const result = await fetch(
					"https://accounts.spotify.com/api/token",
					config
				);
				const response = await result.json();
				localStorage.setItem("access_token", response?.access_token);
			} catch (err) {
				return err;
			} finally {
				this.loadingPage = false;
			}
		},
	},
};
