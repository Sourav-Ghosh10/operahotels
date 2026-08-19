const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';

export const getPageData = async (slug: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/pages/${slug}`);
        if (!response.ok) {
            throw new Error(`Error fetching page data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};
