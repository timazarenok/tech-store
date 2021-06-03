import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './catalog.css'

const Catalog = (props) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/categories")
        .then(response => setCategories(response.data))
        .catch(err => console.log(err))
    }, [categories.length])

    return (
        <ul>
            {categories.map(el => (
                <Link to={`/catalog/${el.id}`} className="catalog-link">{el.name}</Link>
            ))
            }
        </ul>
    )
}

export default Catalog;