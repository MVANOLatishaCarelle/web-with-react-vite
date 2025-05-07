const API_URL = 'http://localhost:8080/vendeur';

export const vendeurAPI = {
    async createVendeur(vendeurJson, photoFile) {
        const formData = new FormData();
        formData.append('vendeur', JSON.stringify(vendeurJson));
        formData.append('photo', photoFile);

        const response = await fetch(`${API_URL}`,{
            method: 'POST',
            body: formData,
        });

        if(!response.ok){
            const errorMessage = await response.text();
            throw new Error(errorMessage || "Erreur lors de la creation");
        }
        return response.json();
    },

    async authentication(vendeur){
        const response = await fetch(`${API_URL}/auth`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(vendeur),
        });
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.error || "Échec de l'authentification");
        }
        return data.token;
    },
};