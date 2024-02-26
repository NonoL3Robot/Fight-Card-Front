import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function Licences() {

    const api = new ApiService("http://localhost:8080/api/v1/licences");
    const [licences, setLicences] = useState([]);

    useEffect(() => {
        api.get()
            .then((response) => setLicences(response))
            .catch((error) => alert(error.message))
            .finally(() => console.log('GET terminé'))
    }, []);

    return (
        <>
            <h1>Licences</h1>
            <div className="m-10 w-4/6 m-auto">
                <table className="table table-zebra border">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {licences.map((licence) => (
                            <tr key={licence.id}>
                                <td>{licence.name}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Licences