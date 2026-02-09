import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/inventaire.css";

const Inventaire = () => {
  const [voitures, setVoitures] = useState([]);
  const [voituresFiltrees, setVoituresFiltrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vueMode, setVueMode] = useState("cartes"); // "cartes" ou "tableau"
  
  // États pour les filtres
  const [filtreVIN, setFiltreVIN] = useState("");
  const [filtreMarque, setFiltreMarque] = useState("");
  const [filtreAnnee, setFiltreAnnee] = useState("");
  
  // États pour la recherche NHTSA
  const [rechercheNHTSA, setRechercheNHTSA] = useState(false);
  const [vinRecherche, setVinRecherche] = useState("");
  const [marqueRecherche, setMarqueRecherche] = useState("");
  const [anneeRecherche, setAnneeRecherche] = useState("");
  const [loadingNHTSA, setLoadingNHTSA] = useState(false);
  const [resultatNHTSA, setResultatNHTSA] = useState(null);

  // États pour le formulaire d'ajout
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManualAddModal, setShowManualAddModal] = useState(false);
  const [vehiculeToAdd, setVehiculeToAdd] = useState(null);
  const [formData, setFormData] = useState({
    vin: "",
    marque: "",
    modele: "",
    annee: "",
    couleur: "#000000",
    prix: "",
    quantite: 1,
    disponible: true
  });

  // États pour les détails et modification
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVehicule, setSelectedVehicule] = useState(null);
  
  // États pour la vente
  const [showVenteModal, setShowVenteModal] = useState(false);
  const [quantiteVente, setQuantiteVente] = useState(1);

  useEffect(() => {
    fetch("https://myfakeapi.com/api/cars/")
      .then((res) => res.json())
      .then((data) => {
        // Initialiser tous les véhicules avec une quantité en stock
        const voituresAvecStock = data.cars.map(voiture => ({
          ...voiture,
          quantite: voiture.quantite || Math.floor(Math.random() * 10) + 1, // 1 à 10 si pas défini
          availability: (voiture.quantite || 1) > 0 // Disponible si quantité > 0
        }));
        setVoitures(voituresAvecStock);
        setVoituresFiltrees(voituresAvecStock);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des voitures :", err);
        setLoading(false);
      });
  }, []);

  // Fonction de filtrage
  useEffect(() => {
    let resultats = voitures;

    if (filtreVIN) {
      resultats = resultats.filter(v => 
        v.car_vin.toLowerCase().includes(filtreVIN.toLowerCase())
      );
    }

    if (filtreMarque) {
      resultats = resultats.filter(v => 
        v.car.toLowerCase().includes(filtreMarque.toLowerCase())
      );
    }

    if (filtreAnnee) {
      resultats = resultats.filter(v => 
        v.car_model_year.toString().includes(filtreAnnee)
      );
    }

    setVoituresFiltrees(resultats);
  }, [filtreVIN, filtreMarque, filtreAnnee, voitures]);

  const reinitialiserFiltres = () => {
    setFiltreVIN("");
    setFiltreMarque("");
    setFiltreAnnee("");
  };

  // Recherche NHTSA par VIN
  const rechercherParVIN = async () => {
    if (!vinRecherche.trim()) {
      alert("Veuillez entrer un VIN valide");
      return;
    }

    setLoadingNHTSA(true);
    setResultatNHTSA(null);

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vinRecherche}?format=json`
      );
      const data = await response.json();
      
      if (data.Results) {
        // Extraire les informations importantes
        const vehiculeInfo = {};
        data.Results.forEach(item => {
          if (item.Value && item.Value !== "Not Applicable" && item.Value !== "") {
            vehiculeInfo[item.Variable] = item.Value;
          }
        });
        setResultatNHTSA(vehiculeInfo);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche NHTSA:", error);
      alert("Erreur lors de la recherche. Veuillez réessayer.");
    } finally {
      setLoadingNHTSA(false);
    }
  };

  // Recherche NHTSA par marque et année
  const rechercherParMarqueAnnee = async () => {
    if (!marqueRecherche.trim() || !anneeRecherche.trim()) {
      alert("Veuillez entrer une marque et une année");
      return;
    }

    setLoadingNHTSA(true);
    setResultatNHTSA(null);

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${marqueRecherche}/modelyear/${anneeRecherche}?format=json`
      );
      const data = await response.json();
      
      if (data.Results && data.Results.length > 0) {
        setResultatNHTSA({ modeles: data.Results });
      } else {
        alert("Aucun modèle trouvé pour cette marque et année");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche NHTSA:", error);
      alert("Erreur lors de la recherche. Veuillez réessayer.");
    } finally {
      setLoadingNHTSA(false);
    }
  };

  const fermerRechercheNHTSA = () => {
    setRechercheNHTSA(false);
    setResultatNHTSA(null);
    setVinRecherche("");
    setMarqueRecherche("");
    setAnneeRecherche("");
  };

  // Ouvrir le modal d'ajout avec les données NHTSA
  const ouvrirModalAjout = (vehiculeNHTSA) => {
    setVehiculeToAdd(vehiculeNHTSA);
    setFormData({
      vin: vinRecherche || "",
      marque: vehiculeNHTSA.Make || "",
      modele: vehiculeNHTSA.Model || "",
      annee: vehiculeNHTSA["Model Year"] || "",
      couleur: "#000000",
      prix: "",
      quantite: 1,
      disponible: true
    });
    setShowAddModal(true);
  };

  // Ouvrir le modal d'ajout manuel
  const ouvrirModalAjoutManuel = () => {
    setFormData({
      vin: "",
      marque: "",
      modele: "",
      annee: "",
      couleur: "#000000",
      prix: "",
      quantite: 1,
      disponible: true
    });
    setShowManualAddModal(true);
  };

  // Ajouter un modèle depuis la recherche par marque/année
  const ouvrirModalAjoutModele = (modele) => {
    setFormData({
      vin: "",
      marque: modele.Make_Name || "",
      modele: modele.Model_Name || "",
      annee: anneeRecherche || "",
      couleur: "#000000",
      prix: "",
      quantite: 1,
      disponible: true
    });
    setShowAddModal(true);
  };

  // Gérer les changements du formulaire
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Soumettre le formulaire
  const handleSubmitVehicule = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.vin || !formData.marque || !formData.modele || !formData.annee || !formData.prix) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const quantite = parseInt(formData.quantite) || 1;

    // Créer le nouveau véhicule
    const nouveauVehicule = {
      id: Date.now(), // ID temporaire
      car_vin: formData.vin,
      car: formData.marque,
      car_model: formData.modele,
      car_model_year: parseInt(formData.annee),
      car_color: formData.couleur,
      price: formData.prix,
      quantite: quantite,
      availability: quantite > 0
    };

    // Ajouter à la liste
    setVoitures(prev => [nouveauVehicule, ...prev]);
    
    // Fermer le modal
    setShowAddModal(false);
    setShowManualAddModal(false);
    
    // Réinitialiser le formulaire
    setFormData({
      vin: "",
      marque: "",
      modele: "",
      annee: "",
      couleur: "#000000",
      prix: "",
      quantite: 1,
      disponible: true
    });

    alert("✅ Véhicule ajouté avec succès !");
  };

  // Supprimer un véhicule
  const supprimerVehicule = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      setVoitures(prev => prev.filter(v => v.id !== id));
      alert("✅ Véhicule supprimé avec succès !");
    }
  };

  // Ouvrir le modal de détails
  const ouvrirDetailsVehicule = (vehicule) => {
    setSelectedVehicule(vehicule);
    setShowDetailsModal(true);
  };

  // Ouvrir le modal de modification
  const ouvrirModificationVehicule = (vehicule) => {
    setSelectedVehicule(vehicule);
    setFormData({
      vin: vehicule.car_vin || "",
      marque: vehicule.car || "",
      modele: vehicule.car_model || "",
      annee: vehicule.car_model_year || "",
      couleur: vehicule.car_color || "#000000",
      prix: vehicule.price || "",
      quantite: vehicule.quantite || 1,
      disponible: vehicule.availability !== undefined ? vehicule.availability : true
    });
    setShowEditModal(true);
  };

  // Ouvrir le modal de vente
  const ouvrirModalVente = (vehicule) => {
    setSelectedVehicule(vehicule);
    setQuantiteVente(1);
    setShowVenteModal(true);
  };

  // Enregistrer une vente
  const handleVente = (e) => {
    e.preventDefault();
    
    if (!selectedVehicule) return;
    
    const quantiteActuelle = selectedVehicule.quantite || 0;
    
    if (quantiteVente > quantiteActuelle) {
      alert(`❌ Stock insuffisant ! Stock disponible : ${quantiteActuelle}`);
      return;
    }

    const nouvelleQuantite = quantiteActuelle - quantiteVente;

    // Mettre à jour le véhicule
    setVoitures(prev => prev.map(v => 
      v.id === selectedVehicule.id 
        ? {
            ...v,
            quantite: nouvelleQuantite,
            availability: nouvelleQuantite > 0
          }
        : v
    ));

    setShowVenteModal(false);
    setSelectedVehicule(null);
    setQuantiteVente(1);
    
    if (nouvelleQuantite === 0) {
      alert(`✅ Vente enregistrée ! Le véhicule est maintenant ÉPUISÉ.`);
    } else {
      alert(`✅ Vente enregistrée ! Stock restant : ${nouvelleQuantite}`);
    }
  };

  // Soumettre la modification
  const handleSubmitModification = (e) => {
    e.preventDefault();
    
    if (!formData.vin || !formData.marque || !formData.modele || !formData.annee || !formData.prix) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const quantite = parseInt(formData.quantite) || 0;

    // Mettre à jour le véhicule
    setVoitures(prev => prev.map(v => 
      v.id === selectedVehicule.id 
        ? {
            ...v,
            car_vin: formData.vin,
            car: formData.marque,
            car_model: formData.modele,
            car_model_year: parseInt(formData.annee),
            car_color: formData.couleur,
            price: formData.prix,
            quantite: quantite,
            availability: quantite > 0 // Automatiquement épuisé si quantité = 0
          }
        : v
    ));

    setShowEditModal(false);
    setSelectedVehicule(null);
    alert("✅ Véhicule modifié avec succès !");
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading">Chargement de l'inventaire...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="inventaire-container">
        <div className="inventaire-header">
          <h1>🚗 Catalogue de Véhicules</h1>
          <p className="inventaire-subtitle">
            Gérez votre inventaire avec efficacité
          </p>
        </div>

        {/* Boutons d'action principaux */}
        <div className="action-buttons">
          <button 
            className="btn-nhtsa-toggle"
            onClick={() => setRechercheNHTSA(!rechercheNHTSA)}
          >
            {rechercheNHTSA ? "📦 Voir l'inventaire" : "🔍 Recherche NHTSA"}
          </button>
          <button 
            className="btn-add-manual"
            onClick={ouvrirModalAjoutManuel}
          >
            ➕ Ajouter un véhicule
          </button>
        </div>

        {rechercheNHTSA ? (
          // Section de recherche NHTSA
          <div className="nhtsa-search-section">
            <div className="nhtsa-search-card">
              <h2>🔍 Recherche NHTSA</h2>
              <p className="nhtsa-subtitle">
                Recherchez des véhicules dans la base de données NHTSA
              </p>

              <div className="nhtsa-tabs">
                <div className="nhtsa-tab">
                  <h3>Recherche par VIN</h3>
                  <div className="nhtsa-form">
                    <input
                      type="text"
                      placeholder="Entrez le VIN (17 caractères)"
                      value={vinRecherche}
                      onChange={(e) => setVinRecherche(e.target.value.toUpperCase())}
                      className="nhtsa-input"
                      maxLength="17"
                    />
                    <button 
                      className="btn-nhtsa-search"
                      onClick={rechercherParVIN}
                      disabled={loadingNHTSA}
                    >
                      {loadingNHTSA ? "⏳ Recherche..." : "🔎 Rechercher"}
                    </button>
                  </div>
                </div>

                <div className="nhtsa-separator">OU</div>

                <div className="nhtsa-tab">
                  <h3>Recherche par Marque et Année</h3>
                  <div className="nhtsa-form-group">
                    <input
                      type="text"
                      placeholder="Marque (ex: Toyota)"
                      value={marqueRecherche}
                      onChange={(e) => setMarqueRecherche(e.target.value)}
                      className="nhtsa-input"
                    />
                    <input
                      type="number"
                      placeholder="Année (ex: 2020)"
                      value={anneeRecherche}
                      onChange={(e) => setAnneeRecherche(e.target.value)}
                      className="nhtsa-input"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                    />
                    <button 
                      className="btn-nhtsa-search"
                      onClick={rechercherParMarqueAnnee}
                      disabled={loadingNHTSA}
                    >
                      {loadingNHTSA ? "⏳ Recherche..." : "🔎 Rechercher"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Résultats NHTSA */}
              {resultatNHTSA && (
                <div className="nhtsa-results">
                  {resultatNHTSA.modeles ? (
                    <div className="nhtsa-models-grid">
                      <h3>🚙 Modèles trouvés ({resultatNHTSA.modeles.length})</h3>
                      <div className="models-grid">
                        {resultatNHTSA.modeles.map((modele, index) => (
                          <div key={index} className="model-card">
                            <div className="model-info">
                              <h4>{modele.Make_Name}</h4>
                              <p className="model-name">{modele.Model_Name}</p>
                            </div>
                            <button 
                              className="btn-add-model"
                              onClick={() => ouvrirModalAjoutModele(modele)}
                            >
                              ➕ Ajouter
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="nhtsa-vehicle-info">
                      <h3>📋 Informations du véhicule</h3>
                      <div className="vehicle-info-grid">
                        {Object.entries(resultatNHTSA)
                          .filter(([key]) => 
                            ["Make", "Model", "Model Year", "Body Class", "Vehicle Type", 
                             "Engine Number of Cylinders", "Fuel Type - Primary", 
                             "Manufacturer Name", "Plant City", "Plant Country",
                             "Trim", "Series", "Drive Type"].includes(key)
                          )
                          .map(([key, value]) => (
                            <div key={key} className="info-item">
                              <span className="info-key">{key}:</span>
                              <span className="info-val">{value}</span>
                            </div>
                          ))}
                      </div>
                      <button 
                        className="btn-add-to-inventory"
                        onClick={() => ouvrirModalAjout(resultatNHTSA)}
                      >
                        ➕ Ajouter à l'inventaire
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Section d'inventaire existante
          <>
            {/* Section des filtres */}
            <div className="filtres-section">
              <h3>🔍 Filtres de recherche</h3>
              <div className="filtres-container">
                <div className="filtre-item">
                  <label>VIN</label>
                  <input
                    type="text"
                    placeholder="Rechercher par VIN..."
                    value={filtreVIN}
                    onChange={(e) => setFiltreVIN(e.target.value)}
                    className="filtre-input"
                  />
                </div>
                
                <div className="filtre-item">
                  <label>Marque</label>
                  <input
                    type="text"
                    placeholder="Rechercher par marque..."
                    value={filtreMarque}
                    onChange={(e) => setFiltreMarque(e.target.value)}
                    className="filtre-input"
                  />
                </div>
                
                <div className="filtre-item">
                  <label>Année</label>
                  <input
                    type="text"
                    placeholder="Ex: 2020"
                    value={filtreAnnee}
                    onChange={(e) => setFiltreAnnee(e.target.value)}
                    className="filtre-input"
                  />
                </div>

                <button className="btn-reinitialiser" onClick={reinitialiserFiltres}>
                  ↻ Réinitialiser
                </button>
              </div>
            </div>

            {/* Barre d'outils */}
            <div className="toolbar">
              <div className="resultats-count">
                <span className="count-badge">{voituresFiltrees.length}</span>
                <span>véhicule(s) trouvé(s)</span>
              </div>
              
              <div className="vue-toggle">
                <button 
                  className={`vue-btn ${vueMode === "cartes" ? "active" : ""}`}
                  onClick={() => setVueMode("cartes")}
                  title="Vue en cartes"
                >
                  ▦
                </button>
                <button 
                  className={`vue-btn ${vueMode === "tableau" ? "active" : ""}`}
                  onClick={() => setVueMode("tableau")}
                  title="Vue en tableau"
                >
                  ☰
                </button>
              </div>
            </div>

            {/* Affichage des résultats */}
            {voituresFiltrees.length === 0 ? (
              <div className="no-results">
                <p>😔 Aucun véhicule ne correspond à vos critères</p>
                <button className="btn-reinitialiser" onClick={reinitialiserFiltres}>
                  Voir tous les véhicules
                </button>
              </div>
            ) : vueMode === "cartes" ? (
              <div className="cartes-grid">
                {voituresFiltrees.map((voiture) => (
                  <div key={voiture.id} className="voiture-carte">
                    <div className="carte-header">
                      <h3>{voiture.car}</h3>
                      <span className="badge-annee">{voiture.car_model_year}</span>
                    </div>
                    <div className="carte-body">
                      <div className="info-row">
                        <span className="info-label">Modèle:</span>
                        <span className="info-value">{voiture.car_model}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">VIN:</span>
                        <span className="info-value vin-text">{voiture.car_vin}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Couleur:</span>
                        <span className="info-value">
                          <span className="color-dot" style={{backgroundColor: voiture.car_color}}></span>
                          {voiture.car_color}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Prix:</span>
                        <span className="info-value price">{voiture.price}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Stock:</span>
                        <span className="info-value">
                          <span className={`badge-stock ${voiture.quantite === 0 ? 'epuise' : voiture.quantite <= 3 ? 'faible' : 'disponible'}`}>
                            {voiture.quantite || 0} en stock
                          </span>
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Disponibilité:</span>
                        <span className="info-value">
                          <span className="badge-disponible">{voiture.availability ? "✓ Disponible" : "✗ Épuisé"}</span>
                        </span>
                      </div>
                    </div>
                    <div className="carte-footer">
                      <button className="btn-details" onClick={() => ouvrirDetailsVehicule(voiture)}>👁️</button>
                      <button className="btn-modifier" onClick={() => ouvrirModificationVehicule(voiture)}>✏️</button>
                      {voiture.availability && (
                        <button className="btn-vendre" onClick={() => ouvrirModalVente(voiture)}>💰</button>
                      )}
                      <button className="btn-delete" onClick={() => supprimerVehicule(voiture.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="tableau-container">
                <table className="inventaire-table">
                  <thead>
                    <tr>
                      <th>VIN</th>
                      <th>Marque</th>
                      <th>Modèle</th>
                      <th>Année</th>
                      <th>Couleur</th>
                      <th>Prix</th>
                      <th>Stock</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voituresFiltrees.map((voiture) => (
                      <tr key={voiture.id}>
                        <td className="vin-text">{voiture.car_vin}</td>
                        <td><strong>{voiture.car}</strong></td>
                        <td>{voiture.car_model}</td>
                        <td><span className="badge-annee-small">{voiture.car_model_year}</span></td>
                        <td>
                          <span className="color-indicator">
                            <span className="color-dot-small" style={{backgroundColor: voiture.car_color}}></span>
                            {voiture.car_color}
                          </span>
                        </td>
                        <td className="price">{voiture.price}</td>
                        <td>
                          <span className={`badge-stock-table ${voiture.quantite === 0 ? 'epuise' : voiture.quantite <= 3 ? 'faible' : 'disponible'}`}>
                            {voiture.quantite || 0}
                          </span>
                        </td>
                        <td>
                          <span className={`badge-status ${voiture.availability ? 'disponible' : 'indisponible'}`}>
                            {voiture.availability ? "✓ Disponible" : "✗ Épuisé"}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button className="btn-table-action" title="Voir" onClick={() => ouvrirDetailsVehicule(voiture)}>👁️</button>
                          <button className="btn-table-action" title="Modifier" onClick={() => ouvrirModificationVehicule(voiture)}>✏️</button>
                          {voiture.availability && (
                            <button className="btn-table-action vendre" title="Vendre" onClick={() => ouvrirModalVente(voiture)}>💰</button>
                          )}
                          <button className="btn-table-action danger" title="Supprimer" onClick={() => supprimerVehicule(voiture.id)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de détails */}
      {showDetailsModal && selectedVehicule && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content modal-details" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>👁️ Détails du véhicule</h2>
              <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✕</button>
            </div>
            
            <div className="details-content">
              <div className="details-hero">
                <div className="details-hero-left">
                  <h3>{selectedVehicule.car}</h3>
                  <p className="details-model">{selectedVehicule.car_model}</p>
                  <span className="details-year-badge">{selectedVehicule.car_model_year}</span>
                </div>
                <div className="details-hero-right">
                  <div className="details-price">{selectedVehicule.price}</div>
                  <span className={`details-status ${selectedVehicule.availability ? 'disponible' : 'indisponible'}`}>
                    {selectedVehicule.availability ? "✓ En stock" : "✗ Épuisé"}
                  </span>
                </div>
              </div>

              <div className="details-grid">
                <div className="details-item">
                  <span className="details-label">🔖 VIN</span>
                  <span className="details-value vin">{selectedVehicule.car_vin}</span>
                </div>

                <div className="details-item">
                  <span className="details-label">🏢 Marque</span>
                  <span className="details-value">{selectedVehicule.car}</span>
                </div>

                <div className="details-item">
                  <span className="details-label">🚗 Modèle</span>
                  <span className="details-value">{selectedVehicule.car_model}</span>
                </div>

                <div className="details-item">
                  <span className="details-label">📅 Année</span>
                  <span className="details-value">{selectedVehicule.car_model_year}</span>
                </div>

                <div className="details-item">
                  <span className="details-label">🎨 Couleur</span>
                  <span className="details-value">
                    <span className="color-preview" style={{backgroundColor: selectedVehicule.car_color}}></span>
                    {selectedVehicule.car_color}
                  </span>
                </div>

                <div className="details-item">
                  <span className="details-label">💰 Prix</span>
                  <span className="details-value price-highlight">{selectedVehicule.price}</span>
                </div>

                <div className="details-item">
                  <span className="details-label">📦 Stock</span>
                  <span className="details-value">
                    <span className={`stock-badge-large ${selectedVehicule.quantite === 0 ? 'epuise' : selectedVehicule.quantite <= 3 ? 'faible' : 'disponible'}`}>
                      {selectedVehicule.quantite || 0} unité(s)
                    </span>
                  </span>
                </div>

                <div className="details-item">
                  <span className="details-label">✅ Disponibilité</span>
                  <span className="details-value">
                    <span className={`status-badge ${selectedVehicule.availability ? 'disponible' : 'indisponible'}`}>
                      {selectedVehicule.availability ? "Disponible" : "Épuisé"}
                    </span>
                  </span>
                </div>

                <div className="details-item">
                  <span className="details-label">🆔 ID</span>
                  <span className="details-value">#{selectedVehicule.id}</span>
                </div>
              </div>

              <div className="details-actions">
                {selectedVehicule.availability && (
                  <button className="btn-vendre-from-details" onClick={() => {
                    setShowDetailsModal(false);
                    ouvrirModalVente(selectedVehicule);
                  }}>
                    💰 Vendre
                  </button>
                )}
                <button className="btn-edit-from-details" onClick={() => {
                  setShowDetailsModal(false);
                  ouvrirModificationVehicule(selectedVehicule);
                }}>
                  ✏️ Modifier
                </button>
                <button className="btn-close-details" onClick={() => setShowDetailsModal(false)}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification */}
      {showEditModal && selectedVehicule && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Modifier le véhicule</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            
            <form onSubmit={handleSubmitModification} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>VIN <span className="required">*</span></label>
                  <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleFormChange}
                    placeholder="Numéro VIN (17 caractères)"
                    maxLength="17"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Marque <span className="required">*</span></label>
                  <input
                    type="text"
                    name="marque"
                    value={formData.marque}
                    onChange={handleFormChange}
                    placeholder="Ex: Toyota"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Modèle <span className="required">*</span></label>
                  <input
                    type="text"
                    name="modele"
                    value={formData.modele}
                    onChange={handleFormChange}
                    placeholder="Ex: Camry"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Année <span className="required">*</span></label>
                  <input
                    type="number"
                    name="annee"
                    value={formData.annee}
                    onChange={handleFormChange}
                    placeholder="Ex: 2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Couleur <span className="required">*</span></label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      name="couleur"
                      value={formData.couleur}
                      onChange={handleFormChange}
                      className="color-picker"
                    />
                    <input
                      type="text"
                      value={formData.couleur}
                      onChange={(e) => setFormData(prev => ({ ...prev, couleur: e.target.value }))}
                      placeholder="#000000"
                      className="color-text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix <span className="required">*</span></label>
                  <input
                    type="text"
                    name="prix"
                    value={formData.prix}
                    onChange={handleFormChange}
                    placeholder="Ex: 25 000 €"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Quantité en stock <span className="required">*</span></label>
                  <input
                    type="number"
                    name="quantite"
                    value={formData.quantite}
                    onChange={handleFormChange}
                    placeholder="Ex: 5"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-submit-modal">
                  ✓ Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal d'ajout de véhicule (NHTSA ou Manuel) */}
      {(showAddModal || showManualAddModal) && (
        <div className="modal-overlay" onClick={() => { setShowAddModal(false); setShowManualAddModal(false); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ Ajouter un véhicule</h2>
              <button className="modal-close" onClick={() => { setShowAddModal(false); setShowManualAddModal(false); }}>✕</button>
            </div>
            
            <form onSubmit={handleSubmitVehicule} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>VIN <span className="required">*</span></label>
                  <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleFormChange}
                    placeholder="Numéro VIN (17 caractères)"
                    maxLength="17"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Marque <span className="required">*</span></label>
                  <input
                    type="text"
                    name="marque"
                    value={formData.marque}
                    onChange={handleFormChange}
                    placeholder="Ex: Toyota"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Modèle <span className="required">*</span></label>
                  <input
                    type="text"
                    name="modele"
                    value={formData.modele}
                    onChange={handleFormChange}
                    placeholder="Ex: Camry"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Année <span className="required">*</span></label>
                  <input
                    type="number"
                    name="annee"
                    value={formData.annee}
                    onChange={handleFormChange}
                    placeholder="Ex: 2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Couleur <span className="required">*</span></label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      name="couleur"
                      value={formData.couleur}
                      onChange={handleFormChange}
                      className="color-picker"
                    />
                    <input
                      type="text"
                      value={formData.couleur}
                      onChange={(e) => setFormData(prev => ({ ...prev, couleur: e.target.value }))}
                      placeholder="#000000"
                      className="color-text"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix <span className="required">*</span></label>
                  <input
                    type="text"
                    name="prix"
                    value={formData.prix}
                    onChange={handleFormChange}
                    placeholder="Ex: 25 000 €"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Quantité en stock <span className="required">*</span></label>
                  <input
                    type="number"
                    name="quantite"
                    value={formData.quantite}
                    onChange={handleFormChange}
                    placeholder="Ex: 5"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => { setShowAddModal(false); setShowManualAddModal(false); }}>
                  Annuler
                </button>
                <button type="submit" className="btn-submit-modal">
                  ✓ Ajouter le véhicule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de vente */}
      {showVenteModal && selectedVehicule && (
        <div className="modal-overlay" onClick={() => setShowVenteModal(false)}>
          <div className="modal-content modal-vente" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💰 Enregistrer une vente</h2>
              <button className="modal-close" onClick={() => setShowVenteModal(false)}>✕</button>
            </div>
            
            <div className="vente-content">
              <div className="vente-vehicule-info">
                <h3>{selectedVehicule.car} {selectedVehicule.car_model}</h3>
                <p className="vente-details">
                  <span>VIN: {selectedVehicule.car_vin}</span>
                  <span>Année: {selectedVehicule.car_model_year}</span>
                </p>
                <div className="vente-stock-info">
                  <span className="stock-label">Stock actuel:</span>
                  <span className={`stock-value ${selectedVehicule.quantite <= 3 ? 'faible' : 'disponible'}`}>
                    {selectedVehicule.quantite} unité(s)
                  </span>
                </div>
                <div className="vente-price-info">
                  <span className="price-label">Prix unitaire:</span>
                  <span className="price-value">{selectedVehicule.price}</span>
                </div>
              </div>

              <form onSubmit={handleVente} className="vente-form">
                <div className="form-group-vente">
                  <label>Quantité à vendre <span className="required">*</span></label>
                  <input
                    type="number"
                    value={quantiteVente}
                    onChange={(e) => setQuantiteVente(parseInt(e.target.value) || 1)}
                    min="1"
                    max={selectedVehicule.quantite}
                    required
                    className="vente-input"
                  />
                  <span className="input-hint">
                    Maximum: {selectedVehicule.quantite}
                  </span>
                </div>

                <div className="vente-summary">
                  <div className="summary-row">
                    <span>Quantité vendue:</span>
                    <span className="summary-value">{quantiteVente}</span>
                  </div>
                  <div className="summary-row">
                    <span>Stock restant:</span>
                    <span className={`summary-value ${(selectedVehicule.quantite - quantiteVente) === 0 ? 'epuise' : (selectedVehicule.quantite - quantiteVente) <= 3 ? 'faible' : 'disponible'}`}>
                      {selectedVehicule.quantite - quantiteVente} unité(s)
                      {(selectedVehicule.quantite - quantiteVente) === 0 && " (ÉPUISÉ)"}
                    </span>
                  </div>
                </div>

                <div className="vente-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowVenteModal(false)}>
                    Annuler
                  </button>
                  <button type="submit" className="btn-vendre-confirm">
                    ✓ Confirmer la vente
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventaire;
