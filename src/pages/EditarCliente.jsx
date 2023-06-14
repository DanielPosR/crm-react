import { useLoaderData, Form, useNavigate, useActionData, redirect } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from '../components/Error';


//* LOADER
export async function loader({ params }) {
    const cliente = await obtenerCliente(params.clienteId);

    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay resultados'
        })
    }

    return cliente;
}




//* ACTION
export async function action({ request, params }) {


    const formData = await request.formData();

    const datos = Object.fromEntries(formData);

    const errores = []

    const email = formData.get('email');
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");


    if (Object.values(datos).includes('')) {
        errores.push('Todos los campos son obligatorios');
    }


    if (!regex.test(email)) {
        errores.push('El email no es válido');
    }


    //* RETORNAR DATOS SI HAY ERRORES
    if (Object.keys(errores).length) {
        return errores;
    }

    //* ACTUALIZAR EL CLIENTE
    await actualizarCliente(params.clienteId, datos)

    return redirect('/');
}





//* COMPONENT
function EditarCliente() {

    const navigate = useNavigate();

    const cliente = useLoaderData();

    const errores = useActionData();

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Modifica la información del cliente en el siguiene formulario</p>

            <div className="flex justify-end">
                <button
                    type="button"
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>


            <div className="bg-white shadow rounded-md md:w3/4 mx-auto px-5 py-10 mt-20">

                {errores?.length
                    &&
                    errores.map((error, i) =>
                        <Error key={i}>{error}</Error>
                    )}



                <Form
                    method="POST"
                    noValidate
                >

                    <Formulario
                        cliente={cliente}
                    />

                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer hover:bg-blue-900 transition ease-in"
                    />

                </Form >

            </div>

        </>
    )
}

export default EditarCliente