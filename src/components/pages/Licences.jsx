import { useEffect, useState } from 'react';
import { httpClient } from '../services/http.client.js';
import { effect } from '@preact/signals';
import ReactModal from 'react-modal';

export const Licences = () => {
  const [licences, setLicences] = useState([]);
  const [current, setCurrent] = useState(httpClient.currentUser.value);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [currentLicence, setCurrentLicence] = useState({
    id: 0,
    name: '',
  });

  const fetchLicences = () => {
    httpClient.api
      .get('api/v1/licences')
      .then((response) => setLicences(response?.content || []));
  };

  useEffect(() => {
    fetchLicences();
    effect(() => {
      setCurrent(httpClient.currentUser.value);
    });
  }, []);

  ReactModal.setAppElement('#root');

  const closeModal = () => {
    setisModalOpen(false);
  };

  const openModal = (licence) => {
    setCurrentLicence(licence);
    setisModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    httpClient.api
      .post('api/v1/licences', {
        id: formData.get('id'),
        version: formData.get('version'),
        name: formData.get('name'),
      })
      .then(() => {
        fetchLicences();
        closeModal();
      })
      .catch((error) => alert(error.message))
      .finally(() => console.log('POST terminé'));
  };

  const deleteLicence = (licenceId) => {
    httpClient.api.delete(`api/v1/licences/${licenceId}`).then(() => {
      console.log(`Licence avec id ${licenceId} supprimée`);
      fetchLicences();
    });
  };

  const updateLicence = (licence) => {
    openModal(licence);
  };

  return (
    <>
      <h1>Licences</h1>
      <div className="m-10 w-4/6 m-auto">
        {current?.roles.includes('ADMIN') ? (
          <>
            <div
              className="btn btn-outline btn-inf"
              onClick={() => {
                updateLicence({ id: 0, version: 0, name: '' });
              }}
            >
              Créer licence
            </div>
          </>
        ) : (
          <></>
        )}

        <table className="table table-zebra border">
          <thead>
            <tr>
              <th>ID Licence</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {licences.map((licence) => (
              <tr key={licence.id}>
                <td>{licence.id}</td>
                <td>{licence.name}</td>
                {current?.roles.includes('ADMIN') ? (
                  <>
                    <td>
                      <button
                        onClick={() => {
                          updateLicence(licence);
                        }}
                        className="btn btn-warning m-auto"
                      >
                        Modifier
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteLicence(licence.id);
                        }}
                        className="btn btn-error m-auto"
                      >
                        Supprimer
                      </button>
                    </td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
        data={currentLicence}
      >
        <p className="font-semibold">Créer/Modifier votre licence : </p>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <input type="hidden" name="id" value={currentLicence.id} />
            <input
              type="hidden"
              name="version"
              value={currentLicence.version}
            />
            <input
              placeholder="Nom : "
              className="flex input input-bordered"
              type="text"
              name="name"
              defaultValue={currentLicence.name}
            />
          </div>
          <div className="m-auto w-fit">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Créer/Modifier la licence
            </button>
          </div>
        </form>
      </ReactModal>
    </>
  );
};
