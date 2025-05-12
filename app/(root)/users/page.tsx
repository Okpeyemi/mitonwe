"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Trash2, Edit, Info, Plus, X } from 'lucide-react';
import Pagination from '@/components/Pagination';

// Example user data
const users = [
  {
    id: 1,
    name: 'Olivia Rhye',
    username: '@olivia',
    status: 'Active',
    role: 'Product Designer',
    email: 'olivia@untitledui.com',
    phone: '+22901 60 66 60 25',
    avatar: '/avatars/olivia.jpg'
  },
  {
    id: 2,
    name: 'Phoenix Baker',
    username: '@phoenix',
    status: 'Active',
    role: 'Product Manager',
    email: 'phoenix@untitledui.com',
    phone: '+22901 60 66 60 25',
    avatar: '/avatars/phoenix.jpg'
  },
  {
    id: 3,
    name: 'Lana Steiner',
    username: '@lana',
    status: 'Active',
    role: 'Frontend Developer',
    email: 'lana@untitledui.com',
    phone: '+22901 60 66 60 25',
    avatar: '/avatars/lana.jpg'
  },
  {
    id: 4,
    name: 'Demi Wilkinson',
    username: '@demi',
    status: 'Active',
    role: 'Backend Developer',
    email: 'demi@untitledui.com',
    phone: '+22901 60 66 60 25',
    avatar: '/avatars/demi.jpg'
  },
  {
    id: 5,
    name: 'Candice Wu',
    username: '@candice',
    status: 'Active',
    role: 'Fullstack Developer',
    email: 'candice@untitledui.com',
    phone: '+22901 60 66 60 25',
    avatar: '/avatars/candice.jpg'
  },
  {
    id: 6,
    name: 'Natali Craig',
    username: '@natali',
    status: 'Active',
    role: 'UX Designer',
    email: 'natali@untitledui.com',
    phone: '+22901 60 66 60 25',
    avatar: '/avatars/natali.jpg'
  },
];

export default function UsersPage() {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // États pour gérer les modales
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<typeof users[0] | null>(null);

  // États pour le formulaire d'ajout/modification
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  // Calculer les utilisateurs à afficher sur la page actuelle
  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle selection of a user
  const toggleUserSelection = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Toggle selection of all users
  const toggleAllUsers = () => {
    if (selectedUsers.length === displayedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(displayedUsers.map(user => user.id));
    }
  };

  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Ouvrir le modal d'édition avec les données de l'utilisateur
  const handleEditClick = (user: typeof users[0]) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      role: user.role,
      email: user.email,
      phone: user.phone,
      status: user.status
    });
    setEditModalOpen(true);
  };

  // Ouvrir le modal de suppression avec l'utilisateur à supprimer
  const handleDeleteClick = (user: typeof users[0]) => {
    setCurrentUser(user);
    setDeleteModalOpen(true);
  };

  // Gérer les changements de champ du formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Soumettre le formulaire d'ajout
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouvel utilisateur à ajouter:', formData);
    // Logique pour ajouter l'utilisateur
    setAddModalOpen(false);
  };

  // Soumettre le formulaire d'édition
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Utilisateur à modifier:', currentUser?.id, formData);
    // Logique pour modifier l'utilisateur
    setEditModalOpen(false);
  };

  // Confirmer la suppression
  const handleDeleteConfirm = () => {
    console.log('Utilisateur à supprimer:', currentUser?.id);
    // Logique pour supprimer l'utilisateur
    setDeleteModalOpen(false);
  };

  // Ouvrir le modal d'ajout et réinitialiser le formulaire
  const handleAddClick = () => {
    setFormData({
      name: '',
      username: '',
      role: '',
      email: '',
      phone: '',
      status: 'Active'
    });
    setAddModalOpen(true);
  };

  return (
    <div className="p-6 max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-secondary">Gestion des utilisateurs</h1>
        <button 
          className="bg-secondary text-primary px-4 py-2 rounded-md flex items-center gap-2 hover:bg-secondary-foreground hover:text-secondary transition-colors"
          aria-label="Ajouter un nouveau membre"
          onClick={handleAddClick}
        >
          <Plus size={18} />
          AJOUTER UN NOUVEAU MEMBRE
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary-foreground text-secondary">
              <th className="w-12 p-3 rounded-tl-[10px]">
                <input
                  type="checkbox"
                  className="accent-blue-500"
                  onChange={toggleAllUsers}
                  checked={selectedUsers.length === displayedUsers.length && displayedUsers.length > 0}
                />
              </th>
              <th className="text-left p-3 font-medium">Nom</th>
              <th className="text-left p-3 font-medium">
                <div className="flex items-center gap-1">
                  Status
                  <span className="text-secondary/50 cursor-pointer">↓</span>
                </div>
              </th>
              <th className="text-left p-3 font-medium">
                <div className="flex items-center gap-1">
                  Rôle
                  <Info size={14} className="text-secondary/50" />
                </div>
              </th>
              <th className="text-left p-3 font-medium">Email address</th>
              <th className="text-left p-3 font-medium">Numéro</th>
              <th className="text-end p-3 font-medium rounded-tr-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-secondary-foreground hover:bg-inactive"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={"/avatar-1.png"}
                        alt={`Avatar de ${user.name}`}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-sm text-secondary-foreground">{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    <span className="mr-1">●</span> {user.status}
                  </span>
                </td>
                <td className="p-3 font-medium">
                  {user.role}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <div className="flex items-center justify-end gap-4">
                    <button 
                      className="text-secondary hover:text-secondary-foreground" 
                      aria-label="Modifier l'utilisateur"
                      onClick={() => handleEditClick(user)}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="text-secondary hover:text-secondary-foreground" 
                      aria-label="Supprimer l'utilisateur"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-4"
            prevLabel="Précédent"
            nextLabel="Suivant"
          />
        )}
      </div>

      {/* Modal d'ajout d'utilisateur - Style slide-in de droite à gauche */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay semi-transparent */}
          <div 
            className="absolute inset-0 bg-black/30 transition-opacity"
            onClick={() => setAddModalOpen(false)}
          />
          
          {/* Panel latéral */}
          <div className="fixed inset-y-0 right-0 max-w-lg w-full flex">
            {/* Animation de slide-in */}
            <div className="w-full transform transition-transform duration-300 ease-in-out bg-primary shadow-xl h-full overflow-y-auto">
              <div className="p-8 flex flex-col h-full">
                {/* En-tête */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-secondary">Ajouter un membre</h2>
                  <p className="text-secondary-foreground mt-2">
                    Ajouter directement les membres à votre équipe pour une meilleure collaboration.
                  </p>
                </div>
                
                <form onSubmit={handleAddSubmit} className="space-y-6 flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Nom */}
                    <div>
                      <label htmlFor="add-name" className="block text-sm font-medium mb-2">Nom</label>
                      <input
                        id="add-name"
                        name="name"
                        type="text"
                        placeholder="Nom"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                        required
                      />
                    </div>
                    
                    {/* Prénom */}
                    <div>
                      <label htmlFor="add-username" className="block text-sm font-medium mb-2">Prénoms</label>
                      <input
                        id="add-username"
                        name="username"
                        type="text"
                        placeholder="prénoms"
                        value={formData.username.replace('@', '')}
                        onChange={(e) => handleInputChange({
                          ...e,
                          target: {...e.target, value: e.target.value}
                        })}
                        className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="add-email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      id="add-email"
                      name="email"
                      type="email"
                      placeholder="monemail@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                      required
                    />
                  </div>
                  
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="add-phone" className="block text-sm font-medium mb-2">Phone number</label>
                    <div className="flex">
                      <div className="flex items-center border border-r-0 border-secondary-foreground/30 rounded-l-md bg-primary px-3">
                        <span>BJ</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <input
                        id="add-phone"
                        name="phone"
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-secondary-foreground/30 rounded-r-md bg-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Rôle */}
                  <div>
                    <label htmlFor="add-role" className="block text-sm font-medium mb-2">Rôle</label>
                    <input
                      id="add-role"
                      name="role"
                      type="text"
                      placeholder="product designer"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                      required
                    />
                  </div>
                  
                  {/* Boutons d'action, mis en bas avec mt-auto */}
                  <div className="flex space-x-4 mt-auto pt-6">
                    <button
                      type="button"
                      onClick={() => setAddModalOpen(false)}
                      className="px-6 py-3 border border-secondary-foreground/30 rounded-md"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-secondary text-primary rounded-md font-medium"
                    >
                      Valider
                    </button>
                  </div>
                </form>
                
                {/* Logo en bas */}
                <div className="mt-8 opacity-10 flex justify-center">
                  <Image
                    src="/logo-noir.png"
                    alt="Kemet Logo"
                    width={200}
                    height={80}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification d'utilisateur - Style slide-in de droite à gauche */}
      {editModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay semi-transparent */}
          <div 
            className="absolute inset-0 bg-black/30 transition-opacity"
            onClick={() => setEditModalOpen(false)}
          />
          
          {/* Panel latéral */}
          <div className="fixed inset-y-0 right-0 max-w-lg w-full flex">
            {/* Animation de slide-in */}
            <div className="w-full transform transition-transform duration-300 ease-in-out bg-primary shadow-xl h-full overflow-y-auto">
              <div className="p-8 flex flex-col h-full">
                {/* En-tête */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-secondary">Modifier un membre</h2>
                  <p className="text-secondary-foreground mt-2">
                    Modifiez les informations du membre de votre équipe.
                  </p>
                </div>
                
                <form onSubmit={handleEditSubmit} className="space-y-6 flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Nom */}
                    <div>
                      <label htmlFor="edit-name" className="block text-sm font-medium mb-2">Nom</label>
                      <input
                        id="edit-name"
                        name="name"
                        type="text"
                        placeholder="Nom"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                        required
                      />
                    </div>
                    
                    {/* Prénom */}
                    <div>
                      <label htmlFor="edit-username" className="block text-sm font-medium mb-2">Prénoms</label>
                      <input
                        id="edit-username"
                        name="username"
                        type="text"
                        placeholder="prénoms"
                        value={formData.username.replace('@', '')}
                        onChange={(e) => handleInputChange({
                          ...e,
                          target: {...e.target, value: e.target.value}
                        })}
                        className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="edit-email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      id="edit-email"
                      name="email"
                      type="email"
                      placeholder="monemail@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                      required
                    />
                  </div>
                  
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="edit-phone" className="block text-sm font-medium mb-2">Phone number</label>
                    <div className="flex">
                      <div className="flex items-center border border-r-0 border-secondary-foreground/30 rounded-l-md bg-primary px-3">
                        <span>BJ</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <input
                        id="edit-phone"
                        name="phone"
                        type="text"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-secondary-foreground/30 rounded-r-md bg-primary"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Rôle */}
                  <div>
                    <label htmlFor="edit-role" className="block text-sm font-medium mb-2">Rôle</label>
                    <input
                      id="edit-role"
                      name="role"
                      type="text"
                      placeholder="product designer"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                      required
                    />
                  </div>
                  
                  {/* Statut */}
                  <div>
                    <label htmlFor="edit-status" className="block text-sm font-medium mb-2">Statut</label>
                    <select
                      id="edit-status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-secondary-foreground/30 rounded-md bg-primary"
                    >
                      <option value="Active">Actif</option>
                      <option value="Inactive">Inactif</option>
                    </select>
                  </div>
                  
                  {/* Boutons d'action, mis en bas avec mt-auto */}
                  <div className="flex space-x-4 mt-auto pt-6">
                    <button
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                      className="px-6 py-3 border border-secondary-foreground/30 rounded-md"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-secondary text-primary rounded-md font-medium"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
                
                {/* Logo en bas */}
                <div className="mt-8 opacity-10 flex justify-center">
                  <Image
                    src="/logo-noir.png"
                    alt="Kemet Logo"
                    width={200}
                    height={80}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {deleteModalOpen && currentUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Confirmer la suppression</h2>
              <button onClick={() => setDeleteModalOpen(false)} className="text-secondary hover:text-secondary-foreground">
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              <p>Êtes-vous sûr de vouloir supprimer l&apos;utilisateur suivant ?</p>
              <div className="mt-4 p-4 border border-secondary-foreground/30 rounded-md">
                <div className="flex items-center">
                  <Image
                    className="h-12 w-12 rounded-full mr-3"
                    src={currentUser.avatar}
                    alt={`Avatar de ${currentUser.name}`}
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-secondary-foreground/60">{currentUser.email}</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-red-500 text-sm">Cette action est irréversible.</p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-secondary-foreground rounded-md mr-2"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}