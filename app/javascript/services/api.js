const baseUrl = 'https://www.aguacatecambios.com/api'

async function request(url,method, data) {
    const response = await fetch(`${baseUrl}${url}`, {method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },  
        body: data ? JSON.stringify(data) : undefined } )
        if(method !== 'DELETE'){
            const jsonResponse =  await response.json();
            if(response.status !== 200 && response.status !== 201 && response.status !== 204){
                let error;
                if(jsonResponse && jsonResponse.errors){
                    error = jsonResponse.errors[0].message
                }
                return error
            }   
        return jsonResponse
        }
    }

async function requestArchivo(url,method, data) {
    var formData  = new FormData();
    for(var name in data) {
        formData.append(name, data[name])
    }

    const response = await fetch(`${baseUrl}${url}`, {method: method,
        //headers: {
        //  'Accept': '*/*',
        //  'Content-Type': 'application/x-www-form-urlencoded'*/
        //},  
        body: formData ? formData : undefined } )
        if(method !== 'DELETE'){
            const multipartResponse =  await response.json();
            /*if(response.status !== 200 && response.status !== 201 && response.status !== 204){
                let error;
                if(jsonResponse && jsonResponse.errors){
                    error = jsonResponse.errors[0].message
                }
                throw Error(error || "hubo un error")
            }*/
        return multipartResponse

        }
    }

export function crear(url,data){
    return request(url, 'POST', data);

}

export function modificar(url, id, data){
    return request(`${url}/${id}`, 'PUT', data);
}

export function leer(url,id){
    if (id)
        return request(`${url}/${id}`)
    else
        return request(`${url}`)

}

export function borrar(url,id){
    return request (`${url}/${id}`, 'DELETE')
    
}

export function perfil(url,id,uid){
    return request (`${url}/${id}/${uid}`)
}


export function solicitud(url,id,userId){
    return request (`${url}/${id}?usuario=${userId}`, 'PUT')    
}

export function solicitarAprobacion(url,id){
    return request(`${url}/${id}`, 'POST')
}

export function crearArchivo(url,data){
    return requestArchivo(url, 'POST', data);

}
