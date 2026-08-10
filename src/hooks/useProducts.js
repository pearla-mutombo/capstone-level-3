import { useEffect, useState } from "react";

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(componentDidMount, []);

    return[products, isloading, errorMessage];

    function componentDidMount() {
        getProducts();
    }

    async function getProducts() {
        try {
           setIsLoading(true);
           setErrorMessage("");
           const response = await fetch(""); 
           if (!response.ok) {
            throw new Error ("Unabme to get products");
           }
           const data = await response.json();
           setProducts(data);
        } catch (error) {
           setErrorMessage("There was a problem loading the products.");
        } finally {
          setIsLoading(false);
        }
    }
}