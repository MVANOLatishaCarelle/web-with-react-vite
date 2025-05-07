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

        if(!response.ok) throw new Error("Erreur lord de la creation");
        return response.json();
    }
};