import { useNavigate, Form, redirect, useActionData } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";



//* ACTION 
export async function action({ params }) {

    await eliminarCliente(params.clienteId);


    return redirect('/');

}


const Cliente = ({ cliente }) => {

    const action = useActionData()

    const navigate = useNavigate();

    const { nombre, telefono, email, empresa, notas, id } = cliente;

    return (
        <tr className="border-b">
            <td className="p-6 space-y-2">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>

            <td className="p-6">
                <p className="text-gray-600">
                    <span className="text-gray-800 font-bold uppercase">Email: </span>
                    {email}
                </p>

                <p className="text-gray-600">
                    <span className="text-gray-800 font-bold uppercase">Teléfono: </span>
                    {telefono}
                </p>
            </td>

            <td className="p-6">
                {notas
                    ?
                    <p className="text-gray-600">
                        {notas}
                    </p>
                    :
                    <p className="text-gray-600">
                        Sin notas
                    </p>
                }
            </td>


            <td className="p-6 lg:flex gap-3 justify-center">
                <button
                    type="button"
                    className="text-blue-700 uppercase font-bold text-xs"
                    onClick={() => navigate(`/clientes/${id}/editar`)}
                >
                    Editar
                </button>

                <Form
                    method="POST"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={(e) => {
                        if (!confirm('¿Deseas eliminar este registro?')) {
                            e.preventDefault()
                        }
                    }}
                >

                    <button
                        type="submit"
                        className="text-red-700 uppercase font-bold text-xs"
                    >
                        Eliminar
                    </button>

                </Form>
            </td>
        </tr>
    )
}

export default Cliente