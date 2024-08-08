import React, {useState} from "react";
import { useForm } from "react-hook-form"
import { createLogEntry } from "./API"

const LogEntryForm = ({location, onClose}) => {
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try{
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created);
            onClose();
        }catch(e){
            console.error(e);
            setError(e.message);
            setLoading(false);
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
            {error ? <h3 className="error">{error}</h3>: null}
            <label htmlFor="title">Title: </label>
            <input type="text" {...register("title")} required></input>
            <label htmlFor="coments">Comments: </label>
            <textarea {...register("coments")} rows={3} ></textarea>
            <label htmlFor="description">Description: </label>
            <textarea {...register("description")} ></textarea>
            <label htmlFor="number">Ratting: </label>
            <input type="number" {...register("rating")} min={0} max={10} defaultValue={0} ></input>
            <label htmlFor="image">Image: </label>
            <input {...register("image")} ></input>
            <label htmlFor="visitDate">Visited On: </label>
            <input type="date" {...register("visitDate")} required ></input>
            <button disabled={loading}> {loading ? 'Loading...':'Create entry'}</button>
        </form>
    )
};

export default LogEntryForm;