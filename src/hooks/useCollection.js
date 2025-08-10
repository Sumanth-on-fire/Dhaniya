import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabase/config";

export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const query = useRef(_query).current;
    const orderBy = useRef(_orderBy).current;

    useEffect(() => {
        const fetchFiles = async () => {
            const { data, error } = await supabase.storage
                .from("dhaniya-storage")
                .list(collection);
            console.log("Printing the collection data: ", data)
            if (error) {
                console.error(error);
                setError("could not fetch the data");
                return;
            }

            let results = data.map((file) => ({ ...file, id: file.name }));

            if (query && query.length === 3) {
                const [field, op, value] = query;
                if (op === "eq") {
                    results = results.filter((item) => item[field] === value);
                }
            }

            if (orderBy && orderBy.length === 2) {
                const [field, direction] = orderBy;
                results.sort((a, b) => {
                    if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
                    if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
                    return 0;
                });
            }

            setDocuments(results);
            setError(null);
        };

        fetchFiles();
    }, [collection, query, orderBy]);

    return { documents, error };
};