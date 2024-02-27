import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import ReactModal from "react-modal";

function Licences() {

    const api = new ApiService("http://localhost:8080/api/v1/licences");
    const [licences, setLicences] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newLicence, setNewLicence] = useState({
        name: "",
        cartes: []
    });

    useEffect(() => {
        api.get()
            .then((response) => setLicences(response))
            .catch((error) => alert(error.message))
            .finally(() => console.log('GET terminé'))
    }, []);

    useEffect(() => {
        if (newLicence.name !== "") {
            api.post(undefined, newLicence)
                .then((data) => setLicences((prevLicences) => [...prevLicences, data]))
                .catch((error) => alert(error.message))
                .finally(() => console.log("POST terminé"))
        }
    }, [newLicence]);

    ReactModal.setAppElement('#root');

    const closeModal = () => {
        setModalOpen(false)
    }

    const openModal = () => {
        setModalOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);

        setNewLicence({
            name: formData.get('name'),
            cartes: formData.get('cartes')
        });
        closeModal();
    };

    const deleteLicence = (licenceId) => {
        api.delete(licenceId)
            .then(() => {
                console.log(`Licence avec id ${licenceId} supprimée`);
                setLicences((prevLicences) => prevLicences.filter((licence) => licence.id != licenceId));
            });
    };

    return (
        <>
            <h1>Licences</h1>
            <div className="m-10 w-4/6 m-auto">
                <div className="btn btn-outline btn-inf" onClick={openModal}>Créer licence</div>
                <table className="table table-zebra border">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licences.map(elem => (
                            <tr key={elem.id}>
                                <td>{elem.name}</td>
                                <td>
                                    <button
                                        onClick={() => { deleteLicence(elem.id.toString()) }}
                                        className="btn btn-error m-auto"
                                    >Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
            >
                <p className="font-semibold">Ajouter votre licence : </p>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <input
                            placeholder="Nom : "
                            className="flex input input-bordered"
                            type="text"
                            name="name"
                        />
                    </div>
                    <div className="m-auto w-fit">
                        <button
                            type="submit"
                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Ajouter la licence
                        </button>
                    </div>
                </form>
            </ReactModal>
        </>
    )
}

export default Licences