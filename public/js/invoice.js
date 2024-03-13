async function getPDF(orderid) {
    const orderId = orderid || new URLSearchParams(window.location.search).get(
        'orderid'
    );
    const res = await fetch(`/api/invoice?orderid=${orderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json();

    // ! If Unsuccessful
    if(res.status == 400 || res.status == 400) {
        showError({
            error: data.error.code,
            message: data.error.message
        })
        return;
    }

    if(res.status == 200) {
        let base64 = (data.data)
        const blob = base64ToBlob( base64, 'application/pdf' );
        const url = URL.createObjectURL( blob );
        window.open(url, "_blank");
        
        function base64ToBlob( base64, type = "application/octet-stream" ) {
            const binStr = atob( base64 );
            const len = binStr.length;
            const arr = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                arr[ i ] = binStr.charCodeAt( i );
            }
            return new Blob( [ arr ], { type: type } );
        }
    }
}

