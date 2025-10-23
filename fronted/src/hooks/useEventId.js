'use client';

import { useState, useEffect } from 'react';

export function useEventId() {
    const [id, setId] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setId(params.get('id'));
        }
    }, []);

    return id;
}
