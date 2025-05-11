const API_URL = 'http://localhost:8080/plat';

export const platAPI = {
    async createPlat(platJson, photoFile){
        const token = localStorage.getItem("token");
        if(!token){
            throw new Error("Le token est manquant. Vous devez être connecté.");
        }
        const formData = new FormData();
        formData.append('plat', JSON.stringify(platJson));
        formData.append('photo', photoFile);

        const response = await fetch(`${API_URL}`,{
            method:'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if(!response.ok) throw new Error("Erreur lors de la creation");
        return response.json();
    },

    async getPlat(){
        const token = localStorage.getItem("token");
        if(!token){
            throw new Error("Le token est manquant. Vous devez être connecté.");
        }
        const response = await fetch(`${API_URL}/mes-plats`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if(!response.ok) throw new Error("Erreur lors du chargement des plats du vendeur");
        return response.json();
    },

    async updatePlat(id, platJson, photoFile){
        const token = localStorage.getItem("token");
        if(!token){
            throw new Error("Le token est manquant. Vous devez être connecté.");
        }
        const formData = new FormData();
        formData.append('plat', JSON.stringify(platJson));
        if(photoFile){
            formData.append('photo', photoFile);
        }
        
        const response = await fetch(`${API_URL}/${id}`,{
            method:'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if(!response.ok) throw new Error("Erreur lors de la creation");
        return response.json();
    },

    async deletePlat(id){
        const token = localStorage.getItem("token");
        if(!token){
            throw new Error("Le token est manquant. Vous devez être connecté.");
        }
        const response = await fetch(`${API_URL}/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if(!response.ok) throw new Error("Erreur lors de la suppression du plat");
    },
};