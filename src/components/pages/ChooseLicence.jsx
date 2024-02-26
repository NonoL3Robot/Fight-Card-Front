import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function ChooseLicence() {

    const api = new ApiService("http://localhost:8080/api/v1/licences");
    const [licences, setLicences] = useState([]);
    const [chosedLicences, setChosedLicences] = useState([]);

    useEffect(() => {
        api.get()
            .then((response) => setLicences(response))
            .catch((error) => alert(error.message))
            .finally(() => console.log('GET terminé'))
    }, []);

    /* Afficher les licences, un appui dessus la sélectionne (effet selected), appui sur bouton OK confirme les licences sélectionnés (2 max ?) */
    
    return (
        <>
            {licences.map(licence => 
                <div key={licence.id} onClick={() => {setChosedLicences([...chosedLicences, licence])}}>
                    {licence.name}
                </div>
            )}
            <br/>
            {chosedLicences.map(licence => 
                <div key={licence.id}>
                    {licence.name}
                    </div>
            )}
        </>
    )
}

export default ChooseLicence