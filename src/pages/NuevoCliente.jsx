import { Form, useActionData, useNavigate, redirect } from "react-router-dom"
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";


export async function action({ request }) {


  //* formData contiene toda la informacion que el usuario ingresa en el formulario
  const formData = await request.formData();



  
  //* Object.fromEntries nos permite acceder a toda la informacion que esxiste en formData()
  const datos = Object.fromEntries(formData);




  //* VALIDACION DE DATOS DEL FORMULARIO  
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


  await agregarCliente(datos)

  return redirect('/');
}





//* COMPONENTE
const NuevoCliente = () => {

  const navigate = useNavigate();
  const errores = useActionData();


  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">LLena todos los campos para regitrar un nuevo cliente</p>

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
          )
        }

        <Form
          method="POST"
          noValidate
        >

          <Formulario />

          <input
            type="submit"
            value="Registrar Cliente"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer hover:bg-blue-900 transition ease-in"
          />

        </Form >

      </div>

    </>
  )
}

export default NuevoCliente