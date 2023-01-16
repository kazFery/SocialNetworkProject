import { Link } from "react-router-dom";
import React, {useState} from 'react'

function SearchBar({placeholder, data}) {
    
    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (event) => {
        const searchWord = event.target.value
        const newFilter = data.filter((value) => {
            return (value.firstName.toLowerCase().includes(searchWord.toLowerCase()) + value.lastName.toLowerCase().includes(searchWord.toLowerCase()));
        });

        if (searchWord ==="") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    }
    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} onChange={handleFilter}/>
                {/* <div className="searchIcon">
                <button className="btn btn-primary my-3">
                    Search
                </button>
                </div> */}
            </div>
            {filteredData.length != 0 && (
            <div className="dataResult">
                {filteredData.slice(0, 4).map((value, key) => {
                    return (
                    <a className="dataItem">
                       <p> 
                       <Link to={"/invite/" + value.id} >
                        {value.firstName}
                        {" "}
                        {value.lastName}
                        </Link>
                        </p>
                    </a>
                    );
                })}
            </div>
       )}
        </div>
    )
}

export default SearchBar