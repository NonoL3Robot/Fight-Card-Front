import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function ChooseLicence({ choosedLicences, setChoosedLicences }) {

    const api = new ApiService("http://localhost:8080/api/v1/licences");
    const [licences, setLicences] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        api.get()
            .then((response) => setLicences(response))
            .catch((error) => alert(error.message))
            .finally(() => console.log('GET terminé'))
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        if (!choosedLicences.includes(e.target.value)) {
            setChoosedLicences([...choosedLicences, e.target.value]);
        }
    }

    /* Afficher les licences, un appui dessus la sélectionne (effet selected), appui sur bouton OK confirme les licences sélectionnés (2 max ?) */

    return (
        <>
            {licences.map(licence =>
                <div
                    key={licence.id}
                    onClick={handleClick}
                >
                    {licence.name}
                </div>
            )}
            <br />
        </>
    )
}

export default ChooseLicence