import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    //los titulos en funcion
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    //Las descripciones en funcion
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    //Funcion que adjunta las dos funciones de arriba
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    //funcion que recoge links y los descarga a /api/uploads
    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-violet-700 text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Añadir lugar
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Titulo', 'Titulo para tu publicacion')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Ej: Cabañas en San Rafael" />
                        {preInput('Direccion', 'Direccion de tu alojamiento')}
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Ej: Calle 4444 Barrio " />
                        {preInput('Fotos', 'Añade algunas fotos del lugar que vas a publicar')}
                        <div className="flex gap-2">
                            <input value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)}
                                type="text" placeholder={"Añade tus fotos aqui"} />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Añadir&nbsp;foto</button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    {link}
                                </div>
                            ))}
                            <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        {preInput('Descripcion', 'Descripcion del alojamiento')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                        {preInput('Caracteristicas', 'Seleccione los beneficios que incluye el alojamiento')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-clos-6">
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Informacion adicional', 'Agregue una descripcion detallada')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                        {preInput('Horarios de Entrada/Salida', 'Agregue un horario de entrada y salida del alojamiento')}
                        <div className="grid gap-2 sm:grid-col-3">
                            <p className="text-gray-500 text-sm">Use el formato de horario 24h para evitar confusiones</p>
                            <div>
                                <h3 className="mt-2 -mb-1">Horario de entrada</h3>
                                <input type="text"
                                    value={checkIn}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                    placeholder="04" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Horario de salida</h3>
                                <input type="text"
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                    placeholder="11" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Maxima cantidad de huespedes</h3>
                                <input type="number"
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)} />
                            </div>
                        </div>
                        <button className="primary my-4">Guardar</button>
                    </form>
                </div>
            )}
        </div >
    );
}