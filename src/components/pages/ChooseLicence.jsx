import { useEffect, useState } from 'react';
import { httpClient } from '../services/http.client.js';
import { useNavigate } from 'react-router-dom';
import { LicenceCard } from '../LicenceCard';

export const ChooseLicence = ({ choosedLicences, setChoosedLicences }) => {
  const navigate = useNavigate();
  const [licences, setLicences] = useState([]);

  const fetchLicences = () => {
    httpClient.api
      .get('api/v1/licences')
      .then((response) => setLicences(response?.content || []));
  };

  useEffect(() => {
    fetchLicences();
  }, []);

  const handleClick = (licence) => {
    if (!choosedLicences.includes(licence)) {
      setChoosedLicences([...choosedLicences, licence]);
    } else {
      setChoosedLicences((prevLicences) =>
        prevLicences.filter((elem) => elem !== licence),
      );
    }
  };

  const handleConfirm = () => {
    navigate('/play');
  };

  return (
    <>
      {console.log(licences)}
      {licences.map((licence) => (
        <div
          key={licence.id}
          onClick={() => {
            handleClick(licence);
          }}
          style={choosedLicences.includes(licence) ? { color: 'red' } : {}}
        >
          <LicenceCard licence={licence} />
        </div>
      ))}
      <button
        className="btn button"
        onClick={handleConfirm}
        disabled={choosedLicences.length < 2}
      >
        OK
      </button>
    </>
  );
};
