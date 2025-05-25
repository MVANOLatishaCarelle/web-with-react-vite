const API_URL = 'http://localhost:8080/api/commande';

export const commandeAPI = {
  async getCommandeById(id) {
    if (!id || isNaN(id)) {
      throw new Error("Invalid order ID");
    }
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Le token est manquant. Vous devez être connecté.");
    }
    
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Erreur lors du chargement de la commande");
    }
    
    return response.json();
  },

  async getAllCommandesSaufLivre() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Le token est manquant. Vous devez être connecté.");
    }
    
    const response = await fetch(`${API_URL}/livre`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Erreur lors du chargement des commandes");
    }
    
    return response.json();
  },

  async updateCommandeStatus(id, newStatus) {
    if (!id || isNaN(id)) {
      throw new Error("Invalid order ID");
    }
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Le token est manquant. Vous devez être connecté.");
    }
    
    const response = await fetch(`${API_URL}/${id}/en-livraison`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newStatus)
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Erreur lors de la modification du status de la commande");
    }
    
    return response.json();
  }
};