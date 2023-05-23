
import { context, logging, ContractPromiseBatch, u128 } from 'near-sdk-as';
import { Servicio, allServices, Recomendation, allRecommendations, ONE_NEAR } from './models'

const contractOwner = context.sender;
const allServicesIndex = allServices.length;
const allRecommendationsIndex = allRecommendations.length;

// Crea una nueva instancia de un servicio y la almacena en un PersistentVector
export function uploadService(servicio: string, descripcion: string, imagen: string, direccion: string, costo: string): Servicio {
    const newServicioUpload = new Servicio(servicio, descripcion, imagen, direccion, costo);
    allServices.push(newServicioUpload);
    logging.log('Nuevo Servicio publicado: ' + newServicioUpload.servicio)
    addRecomendation();
    return newServicioUpload;
}

// Retorna los servicios  the PersistentVector
export function getServices(): Servicio[] {
    const data = new Array<Servicio>(allServicesIndex);
    for(let i = 0; i < allServicesIndex; i++) {
        data[i] = allServices[i]
    }
    return data;
}

//Devuelve un solo servicio( Si existe)
export function getServicio(servicioIndex: i32): Servicio {
    if(allServices.length < servicioIndex) {
        logging.log('El servicio no existe')
    }
    return allServices[servicioIndex]
}

// Se utiliza para validar las pruebas de la función Eliminar servicios 
export function servicesLen(): number {
    return allServices.length;
}

// Vacía el VectorPersistente encargado de almacenar todos los servicios
export function deleteServices(): void {
    while(allServices.length > 0) {
        allServices.pop();
    }
}

 // Elimina un servicio (si existe) en función de su posición en el servicio PersistentVector
export function deleteServicio(servicioIndex: i32): bool {
    if(allServices.length < servicioIndex) {
        logging.log('El servicio no existe')
        return false
    }
    allServices.swap_remove(servicioIndex);
    logging.log('El servicio ha sido eliminado!');
    return true
}

// Permite a un usuario cambiar la propiedad de un servicio en caso de que sea necesario
export function changeServicioOwner(servicioIndex: i32): bool {
    if(allServices.length < servicioIndex) {
         logging.log('Este servicio no existe!')
         return false;
    } else if(allServices[servicioIndex].owner == context.sender) {
            logging.log('El usuario ya tiene registrado un servicio similar.')
            return false;
        }
    else {
        allServices[servicioIndex].owner = context.sender;
        logging.log('Intercambio de propiedad del servicio!')
        return true;
    }
}

// Devuelve el dueño del contrato
export function getOwner(): string {
    return contractOwner;
}

// Devuelve todas las recomendaciones
export function getRecomendations(): Recomendation[] {
    const data = new Array<Recomendation>(allRecommendationsIndex);
    for(let i = 0; i < allRecommendationsIndex; i++) {
        data[i] = allRecommendations[i]
    }
    return data;
}

// Usado para probar la función delete recomendacion
export function getRecomendationsLength(): number {
    return allRecommendations.length;
}

// Agrega un nuevo recomendacion a allRecomendation PersistentVector
export function addRecomendation(): Recomendation {
    const data = new Array<Recomendation>(allRecommendationsIndex) 
    let exists = false;
     const recomendation = new Recomendation()
    for(let i = 0; i < allRecommendationsIndex; i++) {
        data[i] = allRecommendations[i];
    }
    for(let x = 0; x < data.length; x++) {
        if(context.sender == data[x].user) {
             logging.log('Este usuario ya ha recomendado!')
             exists = true;
            break
        }
    }
    if(exists == false) {
        logging.log('El usuario no ha recomendado, lo agrego ahora !')
        allRecommendations.push(recomendation)
        return recomendation
    }
    return recomendation
}

// Verifica si existe una recomendacion en función de su nombre de usuario, lo que facilita la verificación del usuario
export function findRecomendation(recomendationUser: string):bool {
    const data = new Array<Recomendation>(allRecommendationsIndex);
    if(allRecommendationsIndex <= 0) {
        logging.log("No hay recomendaciones en este momento")
        return false;
    } else {
        for(let i = 0; i < allRecommendationsIndex; i++) {
            data[i] = allRecommendations[i]
            if(data[i].user == recomendationUser) {
                logging.log('Recomendacion ' + recomendationUser + ' fue encontrado')
                return true
            }
            break
        }
        logging.log('Esta recomendacion no existe')
        return false;
    }
}

// Vacía el vector persistente de todos los contribuyentes
export function deleteRecomendations(): void {
    while(allRecommendations.length > 0) {
        allRecommendations.pop()
    }
    logging.log(
        'Se ha vaciado la lista de recomendaciones'
    )
}

// Permite al usuario hacer una Pago al que ofrece el servicio
export function makeDonation(servicioOwnerIndex: i32): bool {
    const data = new  Array<Servicio>(allServicesIndex);
    if(servicioOwnerIndex > allServicesIndex) {
        logging.log('El servicio/owner no existe.')
        return false
    } else {
         assert(context.attachedDeposit > ONE_NEAR, 'Monto a pagar'); 
        return true

    }
   }

// Permite al usuario hacer un pago
export function donateToProject(): void {
    assert(context.attachedDeposit > ONE_NEAR, 'necesitas depositar algo ')
    logging.log('Gracias por su pago')
}
