import create from "zustand";
import axios from "axios";
const useCertificationStore = create((set) => ({
	certifications: [],
	fetchCertifications: async () => {
		try {
			const response = await axios.get("https://cms.samaritansc.com/doctors");
			set({ certifications: response.data });
		} catch (error) {
			console.error(error);
		}
	},
}));

export default useCertificationStore;
