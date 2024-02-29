import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import ReactModal from "react-modal";

function Cartes() {
    const api = new ApiService("http://localhost:8080/api/v1/cartes");
    const [cartes, setCartes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState({
        id: 0,
        name: "",
        description: "",
        statCourage: 0,
        statIntelligence: 0,
        statForce: 0,
        licenceId: 0
    });

    const fetchCartes = () => {
        api.get()
            .then((response) => setCartes(response))
            .catch((error) => alert(error.message))
            .finally(() => console.log('GET terminé'));
    };

    useEffect(() => {
        fetchCartes();
    }, []);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cartes.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    ReactModal.setAppElement('#root');

    const closeModal = () => {
        setisModalOpen(false);
    }

    const openModal = (carte) => {
        setCurrentCard(carte);
        setisModalOpen(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        api.post(undefined, {
            id: formData.get('id'),
            version: formData.get('version'),
            name: formData.get('name'),
            description: formData.get('description'),
            statCourage: formData.get('statCourage'),
            statIntelligence: formData.get('statIntelligence'),
            statForce: formData.get('statForce'),
            licenceId: formData.get('licenceId')
        })
            .then(() => {
                fetchCartes();
                closeModal();
            })
            .catch((error) => alert(error.message))
            .finally(() => console.log("POST terminé"));

    };

    const deleteCarte = (carteId) => {
        api.delete(carteId)
            .then(() => {
                console.log(`Carte avec id ${carteId} supprimée`);
                setCartes((prevCartes) => prevCartes.filter((carte) => carte.id != carteId));
            });
    };

    const updateCarte = (carte) => {
        openModal(carte);
    };

    return (
        <>
            <h1>Cartes</h1>
            <div className="m-10 w-4/6 m-auto">
                <div className="btn btn-outline btn-inf" onClick={() => { updateCarte({ id: 0, version: 0, name: "", description: "", statCourage: 0, statIntelligence: 0, statForce: 0, licenceId: 0 }) }}>Créer carte</div>
                <table className="table table-zebra border">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Stat Courage</th>
                            <th>Stat Intelligence</th>
                            <th>Stat Force</th>
                            <th>Licence ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((carte) => (
                            <tr key={carte.id}>
                                <td>{carte.name}</td>
                                <td>{carte.description}</td>
                                <td>{carte.statCourage}</td>
                                <td>{carte.statIntelligence}</td>
                                <td>{carte.statForce}</td>
                                <td>{carte.licenceId}</td>
                                <td>
                                    <button
                                        onClick={() => { updateCarte(carte) }}
                                        className="btn btn-warning m-auto"
                                    >Modifier</button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => { deleteCarte(carte.id.toString()) }}
                                        className="btn btn-error m-auto"
                                    >Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination buttons */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(cartes.length / itemsPerPage) }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <ReactModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
                    data={currentCard}
                >
                    <p className="font-semibold">Créer/Modifier votre carte : </p>
                    <form onSubmit={handleUpdate}>
                        <div className="grid grid-cols-2 gap-4 mb-5">
                            <input type="hidden" name="id" value={currentCard.id} />
                            <input type="hidden" name="version" value={currentCard.version} />
                            <input
                                placeholder="Nom : "
                                className="flex input input-bordered"
                                type="text"
                                name="name"
                                defaultValue={currentCard.name}
                            />
                            <input
                                placeholder="Description : "
                                className="flex input input-bordered"
                                type="text"
                                name="description"
                                defaultValue={currentCard.description}
                            />
                            <input
                                placeholder="Stat courage : "
                                className="flex input input-bordered"
                                type="number"
                                name="statCourage"
                                defaultValue={currentCard.statCourage}
                                min={0}
                                max={10}
                            />
                            <input
                                placeholder="Stat intelligence : "
                                className="flex input input-bordered"
                                type="number"
                                name="statIntelligence"
                                defaultValue={currentCard.statIntelligence}
                                min={0}
                                max={10}
                            />
                            <input
                                placeholder="Stat force : "
                                className="flex input input-bordered"
                                type="number"
                                name="statForce"
                                defaultValue={currentCard.statForce}
                                min={0}
                                max={10}
                            />
                            <input
                                placeholder="Licence ID : "
                                className="flex input input-bordered"
                                type="number"
                                name="licenceId"
                                defaultValue={currentCard.licenceId}
                            />
                        </div>
                        <div className="m-auto w-fit">
                            <button
                                type="submit"
                                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Créer/Modifier la carte
                            </button>
                        </div>
                    </form>
                </ReactModal>
            </div>
        </>
    );
}

export default Cartes;
