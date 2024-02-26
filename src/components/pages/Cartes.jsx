import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function Cartes() {
    const api = new ApiService("http://localhost:8080/api/v1/cartes");
    const [cartes, setCartes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get();
                setCartes(response);
            } catch (error) {
                alert(error.message);
            } finally {
                console.log('GET terminé');
            }
        };

        fetchData();
    }, []);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cartes.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        {currentItems.map((carte) => (
                            <tr key={carte.id}>
                                <td>{carte.name}</td>
                                <td>{carte.description}</td>
                                <td>{carte.statCourage}</td>
                                <td>{carte.statIntelligence}</td>
                                <td>{carte.statForce}</td>
                                <td>{carte.licenceId}</td>
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

            </div>
        </>
    );
}

export default Cartes;
