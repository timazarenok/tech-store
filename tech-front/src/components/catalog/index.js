import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './catalog.css'

const Catalog = (props) => {
    const [categories, setCategories] = useState([])
    const [subcategories, setSubCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/categories")
            .then(response => setCategories(response.data))
            .catch(err => console.log(err))
        axios.get("http://localhost:3000/api/subcategories")
            .then(response => setSubCategories(response.data))
            .catch(err => console.log(err))
    }, [categories.length, subcategories.length])

    return (
        <ul className="categories-list">
            {categories.map(el => (
                <li>
                    <h1>{el.name}</h1>
                    <ul className="subcategories-list">
                        {
                            subcategories.filter(sub => sub.categoryId === el.id).map(el => (
                                <li>
                                    <Link to={`/catalog/${el.id}`} className="catalog-link">{el.name}</Link>

                                </li>
                            ))
                        }
                    </ul>
                </li>
            ))
            }
        </ul>
    )
}

export default Catalog;