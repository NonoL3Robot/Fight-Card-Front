import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";

function ChooseLicence({ choosedLicences, setChoosedLicences }) {

    const navigate = useNavigate();

    const api = new ApiService("http://localhost:8080/api/v1/licences");
    const [licences, setLicences] = useState([]);

    useEffect(() => {
        api.get()
            .then((response) => setLicences(response))
            .catch((error) => alert(error.message))
            .finally(() => console.log('GET terminé'))
    }, []);

    const handleClick = (licence) => {
        if (!choosedLicences.includes(licence)) {
            setChoosedLicences([...choosedLicences, licence]);
        } else {
            setChoosedLicences((prevLicences) => prevLicences.filter((elem) => elem !== licence));
        }
    }

    const handleConfirm = () => {
        navigate('/play');
    }

    return (
        <>
            {licences.map(licence =>
                <div
                    key={licence.id}
                    onClick={() => { handleClick(licence) }}
                    style={choosedLicences.includes(licence) ? { color: 'red' } : {}}
                >
                    {licence.name}
                </div>
            )}
            <button 
            className="btn button" 
            onClick={handleConfirm} 
            disabled={choosedLicences.length < 2}
            >
                OK
            </button>
        </>
    )
}

export default ChooseLicence