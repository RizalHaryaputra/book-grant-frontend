import { ref } from "vue";
import { getAuthors } from "../services/authorService";

    export function useAuthorConfirmation() {
    const authors = ref([]);
    const loading = ref(false);
    const error = ref("");

    const fetchAuthors = async (statusFilter = "") => {
        loading.value = true;
        error.value = "";
        
        try {
        // Sesuai API Contract: GET /author-confirmations mendukung query ?status=
        const response = await getAuthors(statusFilter);
        
        // Sesuai format standard response API: response.data.data
        authors.value = response.data?.data || response.data || [];
        } catch (err) {
        error.value = err.response?.data?.message || "Gagal mengambil data pengajuan hibah.";
        console.error(err);
        } finally {
        loading.value = false;
        }
    };

    return {
        authors,
        loading,
        error,
        fetchAuthors
    };
}