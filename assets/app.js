import './styles/app.scss';
import './bootstrap';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import * as _ from 'lodash';

/**
 * Handle toggling between Symfony and React search
 */
(function() {
        const symfonyWrapper = document.querySelector(".wrapper--symfony");
        const reactWrapper = document.querySelector(".wrapper--react");
        const symfonyButton = document.querySelector(".toggler__link--symfony");
        const reactButton = document.querySelector(".toggler__link--react");
        symfonyButton.addEventListener("click", () => {
            if (symfonyWrapper.classList.contains("wrapper--inactive")) {
                symfonyWrapper.classList.remove("wrapper--inactive")
                reactWrapper.classList.add("wrapper--inactive");
                reactButton.classList.add("toggler__link--inactive");
                symfonyButton.classList.remove("toggler__link--inactive");
            }
        });
        reactButton.addEventListener("click", () => {
            if (reactWrapper.classList.contains("wrapper--inactive")) {
                reactWrapper.classList.remove("wrapper--inactive");
                symfonyWrapper.classList.add("wrapper--inactive");
                symfonyButton.classList.add("toggler__link--inactive");
                reactButton.classList.remove("toggler__link--inactive");
            }
        });
})();

/**
 * React Search component
 * @returns React.Fragment
 */
function ProductSearch() {
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        async function fetchProducts(searchQuery) {
            if (!_.isEmpty(searchQuery)) {
                setFetching(true);
                const searchResults = await fetch(`https://global.atdtravel.com/api/products?geo=en&title=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    setFetching(false);
                    setResults(data);
                });
                return searchResults;
            }
        }
        fetchProducts(searchQuery);
    }, [searchQuery]);

    function handleSubmit(e) {
        e.preventDefault();
        setSearchQuery(searchInput);
    }

    function handleSearchChange(e) {
        setSearchInput(e.target.value);
    }

    return (
        <React.Fragment>
            <h1>Attraction Tickets (React)</h1>
            <form name="react-form" onSubmit={handleSubmit}>
                <div className="react-form">
                    <div>
                        <input type="search" 
                            className="react-form__search"
                            required="required"
                            placeholder="Search"
                            onChange={handleSearchChange}></input>
                    </div>
                    <div>
                        <button className="react-form__submit" onChange={handleSubmit}>Search</button>
                    </div>
                </div>
            </form>
            {fetching && 
                <div className="results__meta"><small>Loading...</small></div>
            }
            {!_.isEmpty(results.meta) && !fetching && 
                <div className="results__meta"><small>Displaying {results.meta.count} of {results.meta.total_count} results</small></div>
            }
            {!_.isEmpty(results.data) && !fetching &&
                <div className="results__list">
                    {results.data.map(product => {
                        return (
                            <li className="results__item" key={`results__item--${product.id}`}>
                                <div className="results__item-header">
                                    <img 
                                        className="results__item-image" 
                                        src={`${product.img_sml}`} 
                                        alt={`Image of ${product.title}`}
                                        width="320"
                                        height="240" />
                                    <h3 className="results__item-title">{product.title}</h3>
                                </div>
                                <h4 className="results__item-destination">{product.dest}</h4>
                            </li>
                        );
                    })}
                </div>
            }
            {_.isEmpty(results.data) || !_.isEmpty(results.error_desc) &&
                <h3>{results.error_desc || "No products found"}</h3>
            }
        </React.Fragment>
    );
}

const container = document.getElementById("react-app");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ProductSearch />
    </React.StrictMode>
)