import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function Cartes() {

    const api = new ApiService("http://localhost:8080/api/v1/cartes");
    const [cartes, setCartes] = useState([]);

    useEffect(() => {
        api.get()
            .then((response) => setCartes(response))
            .catch((error) => alert(error.message))
            .finally(() => console.log('GET terminé'))
    }, []);

    return (
        <>
            <h1>Cartes</h1>
            <div className="m-10 w-4/6 m-auto">
                <table className="table table-zebra border">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Stat Courage</th>
                            <th>Stat Intelligence</th>
                            <th>Stat Force</th>
                            <th>ID Licence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartes.map((carte) => (
                            <tr key={carte.id}>
                                <td>{carte.name}</td>
                                <td>{carte.description}</td>
                                <td>{carte.statCourage}</td>
                                <td>{carte.statIntelligence}</td>
                                <td>{carte.statForce}</td>
                                <td>{carte.licenceId}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Cartes