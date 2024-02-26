import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function ChooseLicence({ choosedLicences, setChoosedLicences }) {

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
        console.log("Licences sélectionnées : ", choosedLicences);
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
            href={"/play"}>OK</button>
        </>
    )
}

export default ChooseLicence