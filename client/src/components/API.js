import axios from 'axios';
import { LANG_VERSIONS } from "../Const";

const API = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston',
});

export const executeCode = async (language, code) => {
    try {
        const response = await API.post('/execute', {
            "language": language,
            "version": LANG_VERSIONS[language] || 'latest', // Default to 'latest' if version is not found
            "files": [  // Corrected from 'flie' to 'files'
                {
                    "content": code,
                }
            ],
        });

        return response.data;
    } catch (error) {
        // Log or handle the error as needed
        console.error('Error executing code:', error);
        throw error; // Re-throw error to be handled by calling function
    }
};

